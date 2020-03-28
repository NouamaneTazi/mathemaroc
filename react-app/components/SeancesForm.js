import { useState, useEffect, StrictMode } from "react"
import moment from 'moment'

const Seances = ({ user }) => {

    const handleAddFields = () => {
        const values = [...inputFields];
        values.push({ date: undefined, chapitres: '', absents: {}, remarques: '', duree: '' });
        setInputFields(values);
    };

    const handleRemoveFields = index => {
        const values = [...inputFields];
        values.splice(index, 1);
        setInputFields(values);
    };

    const handleInputChange = (index, event) => {
        const values = [...inputFields];
        values[index][event.target.name] = event.target.value
        setInputFields(values);
    };

    const handleDateChange = (index, event) => {
        let date = event.target.value
        if (moment(date, ["DD-MM-YYYY","DD/MM/YYYY"], true).isValid()){
            date = moment(date, ["DD-MM-YYYY","DD/MM/YYYY"], true).format('YYYY-MM-DD')
        }
        const values = [...inputFields];
        values[index][event.target.name] = date
        setInputFields(values)
    }

    const handleAbsentsChange = (index, absentStudent) => {
        if (absentStudent._id in inputFields[index].absents) delete inputFields[index].absents[absentStudent._id]
        else {
            let values = inputFields
            values[index].absents[absentStudent._id] = `${absentStudent.firstname} ${absentStudent.lastname}`
            setInputFields(values);
        }
    }

    const handleSubmitSeances = async () => {
        let seances = inputFields.filter(input => input.date || input.duree || input.chapitres || input.absents || input.remarques) // Keep non empty seances
        // console.log("query", user._id, seances)
        const res = await fetch('/api/mongodb', {
            method: 'post',
            body: JSON.stringify({ _id: user._id, data: { seances: seances, last_updated: new Date(Date.now()).toLocaleString("en-US") } })
        })
        setInputFields(seances)
        setEditMode(false)
        setSavedSuccess(true)
    }

    const [inputFields, setInputFields] = useState(user.seances ? user.seances : []);
    const [editMode, setEditMode] = useState(false)
    const [savedSuccess, setSavedSuccess] = useState(false)


    return (
        <div className="12u 12u(medium)">
            <h4>Séances</h4>

            <div className="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Durée</th>
                            <th>Chapitres traités</th>
                            <th>Elèves absents</th>
                            <th>Remarques</th>
                        </tr>
                    </thead>
                    {editMode ? <tbody>
                        {inputFields.map((inputField, index) => (
                            <tr key={`${inputField}~${index}`}>
                                <th>
                                    <input
                                        type="date"
                                        id="date"
                                        name="date"
                                        value={inputField.date}
                                        onChange={event => handleDateChange(index, event)}
                                        style={{ backgroundColor: "#3e467f" }}
                                    />
                                </th>
                                <th>
                                    <input
                                        type="text"
                                        id="duree"
                                        name="duree"
                                        value={inputField.duree}
                                        onChange={event => handleInputChange(index, event)}
                                    />
                                </th>
                                <th>
                                    <textarea name="chapitres" id="chapitres-traites" placeholder="Enter your message" rows="7" value={inputField.chapitres} onChange={event => handleInputChange(index, event)}></textarea>

                                </th>

                                <th>
                                    {user.students.map((student) => (
                                        <div className="12u 12u(small)" key={student._id}>
                                            {/* TODO: handle checked for absent students */}
                                            <input type="checkbox" id={`${index}-${student._id}`} onChange={() => handleAbsentsChange(index, student)} />
                                            <label htmlFor={`${index}-${student._id}`}>{student.firstname} {student.lastname}</label>
                                        </div>
                                    ))
                                    }
                                </th>

                                <th>
                                    <textarea name="remarques" id="remarques" placeholder="Enter your message" rows="7" value={inputField.remarques} onChange={event => handleInputChange(index, event)}></textarea>

                                </th>
                                <button onClick={() => handleRemoveFields(index)}>-</button>
                            </tr>
                        ))}
                    </tbody>
                        : <tbody>
                            {inputFields.map((inputField, index) => (
                                <tr key={`${inputField}~${index}`}>
                                    <td>{inputField.date}</td>
                                    <td>{inputField.duree}</td>
                                    <td>{inputField.chapitres}</td>
                                    <td>{Object.values(inputField.absents).join(', ')}</td>
                                    <td>{inputField.remarques}</td>
                                </tr>
                            ))}
                        </tbody>}
                </table>
            </div>
            {editMode && <button onClick={() => handleAddFields()}>+</button>}
            <div>
                {editMode ?
                    <button className="button" onClick={() => handleSubmitSeances()}>Enregistrer</button>

                    : <button className="button" onClick={() => {
                        setSavedSuccess(false)
                        setEditMode(true)
                    }}>Modifier</button>
                }
                {savedSuccess && <div style={{ display: "inline", marginLeft: "10px" }}>Modification réussie !</div>}
            </div>
        </div>
    )
}

export default Seances