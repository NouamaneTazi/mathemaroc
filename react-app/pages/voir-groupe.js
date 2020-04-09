import Head from "next/head"
import { useState, useEffect } from "react"
import Layout from '../components/Layout'
import { useFetchUser } from '../lib/user'
import SeancesLineChart from '../components/SeancesLineChart'
import MenuAdmin from '../components/MenuAdmin'
import moment from 'moment'
import useWindowSize from "react-use/lib/useWindowSize"

const Admin = () => {
    const getGroupUsers = async () => {
        setLoading(true)
        let res = await fetch('/api/mongodb?auth0id=' + user.sub)
        let json = await res.json()
        Object.assign(user, json)
        res = await fetch('/api/mongodb?getUsersByGroupId=' + groupId)
        const users = await res.json()
        let students = []
        let tutor = undefined
        users.map(user => user.role == "tutor" ? tutor = user : user.role == "student" ? students.push(user) : null)
        setTutor(tutor)
        setStudents(students)
        setLoading(false)
    }

    const handeRetourListeAttente = async () => {
        setLoading(true)
        for (let student of students) {
            await fetch('/api/mongodb?unset=true', {
                method: 'post',
                body: JSON.stringify({ _id: student._id, data: { groupId: "" } })
            })
        }
        setLoading(false)
        setStudents([])
    }

    let { user, loading: userLoading } = useFetchUser()
    const [loading, setLoading] = useState(false)
    const [groupId, setGroupId] = useState()
    const [tutor, setTutor] = useState()
    const [students, setStudents] = useState([])

    return (
        <>
            {/* {console.log(user)} */}
            {!userLoading && <Layout user={user} loading={userLoading}>
                <Head>
                    <title>Suivi du catalogue</title>
                    <meta name="description" content="Suivi du catalogue" />
                </Head>
                <MenuAdmin user={user} />
                <section id="one">
                    <div className="inner">
                        <header className="major">
                            {user ? <h1>Voir un groupe</h1> : <h1>Vous n'êtes pas connectés</h1>}
                        </header>

                        {/* {groupUsers.length > 0 &&
                            <div className="12u 12u(medium)">
                                <h3>Compteur de séances données :</h3>
                                <div className="box" style={{ textAlign: "center" }}>
                                    <h1>{getNumberSeances(groupUsers)}</h1>
                                </div>

                            </div>
                        } */}
                        <div className="row" style={{ display: 'flex', alignItems: 'center', marginBottom: '1em' }}>
                            <span style={{ width: "20em", fontSize: 'large', fontWeight: 600 }}>Entrez le numéro du groupe :</span>
                            <input type="text" value={groupId} onChange={e => setGroupId(e.target.value)} onKeyPress={(e) => e.key === 'Enter' ? getGroupUsers() : null} />
                            <button className="button special" onClick={() => getGroupUsers()}>Confirmer</button>
                        </div>

                    </div>
                    <div className="inner" style={{ maxWidth: "95%", width: "100%" }}>

                        <div className="table-wrapper">
                            <h2>Tuteur :</h2>
                            <table className="alt">
                                <thead>
                                    <tr>
                                        <th>Groupe</th>
                                        <th>Tuteur</th>
                                        <th>Date d'inscription</th>
                                        <th>Dernière modification</th>
                                        <th>Statut</th>
                                        <th>Téléphone</th>
                                        <th>Mail</th>
                                        <th>Nombre de séances</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tutor && <>
                                        <tr>
                                            <td>{tutor.groupId}</td>
                                            <td>{tutor.fullname}</td>
                                            <td>{moment(tutor.updated_at).format('DD/MM/YYYY')}</td>
                                            <td>{moment(tutor.last_updated).format('DD/MM/YYYY')}</td>
                                            <td>{tutor.statut}</td>
                                            <td>{tutor.whatsapp}</td>
                                            <td>{tutor.mail}</td>
                                            <td>{tutor.seances ? tutor.seances.length : 0}</td>
                                        </tr>
                                    </>}
                                </tbody>
                            </table>
                        </div>

                        <h2 style={{display:"inline-block", marginBottom:"1em"}}>Liste des élèves : </h2>
                        <button className="button special small" style={{verticalAlign:'super', float:"right"}} onClick={() => handeRetourListeAttente()}>retour élèves liste d'attente</button>
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
                                        <th>Signalé</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.map(student => (

                                        <tr key={student._id} onMouseEnter={() => null}>
                                            <td>{student.firstname} {student.lastname}</td>
                                            <td>{student.lycee}</td>
                                            <td>{student.ville}</td>
                                            <td>{student.filiere}</td>
                                            <td>{student.matiere}</td>
                                            <td>{student.wishes}</td>
                                            <td>{student.whatsapp}</td>
                                            <td>{student.facebook}</td>
                                            <td style={{ textAlign: "center" }}>{student.reported ? 'Oui' : 'Non'}</td>
                                        </tr>

                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <h2>Liste des séances</h2>
                        <div className="table-wrapper">
                            <table className="alt">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Durée</th>
                                        <th>Chapitres traités</th>
                                        <th>Élèves absents</th>
                                        <th>Remarques</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tutor && tutor.seances && tutor.seances.map((seance, index) => (
                                        <tr key={`${tutor._id}~${index}`}>
                                            <td>{seance.date}</td>
                                            <td>{seance.duree}</td>
                                            <td>{seance.chapitres}</td>
                                            <td>{Object.values(seance.absents).join(', ')}</td>
                                            <td>{seance.remarques}</td>
                                        </tr>
                                    ))}
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