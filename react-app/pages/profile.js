import Head from "next/head"
import { useState, useEffect } from "react"
import Layout from '../components/Layout'
import { useFetchUser } from '../lib/user'
import SearchInput, { createFilter } from 'react-search-input'
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles, makeStyles } from '@material-ui/core/styles';

const Profile = () => {
    const getUserData = async (user) => {
        let res = await fetch('/api/mongodb?auth0id=' + user.sub)
        let json = await res.json()
        // console.log("json", json)
        if (json.err) {
            setError(true)
        }
        else if (json.notYetSetUp) {
            let res = await fetch('/api/mongodb?role=tutor') // find all tutors
            const json = await res.json()
            // console.log("tutors", json)
            user.needsSetup = true
            setTutors(json)
        }
        else if (json.role == "tutor") {
            res = await fetch('/api/mongodb?groupId=' + json.groupId)
            json.students = await res.json()
            json.students = json.students.filter(student => student.role == "student")
            Object.assign(user, json);
            user.isSetup = true
            if (user.seances) { setInputFields(user.seances) }
            else setInputFields( [] )
        }
    }

    const associateTutor = async (tutor) => {
        Object.assign(user, tutor);
        delete user.needsSetup
        user.auth0id = user.sub
        delete user.sub
        delete user._id
        const res = await fetch('/api/mongodb', {
            method: 'post',
            body: JSON.stringify({ _id: tutor._id, data: user })
        })
        window.location.reload(false);
    }

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
            body: JSON.stringify({ _id: user._id, data: { seances: seances, last_updated: new Date(Date.now()).toLocaleString() } })
        })
        setInputFields(seances)
        setEditMode(false)
        setSavedSuccess(true)
    }

    let { user, loading } = useFetchUser()
    const [tutors, setTutors] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [error, setError] = useState()
    const [queryReady, setQueryReady] = useState(false)
    const [inputFields, setInputFields] = useState([]);
    const [editMode, setEditMode] = useState(false)
    const [savedSuccess, setSavedSuccess] = useState(false)

    useEffect(() => {
        // {console.log("useEffect", user, loading)}
        if (user && !loading) {
            getUserData(user)
        }
        setQueryReady(true)
    }, [user, loading])

    let selectedTutor = ""
    const filteredTutors = tutors.filter(createFilter(searchTerm, ['firstname', 'lastname']))
    const CustomizedTooltip = withStyles(theme => ({
        tooltip: {
            backgroundColor: theme.palette.common.white,
            color: '#3e467f',
            boxShadow: theme.shadows[1],
            fontSize: 16,
        },
    }))(Tooltip)


    return (
        <>
            {!loading && <Layout user={user} loading={loading}>
                {/* {console.log("user", user)} */}
                <Head>
                    <title>Profil</title>
                    <meta name="description" content="Profil" />
                </Head>

                {user && user.isSetup ? <div id="main" className="alt">
                    <section id="one">
                        <div className="inner">
                            <header className="major">
                                <h1>Profil</h1>
                            </header>

                            <div className="row 200%">
                                <div className="6u 12u(medium)">
                                    <h2 id="content">{user.firstname} {user.lastname}</h2>
                                    {/* <ul className="alt">
                                        <li><strong>Email :</strong> {user.email}</li>
                                        <li><strong>Phone :</strong> {user.phone}</li>
                                    </ul> */}

                                </div>
                            </div>
                            <div className="12u 12u(medium)">
                                <h4>Liste des élèves</h4>
                                <div className="table-wrapper">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Nom</th>
                                                <th>Lycée</th>
                                                <th>Ville</th>
                                                <th>Filière</th>
                                                <th>Matières</th>
                                                <th>Demandes</th>
                                                <th>Whatsapp</th>
                                                <th>Facebook</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {user.students.map(student => (<tr key={student._id}>
                                                <td>{student.firstname} {student.lastname}</td>
                                                <td>{student.lycee}</td>
                                                <td>{student.ville}</td>
                                                <td>{student.filiere}</td>
                                                <td>{student.matiere}</td>
                                                <td>{student.wishes}</td>
                                                <td>{student.whatsapp}</td>
                                                <td>{student.facebook}</td>
                                            </tr>))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

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
                                                            onChange={event => handleInputChange(index, event)}
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
                                                        <input
                                                            type="text"
                                                            id="chapitres-traites"
                                                            name="chapitres"
                                                            value={inputField.chapitres}
                                                            onChange={event => handleInputChange(index, event)}
                                                        />
                                                    </th>

                                                    <th>
                                                        {user.students.map((student) => (
                                                            <div className="6u 12u(small)" key={student._id}>
                                                                <input type="checkbox" id={`${index}-${student._id}`} onChange={() => handleAbsentsChange(index, student)} />
                                                                <label htmlFor={`${index}-${student._id}`}>{student.firstname} {student.lastname}</label>
                                                            </div>
                                                        ))
                                                        }
                                                    </th>

                                                    <th>
                                                        <input
                                                            type="text"
                                                            id="remarques"
                                                            name="remarques"
                                                            value={inputField.remarques}
                                                            onChange={event => handleInputChange(index, event)}
                                                        />
                                                    </th>
                                                    <button onClick={() => handleRemoveFields(index)}>-</button>
                                                </tr>
                                            ))}
                                        </tbody>
                                            : <tbody>
                                                {inputFields.map((inputField, index) => (
                                                    <tr key={`${inputField}~${index}`}>
                                                        <th>{inputField.date}</th>
                                                        <th>{inputField.duree}</th>
                                                        <th>{inputField.chapitres}</th>
                                                        <th>{Object.values(inputField.absents).join()}</th>
                                                        <th>{inputField.remarques}</th>
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


                        </div>
                    </section>
                </div>
                    // user not associated
                    : user && user.needsSetup ? <div id="main" className="alt">
                        <section id="one">
                            <div className="inner">
                                <header className="major">
                                    <h1>Profil</h1>
                                </header>

                                <div className="row 200%">
                                    <div className="12u 12u(medium)">
                                        <h2 id="content">Mettez à jour votre profil</h2>
                                        <h4>Selectionnez votre nom :</h4>
                                        <ul className="actions">
                                            {/* {tutors.map(tutor => (
                                                <div className="4u 12u(small)" key={tutor._id}>
                                                    <input type="radio" id={`${tutor.firstname}-${tutor.lastname}`} name="demo-priority" onChange={() => { selectedTutor = tutor }} />
                                                    <label htmlFor={`${tutor.firstname}-${tutor.lastname}`}>{tutor.lastname} {tutor.firstname}</label>
                                                </div>
                                            ))} */}
                                            <SearchInput className="search-input" placeholder="Tapez votre nom..." onChange={(term) => { setSearchTerm(term) }} />
                                            <br />
                                            {tutors.length !== filteredTutors.length ? filteredTutors.map(tutor => (
                                                <div className="12u 12u(small)" key={tutor._id}>
                                                    <input type="radio" id={`${tutor.firstname}-${tutor.lastname}`} name="demo-priority" onChange={() => { selectedTutor = tutor }} />
                                                    <label htmlFor={`${tutor.firstname}-${tutor.lastname}`}>{tutor.lastname} {tutor.firstname}</label>
                                                </div>
                                            )) : null}
                                        </ul>
                                        <div className="12u">
                                            <ul className="actions">
                                                <div className="button special" onClick={() => selectedTutor ? associateTutor(selectedTutor) : null}>Submit</div>
                                                <CustomizedTooltip placement="right" title="On a pas encore terminé l'attribution de tous les élèves. Veuillez revenir plus tard !">
                                                    <div style={{ display: "inline", marginLeft: "10px" }}>Je ne trouve pas mon nom !</div>
                                                </CustomizedTooltip>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </section>
                    </div>
                        // Not yet connected
                        : queryReady ? <div id="main" className="alt">
                            <section id="one">
                                <div className="inner">
                                    <header className="major">
                                        <h1>Profil</h1>
                                    </header>
                                    <a href="/api/login" className="button special">Se connecter</a>
                                </div>
                            </section>
                        </div>
                            : null
                }


            </Layout>}
        </>
    )
}

export default Profile