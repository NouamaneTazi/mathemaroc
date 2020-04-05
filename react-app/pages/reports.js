import Head from "next/head"
import { useState, useEffect } from "react"
import Layout from '../components/Layout'
import { useFetchUser } from '../lib/user'
import SearchAwaitingStudents from '../components/SearchAwaitingStudents'
import UndoReplacedStudent from '../components/UndoReplacedStudent'
import MenuAdmin from '../components/MenuAdmin'

const Reports = () => {
    const getUserData = async (user) => {
        let res = await fetch('/api/mongodb?auth0id=' + user.sub)
        let json = await res.json()
        Object.assign(user, json)
        res = await fetch('/api/mongodb?getAllReports=true')
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
            {/* {console.log(user)} */}
            {!loading && <Layout user={user} loading={loading}>
                <Head>
                    <title>Reports Page</title>
                    <meta name="description" content="Reports Page" />
                </Head>
                <MenuAdmin user={user}/>
                <section id="one">
                    <div className="inner" style={{maxWidth:"90%", width:"100%"}}>
                        <header className="major">
                            {user ? <h1>Élèves signalés</h1> : <h1>Vous n'êtes pas connectés</h1>}
                        </header>

                        <p>Demandes en attente : {tutors.reduce((s, tutor) => s + tutor.reports.filter(report => !("mod" in report)).length, 0)} <br />
                        Demandes traités : {tutors.reduce((s, tutor) => s + tutor.reports.filter(report => "mod" in report).length, 0)}</p>
                        <div className="12u 12u(medium)">
                            <div className="table-wrapper">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Groupe</th>
                                            <th>Tuteur</th>
                                            <th>Élève signalé</th>
                                            <th>Date</th>
                                            <th>Détails</th>
                                            <th>Traité</th>
                                            <th>Élève remplaçant</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {tutors.map(tutor => {
                                            return tutor.reports ? tutor.reports.map((report, report_index) => (
                                                <tr key={`${tutor._id}~${report_index}`}>
                                                    {report_index===0 && <td rowSpan={tutor.reports.length} style={{verticalAlign:"middle"}}>{tutor.groupId}</td>}
                                                    {report_index===0 && <td rowSpan={tutor.reports.length} style={{verticalAlign:"middle"}}>{tutor.firstname} {tutor.lastname}</td>}
                                                    <td>{report.student.name}</td>
                                                    <td>{report.time}</td>
                                                    <td>{report.text}</td>
                                                    <td >
                                                        {!report.mod || !report.mod.id ?
                                                            <>
                                                                <input type="checkbox" id={`${tutor._id}~${report_index}`} name="demo-human" checked={false} onClick={() => handleModClick(tutor, report_index)} />
                                                                <label style={{ verticalAlign: "text-top" }} htmlFor={`${tutor._id}~${report_index}`}></label>
                                                            </>
                                                            : report.mod.id == user.sub && !("replaced_by" in report) ?
                                                                <>
                                                                    <input type="checkbox" id={`${tutor._id}~${report_index}`} name="demo-human" checked onClick={() => handleModClick(tutor, report_index)} />
                                                                    <label style={{ verticalAlign: "text-top" }} htmlFor={`${tutor._id}~${report_index}`}>{report.mod.name}</label>
                                                                </>
                                                                : report.mod.id !== user.sub || (report.mod.id == user.sub && ("replaced_by" in report))?
                                                                    <>
                                                                        <input type="checkbox" id={`${tutor._id}~${report_index}`} name="demo-human" checked />
                                                                        <label style={{ verticalAlign: "text-top" }} htmlFor={`${tutor._id}~${report_index}`}>{report.mod.name}</label>
                                                                    </>
                                                                    : null
                                                        }
                                                    </td>
                                                    <td>{("replaced_by" in report) && (!report.mod || report.mod.id != user.sub) ? report.replaced_by.name
                                                        : ("replaced_by" in report) && report.mod.id == user.sub ? <>
                                                            {report.replaced_by.name} <div className="button special" onClick={() => setReplacingStudent(report.replaced_by)}>Undo</div>
                                                            <UndoReplacedStudent replacingStudent={replacingStudent} setReplacingStudent={setReplacingStudent} tutor={tutor} report={report}/>
                                                        </>
                                                            : <SearchAwaitingStudents reportedStudent={report.student} tutor={tutor} report={report} groupId={tutor.groupId} awaitingStudents={awaitingStudents} toggleTraiteCase={() => handleModClick(tutor, report_index)} />
                                                    }</td>
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