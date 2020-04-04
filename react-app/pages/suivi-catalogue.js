import Head from "next/head"
import { useState, useEffect } from "react"
import Layout from '../components/Layout'
import { useFetchUser } from '../lib/user'
import SeancesLineChart from '../components/SeancesLineChart'
import MenuAdmin from '../components/MenuAdmin'
import moment from "moment"

const Admin = () => {
    const getUserData = async (user) => {
        let res = await fetch('/api/mongodb?auth0id=' + user.sub)
        let json = await res.json()
        Object.assign(user, json)
        res = await fetch('/api/mongodb?getCatalogueLogs=true')
        const value = await res.json()
        console.log(value)
        setTutors(value)
    }

    const getNumberSeances = tutors => {
        let seances = tutors.map(tutor => tutor.seances).filter(seance => seance !== undefined && seance.length > 0)
        // console.log("seances",seances)
        return seances.reduce((acc, seance) => acc + seance.length, 0)
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
    const [tutors, setTutors] = useState([])
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
                <MenuAdmin user={user} />
                <section id="one">
                    <div className="inner">
                        <header className="major">
                            {user ? <h1>Suivi du catalogue</h1> : <h1>Vous n'êtes pas connectés</h1>}
                        </header>

                        {/* {tutors.length > 0 &&
                            <div className="12u 12u(medium)">
                                <h3>Compteur de séances données :</h3>
                                <div className="box" style={{ textAlign: "center" }}>
                                    <h1>{getNumberSeances(tutors)}</h1>
                                </div>

                            </div>
                        } */}
                    </div>
                    <div className="inner" >

                        <div className="table-wrapper">
                            <table className="alt">
                                <thead>
                                    <tr>
                                        <th>Groupe</th>
                                        <th>Tuteur</th>
                                        <th>Date</th>
                                        <th>Elève pris</th>
                                        <th>Nombre d'élèves</th>
                                        {/* <th>Traité</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {tutors.map((tutor) => {
                                        return (
                                            <>
                                                {tutor.catalogue_logs.length > 0 && tutor.catalogue_logs.map((activity, index_activity) => (
                                                    <tr key={`${tutor._id}~${index_activity}`}>
                                                        {(index_activity == 0) && <th rowSpan={tutor.catalogue_logs.length} style={{ verticalAlign: "middle" }}>{tutor.groupId}</th>}
                                                        {(index_activity == 0) && <th rowSpan={tutor.catalogue_logs.length} style={{ verticalAlign: "middle" }}>{tutor.fullname}</th>}
                                                        <td style={{ verticalAlign: "middle" }}>{activity.time}</td>
                                                        <td>{activity.students.map(s=>s.name).join(" - ")}</td>
                                                        <td>{activity.students.length}</td>
                                                    </tr>
                                                ))}
                                                {tutor.catalogue_logs.length > 0 && <tr style={{ height: "50px" }}></tr>}
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