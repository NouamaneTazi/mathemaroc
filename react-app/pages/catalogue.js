import Head from "next/head"
import { useState, useEffect } from "react"
import Layout from '../components/Layout'
import { useFetchUser } from '../lib/user'
import moment from 'moment'
import Icon from '@material-ui/core/Icon';
import Divider from '@material-ui/core/Divider';
import SearchInput, { createFilter } from 'react-search-input'
import Router from 'next/router'
import Link from 'next/link'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const Reports = () => { 
    const getUserData = async (user) => {
        let res = await fetch('/api/mongodb?auth0id=' + user.sub)
        let json = await res.json()
        Object.assign(user, json)
    }

    const getAwaitingStudentsData = async () => {
        console.log("GET DATA")
        let res = await fetch('/api/mongodb?getAwaitingStudents=true&limit=true') //TODO: Add limits
        const awaitingStudents = await res.json()
        setAwaitingStudents(awaitingStudents)
        setLoading(false)
    }

    const handleSelectStudent = (student) => {
        let value = selectedStudents
        value.push(student)
        setSelectedStudents([...value])
    }

    const handleSubmit = async () => {
        for (let student of selectedStudents) {
            await fetch('/api/mongodb', {
                method: 'post',
                body: JSON.stringify({ _id: student._id, data: { "groupId": user.groupId } })
            })
        }
        let catalogue_logs = user.catalogue_logs ? user.catalogue_logs : []
        catalogue_logs.push({
            time: new Date(Date.now()).toLocaleString("en-US"),
            students: selectedStudents.map(student => ({ _id: student._id, name: student.fullname }))
        })
        await fetch('/api/mongodb', {
            method: 'post',
            body: JSON.stringify({
                _id: user._id,
                data: { "catalogue_logs": catalogue_logs }
            })
        })
        Router.push('/profile')
    }

    let { user, loading: userLoading } = useFetchUser()
    const [loading, setLoading] = useState(false)
    const [awaitingStudents, setAwaitingStudents] = useState([])
    const [filiereTerm, setFiliereTerm] = useState("")
    const [matiereTerm, setMatiereTerm] = useState("")
    const [wishesTerm, setWishesTerm] = useState("")
    const filteredFiliereStudents = awaitingStudents.filter(createFilter(filiereTerm, ['filiere']))
    const filteredMatiereStudents = filteredFiliereStudents.filter(createFilter(matiereTerm, ['matiere']))
    const filteredWishesStudents = filteredMatiereStudents.filter(createFilter(wishesTerm, ['wishes']))
    const [selectedStudents, setSelectedStudents] = useState([])
    const [maxRows, setMaxRows] = useState(10)

    useEffect(() => {
        // { console.log("useEffect", user, userLoading) }
        if (user && !userLoading) {
            setLoading(true)
            getUserData(user)
            getAwaitingStudentsData()
        }
        else if (!userLoading && !user) {
            Router.push('/profile')
        }
    }, [user, userLoading])


    useEffect(() => {
        // {console.log("useEffect", user, userLoading)}
        const timer = setTimeout(() => {
            if (!userLoading && user) {
                getAwaitingStudentsData()
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [maxRows, selectedStudents, filiereTerm, matiereTerm, wishesTerm])

    return (
        <>
            <Backdrop className={{ zIndex: 9999, color: '#fff' }} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            {/* {console.log(user)} */} 
            {!userLoading && <Layout user={user} loading={userLoading}>
                <Head>
                    <title>Catalogue à élèves</title>
                    <meta name="description" content="Catalogue des élèves" />
                </Head>

                <section id="one">
                    <div className="inner">
                        <Link href="/profile">
                            <a style={{ borderBottom: "none" }}><div style={{ display: "inline", marginRight: " 0.5em" }} className="icon fa-chevron-left"></div><span style={{ fontSize: "20px" }}>Profil</span></a>
                        </Link>
                        <header className="major">
                            <h1>Catalogue des élèves</h1>
                        </header>
                        <p>Vous pouvez prendre autant d'élèves que vous voulez mais à seule condition, que vous vous engagez à les enseigner ! Et pour nous permettre à assurer le suivi de tous les élèves, nous vous prions de remplir les séances que vous donnez sur votre profil.</p>
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
                                            <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Selectionné</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedStudents.map(student => (
                                            <tr key={`${student._id}`}>
                                                <td>{moment(student.timestamp).format('DD/MM/YYYY HH:mm:ss')}</td>
                                                <td>{student.filiere}</td>
                                                <td>{student.matiere}</td>
                                                <td>{student.wishes}</td>
                                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{selectedStudents.includes(student) ?
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


                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Date de demande</th>
                                        <th>Filière
                                            <div className="select-wrapper" >
                                                <select style={{ backgroundColor: "#434b84" }} onChange={(e) => setFiliereTerm(e.target.value)}>
                                                    <option value="">- Filière -</option>
                                                    <option value="SCIENCES MATHÉMATIQUES A">SMaths A</option>
                                                    <option value="SCIENCES MATHÉMATIQUES B">SMaths B</option>
                                                    <option value="SCIENCES PHYSIQUES">Sc Physiques</option>
                                                    <option value="SCIENCES DE LA VIE ET DE LA TERRE">SVT</option>
                                                    <option value="ECONOMIE">Economie</option>
                                                    <option value="STE">STE</option>
                                                    <option value="Bac Pro">Bac Pro</option>
                                                </select>
                                            </div>
                                        </th>
                                        <th>Matières<SearchInput className="search-input" placeholder="Filtrer par matière..." onChange={(term) => { setMatiereTerm(term) }} /></th>
                                        <th>Demandes<SearchInput className="search-input" placeholder="Filtrer par chapitres..." onChange={(term) => { setWishesTerm(term) }} /></th>
                                        <th>Selectionné</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredWishesStudents.slice(0, maxRows).map(student => (
                                        <tr key={`${student._id}`}>
                                            <td>{moment(student.timestamp).format('DD/MM/YYYY HH:mm:ss')}</td>
                                            <td>{student.filiere}</td>
                                            <td style={{ width: "50%" }}>{student.matiere}</td>
                                            <td style={{ width: "40%" }}>{student.wishes}</td>
                                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{selectedStudents.filter(s => s._id === student._id).length > 0 ?
                                                <Icon style={{ fontSize: 30, verticalAlign: "text-top", color: "white", cursor: "pointer" }} onClick={() => setSelectedStudents(selectedStudents.filter(s => s._id != student._id))}>check_box</Icon>
                                                : <Icon style={{ fontSize: 30, verticalAlign: "text-top", color: "white", cursor: "pointer" }} onClick={() => handleSelectStudent(student)}>check_box_outline_blank</Icon>
                                            }</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <p style={{ textAlign: "center", cursor: "pointer" }} onClick={() => setMaxRows(maxRows + 10)}><b>Voir plus...</b></p>
                        </div>
                    </div>
                </section>
            </Layout>
            }
        </>
    )
}

export default Reports