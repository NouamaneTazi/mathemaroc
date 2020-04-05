import { useState, useEffect, StrictMode } from "react"
import moment from 'moment'
import Icon from '@material-ui/core/Icon';

const Seances = ({ user }) => {

    const handleAddFields = () => {
        const values = [...inputFields];
        values.push({ chapitres: '', absents: {}, remarques: '', duree: '' });
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
        moment.locale('fr')
        let date = event.target.value
        if (moment(date, ["DD-MM-YYYY", "DD/MM/YYYY", 'YYYY-MM-DD', 'YYYY/MM/DD'], true).isValid()) {
            date = moment(date, ["DD-MM-YYYY", "DD/MM/YYYY", 'YYYY-MM-DD', 'YYYY/MM/DD'], true).format('YYYY-MM-DD')
            const values = [...inputFields];
            values[index][event.target.name] = date
            setInputFields(values)
        }
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
        let seances = inputFields.filter(input => input.date || input.duree || input.chapitres || input.remarques) // Keep non empty seances
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
        <div className="12u">
            <h2>Séances</h2>

            <div className="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Durée</th>
                            <th>Chapitres traités</th>
                            <th>Élèves absents</th>
                            <th>Remarques</th>
                            <th></th>
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
                                        placeholder="dd/mm/yyyy"
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
                                <th>
                                    <Icon style={{ fontSize: 30, verticalAlign: "text-top", color: "white", cursor: "pointer" }} onClick={() => handleRemoveFields(index)}>remove_circle</Icon>
                                </th>
                            </tr>
                        ))}
                        <tr><th></th><th></th><th></th><th></th><th></th>
                            <th style={{paddingBottom:0}}>
                                <Icon style={{ fontSize: 30, verticalAlign: "text-top", color: "white", cursor: "pointer" }} onClick={() => handleAddFields()}>add_circle</Icon>
                            </th>
                        </tr>
                    </tbody>
                        : <tbody>
                            {inputFields.map((inputField, index) => (
                                <tr key={`${inputField}~${index}`}>
                                    <td>{moment(inputField.date,['YYYY-MM-DD']).format('DD MMM YYYY')}</td>
                                    <td>{inputField.duree}</td>
                                    <td>{inputField.chapitres}</td>
                                    <td>{Object.values(inputField.absents).join(', ')}</td>
                                    <td>{inputField.remarques}</td>
                                </tr>
                            ))}
                        </tbody>}
                </table>
            </div>

            <div>
                {editMode ?
                    <button className="button" onClick={() => handleSubmitSeances()}>Enregistrer</button>

                    : <button className="button icon fa-pencil" onClick={() => {
                        setSavedSuccess(false)
                        setEditMode(true)
                    }}>Modifier</button>
                }
                {savedSuccess && <div style={{ display: "inline", marginLeft: "10px" }}>Modification réussie !</div>}
            </div>
        </div >
    )
}

export default Seances