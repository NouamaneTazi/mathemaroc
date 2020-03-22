import Head from "next/head"
import { useState, useEffect } from "react"
import Layout from '../components/Layout'
import { useFetchUser } from '../lib/user'

const Profile = () => {
    const getUserData = async (user) => {
        let res = await fetch('/api/mongodb?id=' + user.sub)
        const json = await res.json()
        console.log("json", json)
        if (json.err) {
            setError({ error: true })
        }
        else {
            if (json.isTeacher) {
                res = await fetch('/api/mongodb?groupId=' + json.groupId)
                json.students = await res.json()
                json.students = json.students.filter(student => student.isStudent)
            }
            // console.log("json", json)
            setUserData(json)
        }

    }

    let { user, loading } = useFetchUser()
    const [userData, setUserData] = useState()
    const [error, setError] = useState()
    if (user && !userData && !loading && !error) {
        getUserData(user)
    }

    return (
        <Layout user={user} loading={loading}>

            <Head>
                <title>Profile Page</title>
                <meta name="description" content="Profile Page" />
            </Head>

            {userData && <div id="main" className="alt">
                <section id="one">
                    <div className="inner">
                        <header className="major">
                            <h1>Profile</h1>
                        </header>

                        <div className="row 200%">
                            <div className="6u 12u(medium)">
                                <h2 id="content">Nouamane Tazi</h2>
                                <ul className="alt">
                                    <li><strong>Email :</strong> {userData.email}</li>
                                    <li><strong>Phone :</strong> {userData.phone}</li>
                                </ul>

                            </div>
                        </div>

                        <div className="12u 12u(medium)">
                            <h4>Liste des élèves</h4>
                            <div className="table-wrapper">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Nom</th>
                                            <th>Demandes</th>
                                            <th>Filière</th>
                                            <th>Téléphone</th>
                                            <th>Email</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userData.students.map(student => (<tr>
                                            <td>{student.name}</td>
                                            <td>{student.wishes}</td>
                                            <td>{student.filiere}</td>
                                            <td>{student.phone}</td>
                                            <td>{student.email}</td>
                                        </tr>))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </section>
            </div>
            }

            {error && <div id="main" className="alt">
                <section id="one">
                    <div className="inner">
                        <header className="major">
                            <h1>Profile</h1>
                        </header>
                        <h2 id="content">Profile pas encore créé !</h2>
                        <p>Veuillez nous contacter..</p>
                    </div>
                </section>
            </div>
            }
        </Layout>
    )
}

export default Profile