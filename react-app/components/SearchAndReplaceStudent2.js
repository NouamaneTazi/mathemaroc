import { useState, useEffect } from "react"
import SearchInput, { createFilter } from 'react-search-input'

const SearchAndReplaceStudent = ({ reportedStudent, awaitingStudents, groupId}) => {
    const replaceStudent = async (reportedStudent, selectedReplacement) => {
        await fetch('/api/mongodb', {
            method: 'post',
            body: JSON.stringify({ _id: reportedStudent._id, data: {"groupId":-1} })
        })
        if (selectedReplacement.firstname!=="--"){
            await fetch('/api/mongodb', {
                method: 'post',
                body: JSON.stringify({ _id: selectedReplacement._id, data: {"groupId":groupId} })
            })
        } 
        window.location.reload(false)
    }
    const [searchTerm, setSearchTerm] = useState("")
    const filteredAwaitingStudents = awaitingStudents.filter(createFilter(searchTerm, ['firstname', 'lastname', 'whatsapp']))
    let selectedReplacement = ""

    return (<div className="12u 12u(small)" >
        <SearchInput className="search-input" placeholder="Tapez nom ou prénom ou numéro de l'élève..." onChange={(term) => { setSearchTerm(term) }} />
        <br />
        {
            searchTerm !== "" ? <>
                {filteredAwaitingStudents.slice(0, 3).map(student => (
                    <>
                        <input type="radio" id={`${student.firstname}-${student.lastname}`} name="demo-priority" onChange={() => { selectedReplacement = student }} />
                        <label htmlFor={`${student.firstname}-${student.lastname}`}>{student.lastname} {student.firstname}</label>
                    </>
                ))}
                <div className="button special" onClick={() => replaceStudent(reportedStudent, selectedReplacement)}>Confimer</div>
            </> : null
        }
    </div>)
}

export default SearchAndReplaceStudent