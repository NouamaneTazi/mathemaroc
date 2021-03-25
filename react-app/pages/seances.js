import Head from "next/head"
import { useState, useEffect } from "react"
import Layout from '../components/Layout'
import { useFetchUser } from '../lib/user'  
import SeancesLineChart from '../components/SeancesLineChart' 
import Icon from '@material-ui/core/Icon'; 
import Rating from 'react-rating'  
import moment from 'moment'  

const Admin = () => {
    const getUserData = async (user) => {
        let res = await fetch('/api/mongodb?auth0id=' + user.sub)
        let json = await res.json()
        Object.assign(user, json)
        res = await fetch('/api/mongodb?getAllSeances=true')
        const value = await res.json() 
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
                    <title>Admin Page</title>
                    <meta name="description" content="Admin Page" />
                </Head>
                <section id="one">
                    <div className="inner"> 
                        <header className="major">
                            {user ? <h1>Séances données</h1> : <h1>Vous n'êtes pas connectés</h1>} 
                        </header>
 
                        <SeancesLineChart tutors={tutors} />
                        {tutors.length > 0 && 
                            <div className="12u 12u(medium)">
                                <h3>Compteur de séances données :</h3>
                                <div className="box" style={{ textAlign: "center" }}> 
                                    <h1>{getNumberSeances(tutors)}</h1>
                                </div> 
 
                            </div>
                        } 
                    </div>
                    <div className="inner" style={{ maxWidth: "95%", width: "100%" }}>

                        <div className="table-wrapper">
                            <table className="alt dense">
                                <thead>
                                    <tr>
                                        <th>Tuteur</th>
                                        <th>Mis à jour</th>
                                        <th>Date</th>
                                        <th>Durée</th>
                                        <th>Chapitres traités</th>
                                        <th>Élèves absents</th> 
                                        <th>Remarques</th>
                                        <th>Ressenti</th> 
                                        <th>Traité</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tutors.sort((b,a)=> moment(a.last_updated) - moment(b.last_updated)).map(tutor => {
                                        return ( 
                                            <>
                                                {tutor.seances && tutor.seances.map((seance, index) => (
                                                    <tr key={`${tutor._id}~${index}`}> 
                                                        {index == 0 && <th rowSpan={tutor.seances.length} style={{ verticalAlign: "middle" }}>{tutor.firstname} {tutor.lastname}</th>}
                                                        {index == 0 && <th rowSpan={tutor.seances.length} style={{ verticalAlign: "middle" }}>{moment(tutor.last_updated).format('DD/MM/YYYY HH:mm:ss')}</th>}
                                                        <td>{seance.date}</td>
                                                        <td>{seance.duree}</td>
                                                        <td>{seance.chapitres}</td>  
                                                        <td>{Object.values(seance.absents).join(', ')}</td>
                                                        <td>{seance.remarques}</td>
                                                        <td style={{ width: 180, paddingLeft: 0, paddingRight: 0 }}>
                                                            <Rating
                                                                readonly
                                                                initialRating={seance.rating} 
                                                                emptySymbol={['sentiment_very_dissatisfied', 'sentiment_dissatisfied', 'sentiment_satisfied', 'sentiment_satisfied_alt', 'sentiment_very_satisfied'].map(x => <Icon style={{ fontSize: 30, verticalAlign: "text-top", color: "white" }}>{x}</Icon>)}
                                                                fullSymbol={['sentiment_very_dissatisfied', 'sentiment_dissatisfied', 'sentiment_satisfied', 'sentiment_satisfied_alt', 'sentiment_very_satisfied'].map(x => <Icon style={{ fontSize: 30, verticalAlign: "text-top", color: "#2ea1d9" }}>{x}</Icon>)} 
                                                            />  
                                                        </td>
                                                        <td style={{ verticalAlign: "middle" }}>
                                                            {!seance.mod || !seance.mod.id ?
                                                                <> 
                                                                    <input type="checkbox" id={`${tutor._id}~${index}`} name="demo-human" checked={false} onClick={() => handleModClick(tutor, index)} />
                                                                    <label htmlFor={`${tutor._id}~${index}`}></label> 
                                                                </>
                                                                : seance.mod.id == user.sub ?
                                                                    <> 
                                                                        <input type="checkbox" id={`${tutor._id}~${index}`} name="demo-human" checked onClick={() => handleModClick(tutor, index)} /> 
                                                                        <label htmlFor={`${tutor._id}~${index}`}>{seance.mod.name}</label>
                                                                    </> 
                                                                    : seance.mod.id !== user.sub ?
                                                                        <>
                                                                            <input type="checkbox" id={`${tutor._id}~${index}`} name="demo-human" checked />
                                                                            <label htmlFor={`${tutor._id}~${index}`}>{seance.mod.name}</label>
                                                                        </>
                                                                        : null
                                                            }
                                                        </td>
                                                    </tr>
                                                ))}
                                                {tutor.seances.length > 0 && <tr style={{ height: "50px" }}></tr>}
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