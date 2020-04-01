import Head from "next/head"
import { useState, useEffect } from "react"
import Layout from '../components/Layout'
import { useFetchUser } from '../lib/user'
import SearchAwaitingStudents2 from '../components/SearchAwaitingStudents2'
import moment from 'moment'

const Reports = () => {
    const getUserData = async (user) => {
        let res = await fetch('/api/mongodb?auth0id=' + user.sub)
        let json = await res.json()
        Object.assign(user, json)

        res = await fetch('/api/mongodb?getAwaitingStudents=true')
        const awaitingStudents = await res.json()

        setAwaitingStudents(awaitingStudents)
    }

    let { user, loading } = useFetchUser()
    const [awaitingStudents, setAwaitingStudents] = useState([])
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
                    <title>Magasin des élèves</title>
                    <meta name="description" content="Magasin des élèves" />
                </Head>
                <section id="one">
                    <div className="inner">
                        <header className="major">
                            <h1>Magasin des élèves</h1>
                        </header>

                        <div className="12u 12u(medium)">
                            <div className="table-wrapper">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Date de demande</th>
                                            <th>Filière</th>
                                            <th>Matières</th>
                                            <th>Demandes</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {awaitingStudents.map(student => (
                                            <tr key={`${student._id}`}>
                                                <td>{moment(student.timestamp).format('DD/MM/YYYY HH:mm:ss')}</td>
                                                <td>{student.filiere}</td>
                                                <td>{student.matiere}</td>
                                                <td>{student.wishes}</td>
                                            </tr>
                                        ))

                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </section>
            </Layout>
            }
        </>
    )
}

export default Reports