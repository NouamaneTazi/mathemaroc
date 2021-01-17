import Head from "next/head" 
import { useState, useEffect, Fragment } from "react"
import Layout from '../components/Layout'
import { useFetchUser } from '../lib/user' 
import SearchAndReplaceStudent from '../components/demandeseleves/SearchAndReplaceStudent'

 
const Reports = () => {
    const getUserData = async (user) => {
        let res = await fetch('/api/mongodb?auth0id=' + user.sub)
        let json = await res.json()
        Object.assign(user, json)
        res = await fetch('/api/mongodb?getDemandesDeleves=true')
        const new_tutors = await res.json()
        res = await fetch('/api/mongodb?getAwaitingStudents=true')
        const awaitingStudents = await res.json()

        setTutors(new_tutors)
        setAwaitingStudents(awaitingStudents)
    } 

    const handleModClick = async (tutor, report_id) => {
        if (tutor.reports[report_id].mod) {
            delete tutor.reports[report_id].mod
        } else {
            tutor.reports[report_id].mod = { "id": user.sub, "name": user.name }
        }

        const res = await fetch('/api/mongodb', {
            method: 'post',
            body: JSON.stringify({ _id: tutor._id, data: { reports: tutor.reports } })
        })
        setRefresh(!refresh)
    }
 
    let { user, loading } = useFetchUser()
    const [tutors, setTutors] = useState([]) 
    const [awaitingStudents, setAwaitingStudents] = useState([])
    const [refresh, setRefresh] = useState(true)
    const [replacingStudent, setReplacingStudent] = useState(false)

    useEffect(() => { 
        // {console.log("useEffect", user, loading)} 
        if (user && !loading) {
            getUserData(user) 
        }
    }, [user, loading])

    return (
        <>
            {!loading && <Layout user={user} loading={loading}> 
                <Head>
                    <title>Demandes élèves</title>
                    <meta name="description" content="Demandes élèves" />
                </Head>
                <MenuAdmin user={user}/>
                <section id="one">
                    <div className="inner" style={{ maxWidth: "90%", width: "100%" }}>
                        <header className="major">
                            {user ? <h1>Demandes d'élèves</h1> : <h1>Vous n'êtes pas connectés</h1>}
                        </header>
                        <p><b>Attention : </b> Fach tkhtaru TOUS les élèves à attribuer wdiru confirmer cava actualiser la page automatiquement wmaghatbqawch tlqaw le prof fhad la page. Donc faites attention avant de cliquer confirmer de bien selectionner tous les élèves concernés.</p>

                        {/* <p>Demandes en attente : {tutors.reduce((s, tutor) => s + tutor.reports.filter(report => !("mod" in report)).length, 0)} <br />
                        Demandes traités : {tutors.reduce((s, tutor) => s + tutor.reports.filter(report => "mod" in report).length, 0)}</p> */}
                        <div className="12u 12u(medium)">
                            <div className="table-wrapper">
                                <table>
                                    <thead>
                                        <tr> 
                                            <th>Date</th>
                                            <th>Tuteur</th>
                                            <th>Groupe</th> 
                                            <th>Nombre d'élèves demandés</th> 
                                            <th>Élèves donnés</th>
                                        </tr> 
                                    </thead> 
                                    <tbody> 

                                        {tutors.map(tutor => {
                                            const asked_more_students = tutor.asked_more_students
                                            return (
                                                <tr key={`${tutor._id}`}> 
                                                    <td>{asked_more_students.time}</td> 
                                                    <td>{tutor.firstname} {tutor.lastname}</td> 
                                                    <td>{tutor.groupId}</td>
                                                    <td>{asked_more_students.number}</td>

                                                    <td> 
                                                        <SearchAndReplaceStudent tutor={tutor} awaitingStudents={awaitingStudents} />
                                                    </td>
                                                </tr>)
                                        }
                                        )}
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