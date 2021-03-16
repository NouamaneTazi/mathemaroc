import Head from "next/head"   
import { useState, useEffect } from "react"  
import Layout from '../components/Layout'
import { useFetchUser } from '../lib/user' 
import SearchAndReplaceStudent2 from '../components/SearchAndReplaceStudent2'   
  
const Reports = () => { 
    const getUserData = async (user) => {  
        let res = await fetch('/api/mongodb?auth0id=' + user.sub)
        let json = await res.json() 
        Object.assign(user, json)  
        res = await fetch('/api/mongodb?getAllReportsFromStudents=true') 
        const new_students = await res.json()
 
        res = await fetch('/api/mongodb?getAwaitingStudents=true')
        const awaitingStudents = await res.json()

        setStudents(new_students) 
        setAwaitingStudents(awaitingStudents) 
    } 
 
    let { user, loading } = useFetchUser()
    const [students, setStudents] = useState([])
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
                    <title>Reports Page</title>
                    <meta name="description" content="Reports Page" />  
                </Head>
                <section id="one">
                    <div className="inner"> 
                        <header className="major"> 
                            {user ? <h1>Élèves signalés ({students.length})</h1> : <h1>Vous n'êtes pas connectés</h1>} 
                        </header> 
  
                        <div className="12u 12u(medium)"> 
                            <div className="table-wrapper">
                                <table>
                                    <thead> 
                                        <tr>
                                            <th>Groupe</th> 
                                            <th>Tuteur</th>  
                                            <th>Élève signalé</th>  
                                            <th>Détails</th>
                                            <th>Élève remplaçant</th> 
                                        </tr>
                                    </thead>
                                    <tbody>  

                                        {students.map(student => (  
                                            <tr key={`${student._id}`}> 
                                                <td>{student.groupId}</td> 
                                                <td>{student.report.tutor.name}</td>
                                                <td>{student.fullname}</td>
                                                <td>{student.report.text}</td> 
                                                <td><SearchAndReplaceStudent2 reportedStudent={student} groupId={student.groupId} awaitingStudents={awaitingStudents} /></td>
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