import { useState, useEffect } from "react"
import SearchInput, { createFilter } from 'react-search-input'

const SearchAndReplaceStudent = ({ reportedStudent, awaitingStudents, toggleTraiteCase, groupId, report, tutor }) => {
    const replaceStudent = async (reportedStudent, selectedReplacement) => {
        if (selectedReplacement.firstname !== "retour liste d'attente") {
            await fetch('/api/mongodb', {
                method: 'post',
                body: JSON.stringify({ _id: reportedStudent._id, data: { groupId: -1 } })
            })
        } else {
            await fetch('/api/mongodb?unset=true', {
                method: 'post',
                body: JSON.stringify({ _id: reportedStudent._id, data: { groupId: "", reported: '' } })
            })
        }

        await fetch('/api/mongodb', {
            method: 'post',
            body: JSON.stringify({ _id: selectedReplacement._id, data: { "groupId": groupId } })
        })

        report.replaced_by = { _id: selectedReplacement._id, name: `${selectedReplacement.firstname} ${selectedReplacement.lastname}` }
        await fetch('/api/mongodb', {
            method: 'post',
            body: JSON.stringify({ _id: tutor._id, data: tutor })
        })
        toggleTraiteCase()
    }
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedReplacement, setSelectedReplacement] = useState("")
    const filteredAwaitingStudents = awaitingStudents.filter(createFilter(searchTerm, ['firstname', 'lastname', 'whatsapp']))

    useEffect(() => {
        console.log(awaitingStudents)
        awaitingStudents.push({ firstname: "retour liste d'attente", lastname: "" })
        awaitingStudents.push({ firstname: "--", lastname: "" })
    }, [awaitingStudents])

    return (<div className="12u 12u(small)" >
        <SearchInput className="search-input" placeholder="Tapez nom ou prénom ou numéro de l'élève..." onChange={(term) => { setSearchTerm(term) }} />
        <br />
        {
            searchTerm !== "" && <>
                {filteredAwaitingStudents.slice(0, 3).map(student => (
                    <>
                        <input type="radio" id={`${student.firstname}-${student.lastname}`} name="demo-priority" onChange={() => { setSelectedReplacement(student) }} />
                        <label htmlFor={`${student.firstname}-${student.lastname}`}>{student.lastname} {student.firstname}</label>
                    </>
                ))}
                {selectedReplacement && <div className="button special" onClick={() => replaceStudent(reportedStudent, selectedReplacement)}>Confimer</div>}
            </>

        }
    </div>)
}

export default SearchAndReplaceStudent