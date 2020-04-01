import Head from "next/head"
import { useState, useEffect } from "react"
import Layout from '../components/Layout'
import { useFetchUser } from '../lib/user'
import SeancesLineChart from '../components/SeancesLineChart'
import MenuAdmin from '../components/MenuAdmin'

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
                                        <th>Tuteur</th>
                                        <th>Date</th>
                                        <th>Elève pris</th>
                                        {/* <th>Traité</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {tutors.map((tutor) => {
                                        return (
                                            <>
                                                {tutor.catalogue_logs.length > 0 && tutor.catalogue_logs.map((activity, index_activity) => {
                                                    return activity.students.map((student, index_student) => (
                                                        <tr key={`${tutor._id}~${student._id}`}>
                                                            {(index_activity == 0 && index_student == 0) && <th rowSpan={tutor.catalogue_logs.reduce((s, acti) => s + acti.students.length, 0)} style={{ verticalAlign: "middle" }}>{tutor.fullname}</th>}
                                                            {index_student == 0 && <td rowSpan={activity.students.length} style={{ verticalAlign: "middle" }}>{activity.time}</td>}
                                                            <td>{student.name}</td>
                                                            {/* <td style={{ verticalAlign: "middle" }}>
                                                                {!seance.mod || !seance.mod.id ?
                                                                    <>
                                                                        <input type="checkbox" id={`${tutor._id}~${index_student}`} name="demo-human" checked={false} onClick={() => handleModClick(tutor, index_student)} />
                                                                        <label htmlFor={`${tutor._id}~${index_student}`}></label>
                                                                    </>
                                                                    : seance.mod.id == user.sub ?
                                                                        <>
                                                                            <input type="checkbox" id={`${tutor._id}~${index_student}`} name="demo-human" checked onClick={() => handleModClick(tutor, index_student)} />
                                                                            <label htmlFor={`${tutor._id}~${index_student}`}>{seance.mod.name}</label>
                                                                        </>
                                                                        : seance.mod.id !== user.sub ?
                                                                            <>
                                                                                <input type="checkbox" id={`${tutor._id}~${index_student}`} name="demo-human" checked />
                                                                                <label htmlFor={`${tutor._id}~${index_student}`}>{seance.mod.name}</label>
                                                                            </>
                                                                            : null
                                                                }
                                                            </td> */}
                                                        </tr>
                                                    ))
                                                })}
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