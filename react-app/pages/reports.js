import Head from "next/head"
import { useState, useEffect } from "react"
import Layout from '../components/Layout'
import { useFetchUser } from '../lib/user'

const Reports = () => {
    const getUserData = async (user) => {
        let res = await fetch('/api/mongodb?auth0id=' + user.sub)
        let json = await res.json()
        Object.assign(user, json)
        res = await fetch('/api/mongodb?getAllReports=true')
        const value = await res.json()
        setTutors(value)
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
                    <title>Reports Page</title>
                    <meta name="description" content="Reports Page" />
                </Head>
                <section id="one">
                    <div className="inner">
                        <header className="major">
                            <h1>Elèves signalés</h1>
                        </header>

                        <div className="12u 12u(medium)">
                            <div className="table-wrapper">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Tuteur</th>
                                            <th>Elève signalé</th>
                                            <th>Date</th>
                                            <th>Détails</th>
                                            <th>Traité</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {tutors.map(tutor => {
                                            return tutor.reports ? tutor.reports.map((report, index) => (
                                                <tr key={`${tutor._id}~${index}`}>
                                                    <td>{tutor.firstname} {tutor.lastname}</td>
                                                    <td>{report.student.name}</td>
                                                    <td>{report.time}</td>
                                                    <td>{report.text}</td>
                                                    <td>
                                                        {!report.mod || !report.mod.id ?
                                                            <>
                                                                <input type="checkbox" id={`${tutor._id}~${index}`} name="demo-human" checked={false} onClick={() => handleModClick(tutor, index)} />
                                                                <label htmlFor={`${tutor._id}~${index}`}></label>
                                                            </>
                                                            : report.mod.id == user.sub ?
                                                                <>
                                                                    <input type="checkbox" id={`${tutor._id}~${index}`} name="demo-human" checked onClick={() => handleModClick(tutor, index)} />
                                                                    <label htmlFor={`${tutor._id}~${index}`}>{report.mod.name}</label>
                                                                </>
                                                                : report.mod.id !== user.sub ?
                                                                    <>
                                                                        <input type="checkbox" id={`${tutor._id}~${index}`} name="demo-human" checked />
                                                                        <label htmlFor={`${tutor._id}~${index}`}>{report.mod.name}</label>
                                                                    </>
                                                                    : null
                                                        }
                                                    </td>
                                                </tr>
                                            )) : null
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