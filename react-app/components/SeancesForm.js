import { useState, useEffect, StrictMode } from "react"
import moment from 'moment' 
import Icon from '@material-ui/core/Icon';
import Rating from 'react-rating'
 
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
    console.log()
    const handleDateChange = (index, event) => {
        moment.locale('fr')
        let date = event.target.value
        if (moment(date, ["DD-MM-YYYY", "DD/MM/YYYY", 'YYYY-MM-DD', 'YYYY/MM/DD'], true).isValid()) {
            date = moment(date, ["DD-MM-YYYY", "DD/MM/YYYY", 'YYYY-MM-DD', 'YYYY/MM/DD'], true)
            if (moment("2020-03-20") <= date && date < moment().add(1, 'M')) { 
                const values = [...inputFields];
                values[index][event.target.name] = date.format('YYYY-MM-DD')
                setInputFields(values) 
            }
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
        <>
            {/* {console.log('inputs', inputFields)} */}
            <div className='inner' style={{ padding: 0 }}>
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
                                <th>Ressenti</th>
                                <th></th>
                            </tr>
                        </thead> 
                        {editMode ? <tbody>
                            {inputFields.map((inputField, index) => (
                                <tr key={`${inputField}~${index}`}>
                                    <td style={{ width: '10%' }}>
                                        <input 
                                            type="date"
                                            id="date"
                                            name="date"
                                            value={inputField.date}
                                            onChange={event => handleDateChange(index, event)}
                                            style={{ backgroundColor: "#3e467f" }}
                                            placeholder="dd/mm/yyyy"
                                        />
                                    </td>
                                    <td style={{ width: '10%' }}>
                                        <input 
                                            type="text"
                                            id="duree"
                                            name="duree"
                                            value={inputField.duree}
                                            onChange={event => handleInputChange(index, event)} 
                                        />
                                    </td>
                                    <td> 
                                        <textarea name="chapitres" id="chapitres-traites" placeholder="Enter your message" rows="7" value={inputField.chapitres} onChange={event => handleInputChange(index, event)}></textarea>
 
                                    </td>

                                    <td> 
                                        {user.students.map((student) => (
                                            <div className="12u 12u(small)" key={student._id}> 
                                                {/* TODO: handle checked for absent students */} 
                                                <input type="checkbox" id={`${index}-${student._id}`} onChange={() => handleAbsentsChange(index, student)} />
                                                <label htmlFor={`${index}-${student._id}`}>{student.fullname}</label>
                                            </div>
                                        ))
                                        } 
                                    </td>

                                    <td>
                                        <textarea name="remarques" id="remarques" placeholder="Enter your message" rows="7" value={inputField.remarques} onChange={event => handleInputChange(index, event)}></textarea> 

                                    </td>
                                    <td style={{ width: 180, paddingLeft: 0, paddingRight: 0 }}>
                                        <Rating 
                                            initialRating={inputFields[index].rating}
                                            onChange={(val) => handleInputChange(index, { target: { name: 'rating', value: val } })}
                                            emptySymbol={['sentiment_very_dissatisfied', 'sentiment_dissatisfied', 'sentiment_satisfied', 'sentiment_satisfied_alt', 'sentiment_very_satisfied'].map(x => <Icon style={{ fontSize: 30 }}>{x}</Icon>)}
                                            fullSymbol={['sentiment_very_dissatisfied', 'sentiment_dissatisfied', 'sentiment_satisfied', 'sentiment_satisfied_alt', 'sentiment_very_satisfied'].map(x => <Icon style={{ fontSize: 30, color: "#2ea1d9" }}>{x}</Icon>)}
                                        />
                                    </td>
                                    <td>
                                        <Icon style={{ fontSize: 30, verticalAlign: "text-top", color: "white", cursor: "pointer" }} onClick={() => handleRemoveFields(index)}>remove_circle</Icon> 
                                    </td>
                                </tr>
                            ))}
                            <tr><th></th><th></th><th></th><th></th><th></th><th></th>
                                <th style={{ paddingBottom: 0 }}>
                                    <Icon style={{ fontSize: 30, verticalAlign: "text-top", color: "white", cursor: "pointer" }} onClick={() => handleAddFields()}>add_circle</Icon> 
                                </th>
                            </tr>
                        </tbody>  
                            : <tbody>
                                {inputFields.map((inputField, index) => ( 
                                    <tr key={`${inputField}~${index}`}>
                                        <td>{inputField.date ? moment(inputField.date, ['YYYY-MM-DD']).format('DD MMM YYYY') : ""}</td>
                                        <td>{inputField.duree}</td>
                                        <td>{inputField.chapitres}</td>
                                        <td>{Object.values(inputField.absents).join(', ')}</td> 
                                        <td>{inputField.remarques}</td>
                                        <td style={{ width: 180, paddingLeft: 0, paddingRight: 0 }}>
                                            <Rating
                                                readonly
                                                initialRating={inputFields[index].rating}
                                                onChange={(val) => handleInputChange(index, { target: { name: 'rating', value: val } })}
                                                emptySymbol={['sentiment_very_dissatisfied', 'sentiment_dissatisfied', 'sentiment_satisfied', 'sentiment_satisfied_alt', 'sentiment_very_satisfied'].map(x => <Icon style={{ fontSize: 30, verticalAlign: "text-top", color: "white" }}>{x}</Icon>)}
                                                fullSymbol={['sentiment_very_dissatisfied', 'sentiment_dissatisfied', 'sentiment_satisfied', 'sentiment_satisfied_alt', 'sentiment_very_satisfied'].map(x => <Icon style={{ fontSize: 30, verticalAlign: "text-top", color: "#2ea1d9" }}>{x}</Icon>)}
                                            /> 
                                        </td>
                                    </tr>
                                ))}
                            </tbody>} 
                    </table>
                </div> 
                {(!inputFields || inputFields.length === 0) && <p style={{ textAlign: 'center' }}>Tu peux remplir ici les comptes rendus de chaque séance que tu fais avec tes élèves pour qu'on sache que les élèves sont bien pris en charge</p>}

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
            </div> 
        </>
 
    )
}

export default Seances