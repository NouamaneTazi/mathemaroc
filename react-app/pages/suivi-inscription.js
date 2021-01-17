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
        res = await fetch('/api/mongodb?getTutorsSignUps=true')
        const value = await res.json()
        setGroupUsers(value.map(group => group.users).sort((b, a) => moment(a[0].updated_at) - moment(b[0].updated_at)))
    } 
 
    const handleModClick = async (tutor, seance_id) => {
        if (tutor.seances[seance_id].mod) {
            delete tutor.seances[seance_id].mod
        } else {
            tutor.seances[seance_id].mod = { "id": user.sub, "name": user.name }
        }
 
        const res = await fetch('/api/mongodb', {
            method: 'post',
            body: JSON.stringify({ _id: tutor._id, data: { seances: tutor.seances } })
        })
        setRefresh(!refresh)
    }

    let { user, loading } = useFetchUser()
    const [groupUsers, setGroupUsers] = useState([])
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
                    <title>Suivi du catalogue</title>
                    <meta name="description" content="Suivi du catalogue" />
                </Head>
                
                <section id="one"> 
                    <div className="inner">
                        <header className="major">
                            {user ? <h1>Suivi des inscriptions</h1> : <h1>Vous n'êtes pas connectés</h1>}
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
                    <div style={{ maxWidth: "95%", width: "100%", margin: "auto" }}>

                        <div className="table-wrapper">
                            <table className="alt dense">
                                <thead>
                                    <tr> 
                                        <th>Groupe</th>
                                        <th>Tuteur</th>
                                        <th>Date</th>
                                        <th>Statut</th>
                                        <th>Téléphone</th>
                                        <th>Mail</th>
                                        <th>Nombre d'élèves</th>
                                        <th>Nombre de séances</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {groupUsers && groupUsers.length > 0 && groupUsers.map((users) => {
                                        let tutor = users[0]
                                        return (
                                            <>
                                                <tr key={`${tutor._id}`}>
                                                    <td>{tutor.groupId}</td> 
                                                    <td>{tutor.fullname}</td>
                                                    <td>{moment(tutor.updated_at).format('DD/MM/YYYY HH:mm:ss')}</td>
                                                    <td>{tutor.statut}</td>
                                                    <td>{tutor.whatsapp}</td> 
                                                    <td>{tutor.mail}</td>
                                                    <td>{users.length - 1}</td>
                                                    <td>{tutor.seances ? tutor.seances.length : 0}</td>
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