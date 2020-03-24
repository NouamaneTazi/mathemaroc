import Head from "next/head"
import { useState, useEffect } from "react"
import Layout from '../components/Layout'
import { useFetchUser } from '../lib/user'
import SearchInput, { createFilter } from 'react-search-input'


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
            console.log("tutors", json)
            user.needsSetup = true
            setTutors(json)
        }
        else if (json.role == "tutor") {
            res = await fetch('/api/mongodb?groupId=' + json.groupId)
            json.students = await res.json()
            json.students = json.students.filter(student => student.role == "student")
            console.log("json", json)
            Object.assign(user, json);
            user.isSetup = true
            setUserData(user)
        }
    }

    const associateTutor = async (tutor) => {
        Object.assign(user, tutor);
        delete user.needsSetup
        user.auth0id = user.sub
        delete user.sub
        console.log("associateTutor", user)
        const res = await fetch('/api/mongodb', {
            method: 'post',
            body: JSON.stringify({ _id: tutor._id, user })
        })
        window.location.reload(false);
    }

    let { user, loading } = useFetchUser()
    const [userData, setUserData] = useState()
    const [tutors, setTutors] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [error, setError] = useState()

    useEffect(() => {
        // {console.log("useEffect", user, loading)}
        if (user && !loading) {
            getUserData(user)
        }
    }, [user, loading])

    let selectedTutor = ""
    const filteredTutors = tutors.filter(createFilter(searchTerm, ['firstname', 'lastname']))
    console.log("filteredTutors", filteredTutors)
    return (
        <>
            {!loading && <Layout user={user} loading={loading}>
                {console.log("user", user)}
                <Head>
                    <title>Profile Page</title>
                    <meta name="description" content="Profile Page" />
                </Head>

                {user && user.isSetup ? <div id="main" className="alt">
                    <section id="one">
                        <div className="inner">
                            <header className="major">
                                <h1>Profile</h1>
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

                        </div>
                    </section>
                </div>
                    // user not associated
                    : user && user.needsSetup ? <div id="main" className="alt">
                        <section id="one">
                            <div className="inner">
                                <header className="major">
                                    <h1>Profile</h1>
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
                                            <SearchInput className="search-input" onChange={(term) => { setSearchTerm(term) }} />
                                            <br/>
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
                                                <div style={{display:"inline", marginLeft:"10px"}}>Je ne vois pas mon nom</div>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </section>
                    </div>
                        // Not yet connected
                        : <div id="main" className="alt">
                            <section id="one">
                                <div className="inner">
                                    <header className="major">
                                        <h1>Profile</h1>
                                    </header>
                                    <a href="/api/login" className="button special">Se connecter</a>
                                </div>
                            </section>
                        </div>
                }


            </Layout>}
        </>
    )
}

export default Profile