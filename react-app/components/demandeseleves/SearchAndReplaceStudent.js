import SearchInput, { createFilter } from 'react-search-input'
import { useState, useEffect, Fragment } from "react"

const SearchAndReplaceStudent = ({ awaitingStudents, tutor }) => {
    const giveStudents = async () => { 
        for (let student of selectedStudents) {
            await fetch('/api/mongodb', {
                method: 'post',
                body: JSON.stringify({ _id: student._id, data: { "groupId": tutor.groupId } }) 
            })
        }
        await fetch('/api/mongodb?unset=true', {
            method: 'post', 
            body: JSON.stringify({ _id: tutor._id, data: { asked_more_students: "" } })
        }) 
        window.location.reload(false);
    }
    const handleSelectingStudent = student => {
        if (!selectedStudents.includes(student)) { 
            let value = selectedStudents
            value.push(student)
            setSelectedStudents([...value])
        }
    } 

    const [searchTerm, setSearchTerm] = useState("") 
    const [selectedStudents, setSelectedStudents] = useState([]) 
    const filteredAwaitingStudents = awaitingStudents.filter(createFilter(searchTerm, ['firstname', 'lastname', 'whatsapp']))
 
    return (<div className="12u 12u(small)" >
        <div className="row" style={{ display: "contents" }}> 
            {selectedStudents.map(student => ( 
                <Fragment key={student._id}>
                    <button
                        className="button icon fa-times" 
                        style={{ marginBottom: "1em", fontSize: "11px" }}
                        onClick={() => setSelectedStudents(selectedStudents.filter(e => e._id != student._id))}
                    >{student.fullname}</button>
                </Fragment> 
            ))}
        </div>
        <SearchInput className="search-input" placeholder="Tapez nom ou prénom ou numéro de l'élève..." onChange={(term) => { setSearchTerm(term) }} />
        <br />
        {
            searchTerm !== "" && <>
                {filteredAwaitingStudents.slice(0, 3).map(student => (
                    <Fragment key={student._id}>
                        <input type="checkbox" id={`${student.firstname}-${student.lastname}`} name="demo-priority" onChange={() => { handleSelectingStudent(student) }} /> 
                        <label htmlFor={`${student.firstname}-${student.lastname}`}>{student.lastname} {student.firstname}</label> 
                    </Fragment> 
                ))}
                {selectedStudents.length > 0 && <div className="button special" onClick={() => giveStudents()}>Confimer</div>}  
            </>
        }
    </div >)
}
export default SearchAndReplaceStudent