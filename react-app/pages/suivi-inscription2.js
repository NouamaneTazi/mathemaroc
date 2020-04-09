import Head from "next/head"
import { useState, useEffect } from "react"
import Layout from '../components/Layout'
import { useFetchUser } from '../lib/user'
import SeancesLineChart from '../components/SeancesLineChart'

import moment from 'moment'

const Admin = () => {
    const getUserData = async (user) => {
        let res = await fetch('/api/mongodb?auth0id=' + user.sub)
        let json = await res.json()
        Object.assign(user, json)
        res = await fetch('/api/mongodb?getStudentsSignUps=true')
        const value = await res.json()
        setStudents(value)
    }

    let { user, loading } = useFetchUser()
    const [students, setStudents] = useState([])
    const [refresh, setRefresh] = useState(true)

    useEffect(() => {
        // {console.log("useEffect", user, loading)}
        if (user && !loading) {
            getUserData(user)
        }
    }, [user, loading])

    return (
        <>
            {/* {console.log(user)} */}
            {!loading && <Layout user={user} loading={loading}>
                <Head>
                    <title>Suivi inscriptions</title>
                    <meta name="description" content="Suivi inscriptions" />
                </Head>
                
                <section id="one">
                    <div className="inner">
                        <header className="major">
                            {user ? <h1>Suivi des inscriptions - élèves</h1> : <h1>Vous n'êtes pas connectés</h1>}
                        </header>

                        {/* {groupUsers.length > 0 &&
                            <div className="12u 12u(medium)">
                                <h3>Compteur de séances données :</h3>
                                <div className="box" style={{ textAlign: "center" }}>
                                    <h1>{getNumberSeances(groupUsers)}</h1>
                                </div>

                            </div>
                        } */}
                    </div>
                    <div className="inner" style={{ maxWidth: "95%", width: "100%" }}>

                        <div className="table-wrapper">
                            <table className="alt dense">
                                <thead>
                                    <tr>
                                        <th>Élève</th>
                                        <th>Date</th>
                                        <th>Téléphone</th>
                                        <th>Facebook</th>
                                        <th>Mail</th>
                                        <th>Lycée</th>
                                        <th>Ville</th>
                                        <th>Filière</th>
                                        <th>Matières</th>
                                        <th>Demandes</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students && students.length > 0 && students.map((student) => {
                                        return (
                                            <>
                                                <tr key={`${student._id}`}>
                                                    <td>{student.fullname}</td>
                                                    <td>{moment(student.updated_at).format('DD/MM/YYYY HH:mm:ss')}</td>
                                                    <td>{student.whatsapp}</td>
                                                    <td>{student.facebook}</td>
                                                    <td>{student.mail}</td>
                                                    <td>{student.lycee}</td>
                                                    <td>{student.ville}</td>
                                                    <td>{student.filiere}</td>
                                                    <td>{student.matiere}</td>
                                                    <td>{student.wishes}</td>
                                                </tr>
                                            </>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>


                    </div>
                </section >
            </Layout >
            }
        </>
    )
}

export default Admin