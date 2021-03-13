import { useState, useEffect, Fragment } from "react"
import moment from 'moment'

const ProfileSeancesTutors = ({setConfettis}) => {
    const [tutors, setTutors] = useState([])
    const [counts, setCounts] = useState({supportedStudents:'', students:''}) 
    const [maxRows, setMaxRows] = useState(10) 
    const getSeances = async () => {
        const res = await fetch('/api/mongodb?getAllSeances=true') 
        const value = await res.json()  
        setTutors(value)
    }
    const getNumberSeances = tutors => {
        const seances = tutors.map(tutor => tutor.seances).filter(seance => seance !== undefined && seance.length > 0) 
        // console.log("seances",seances)
        const nb_seances = seances.reduce((acc, seance) => acc + seance.length, 0) 
        if (nb_seances >= 500) setConfettis(true)
        return nb_seances  
    }
    const getNumberStudents = async () => { 
        const res = await fetch('/api/mongodb?count=students')
        const counts = await res.json()
        setCounts(counts) 
    }
 
    useEffect(() => {  
        getSeances() 
        getNumberStudents()  
    }, []) 

    return (  
        <div className="inner">
            <h2>Tu n'es pas seul !</h2>  
            <p>Voici toute une communauté qui travaille aussi pour aider une génération à étinceler. S’entre aider c’est réussir ensemble.<br /> Ensemble on va plus loin, on crée un vrai impact.</p>
            <div className='row'>
                <div className="6u 12u$(small)">    
                    <h3>Compteur de séances données :</h3>
                    <div className="box" style={{ textAlign: "center" }}> 
                        <h1>{getNumberSeances(tutors)}</h1>
                    </div>
                </div>
                <div className="6u 12u$(small)">
                    <h3>Compteur d'élèves pris en charge :</h3>   
                    <div className="box" style={{ textAlign: "center" }}>
                        <h1>{counts.supportedStudents} / {counts.students}</h1> 
                    </div> 
                </div> 
            </div> 
            <div className="table-wrapper">
                <table className="alt dense"> 
                    <thead>
                        <tr>
                            <th>Tuteur</th> 
                            <th>Mis à jour</th>
                            <th>Date</th> 
                            <th>Durée</th>
                            <th>Chapitres traités</th>
                        </tr>
                    </thead> 
                    <tbody>  
                        {tutors.sort((b,a)=> moment(a.last_updated) - moment(b.last_updated)).slice(0, maxRows).map(tutor => {  
                            return (  
                                <Fragment key={`${tutor._id}`}>
                                    {tutor.seances && tutor.seances.map((seance, index) => ( 
                                        <tr key={`${tutor._id}~${index}`}>  
                                            {index == 0 && <td rowSpan={tutor.seances.length} style={{ verticalAlign: "middle" }}><b>{tutor.firstname} {tutor.lastname}</b></td>}
                                            {index == 0 && <td rowSpan={tutor.seances.length} style={{ verticalAlign: "middle" }}><b>{moment(tutor.last_updated).format('DD/MM/YYYY HH:mm:ss')}</b></td>} 
                                            <td>{moment(seance.date).format('DD/MM/YYYY')}</td>
                                            <td>{seance.duree}</td>  
                                            <td>{seance.chapitres}</td>
                                        </tr> 
                                    ))}  
                                    {tutor.seances.length > 0 && <tr style={{ height: "50px" }}></tr>}
                                </Fragment>
                            )
                        })}
                    </tbody>
                </table>
                <p style={{ textAlign: "center", cursor: "pointer" }} onClick={() => setMaxRows(maxRows + 10)}><b>Voir plus...</b></p>  
            </div> 
   
        </div>  
    ) 
}
 
export default ProfileSeancesTutors