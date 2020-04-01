import Head from "next/head"
import { useState, useEffect } from "react"
import Layout from '../components/Layout'
import { useFetchUser } from '../lib/user'
import moment from 'moment'
import Icon from '@material-ui/core/Icon';
import Divider from '@material-ui/core/Divider';
import SearchInput, { createFilter } from 'react-search-input'
import Router from 'next/router'

const Reports = () => {
    const getUserData = async (user) => {
        let res = await fetch('/api/mongodb?auth0id=' + user.sub)
        let json = await res.json()
        Object.assign(user, json)
    }

    const getAwaitingStudentsData = async () => {
        console.log("GET DATA")
        let res = await fetch('/api/mongodb?getAwaitingStudents=true&limit=true')
        const awaitingStudents = await res.json()
        setAwaitingStudents(awaitingStudents)
    }

    const handleSubmit = async () => {
        for (let student of selectedStudents) {
            await fetch('/api/mongodb', {
                method: 'post',
                body: JSON.stringify({ _id: student._id, data: {"groupId": user.groupId} })
            })
        }
        Router.push('/profile')
    }

    let { user, loading } = useFetchUser()
    const [awaitingStudents, setAwaitingStudents] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const filteredAwaitingStudents = awaitingStudents.filter(createFilter(searchTerm, ['filiere', 'matiere', 'wishes']))
    const [selectedStudents, setSelectedStudents] = useState([])
    const [maxRows, setMaxRows] = useState(10)

    useEffect(() => {
        // {console.log("useEffect", user, loading)}
        if (user && !loading) {
            getUserData(user)
            getAwaitingStudentsData()
        }
    }, [user, loading])

    
    useEffect(() => {
        // {console.log("useEffect", user, loading)}
        const timer = setTimeout(() => {
            if (!loading && user){
                getAwaitingStudentsData()
            }
          }, 1000);
        
        return () => clearTimeout(timer);
    }, [maxRows, selectedStudents, searchTerm])

    const handleSelectStudent = (student) => {
        let value = selectedStudents
        value.push(student)
        setSelectedStudents([...value])
    }

    
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
                        <p>Vous pouvez prendre autant d'élèves que vous voulez mais à seule condition, que vous vous engagez à les enseigner ! Et pour nous permettre à assurer le suivi de tous les élèves, nous vous prions de nous remplir les séances que vous donnez sur votre profil.</p>
                    </div>

                    {selectedStudents.length > 0 && <>
                        <div style={{ maxWidth: "95%", width: "100%", margin: "auto" }}>
                            <div className="table-wrapper">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Date de demande</th>
                                            <th>Filière</th>
                                            <th>Matières</th>
                                            <th>Demandes</th>
                                            <th style={{textAlign:'center', verticalAlign:'middle'}}>Selectionné</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedStudents.map(student => (
                                            <tr key={`${student._id}`}>
                                                <td>{moment(student.timestamp).format('DD/MM/YYYY HH:mm:ss')}</td>
                                                <td>{student.filiere}</td>
                                                <td>{student.matiere}</td>
                                                <td>{student.wishes}</td>
                                                <td style={{textAlign:'center', verticalAlign:'middle'}}>{selectedStudents.includes(student) ?
                                                    <Icon style={{ fontSize: 30, verticalAlign: "text-top", color: "white", cursor: "pointer" }} onClick={() => setSelectedStudents(selectedStudents.filter(s => s._id != student._id))}>check_box</Icon>
                                                    : <Icon style={{ fontSize: 30, verticalAlign: "text-top", color: "white", cursor: "pointer" }} onClick={() => handleSelectStudent(student)}>check_box_outline_blank</Icon>
                                                }</td>
                                            </tr>
                                        ))

                                        }
                                    </tbody>
                                </table>
                            </div>
                            <p style={{ marginBottom: '1em', textAlign: 'center' }}><b>Voulez vous prendre en charge ces élèves ?</b></p>
                            <button className="button special medium" style={{ margin: 'auto', display: 'block' }} onClick={() => handleSubmit()}>Oui !</button>
                        </div>
                        <Divider style={{ marginBottom: "3em" }} />
                    </>}

                    <div style={{ maxWidth: "95%", width: "100%", margin: "auto" }}>

                        <SearchInput className="search-input" style={{ marginBottom: "2em" }} placeholder="Filtrer par filière, matière ou chapitres..." onChange={(term) => { setSearchTerm(term) }} />

                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Date de demande</th>
                                        <th>Filière</th>
                                        <th>Matières</th>
                                        <th>Demandes</th>
                                        <th>Selectionné</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredAwaitingStudents.slice(0, maxRows).map(student => (
                                        <tr key={`${student._id}`}>
                                            <td>{moment(student.timestamp).format('DD/MM/YYYY HH:mm:ss')}</td>
                                            <td>{student.filiere}</td>
                                            <td style={{width:"50%"}}>{student.matiere}</td>
                                            <td style={{width:"40%"}}>{student.wishes}</td>
                                            <td style={{textAlign:'center', verticalAlign:'middle'}}>{selectedStudents.filter(s=> s._id=== student._id).length>0 ?
                                                <Icon style={{ fontSize: 30, verticalAlign: "text-top", color: "white", cursor: "pointer" }} onClick={() => setSelectedStudents(selectedStudents.filter(s => s._id != student._id))}>check_box</Icon>
                                                : <Icon style={{ fontSize: 30, verticalAlign: "text-top", color: "white", cursor: "pointer" }} onClick={() => handleSelectStudent(student)}>check_box_outline_blank</Icon>
                                            }</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <p style={{textAlign:"center", cursor:"pointer"}} onClick={()=>setMaxRows(maxRows+10)}><b>Voir plus...</b></p>
                        </div>

                    </div>
                </section>
            </Layout>
            }
        </>
    )
}

export default Reports