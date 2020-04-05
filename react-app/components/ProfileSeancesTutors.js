import { useState, useEffect, Fragment } from "react"

const ProfileSeancesTutors = () => {
    const [tutors, setTutors] = useState([])
    const [maxRows, setMaxRows] = useState(10)
    const getSeances = async () => {
        const res = await fetch('/api/mongodb?getAllSeances=true')
        const value = await res.json()
        setTutors(value)
    }
    const getNumberSeances = tutors => {
        let seances = tutors.map(tutor => tutor.seances).filter(seance => seance !== undefined && seance.length > 0)
        // console.log("seances",seances)
        return seances.reduce((acc, seance) => acc + seance.length, 0)
    }

    useEffect(() => {
        getSeances()
    }, [])

    return (
        <div className="12u">
            <h2 style={{ marginTop: "2em" }}>Tu n'es pas seul !</h2>
            <p>Voici toute une communauté qui travaille aussi pour aider une génération à étinceler. S’entre aider c’est réussir ensemble.<br/> Ensemble on va plus loin, on crée un vrai impact.</p>
            <h3>Compteur de séances données :</h3>
            <div className="box" style={{ textAlign: "center" }}>
                <h1>{getNumberSeances(tutors)}</h1>
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
                        {tutors.slice(0, maxRows).map(tutor => {
                            return (
                                <Fragment key={`${tutor._id}`}>
                                    {tutor.seances && tutor.seances.map((seance, index) => (
                                        <tr key={`${tutor._id}~${index}`}>
                                            {index == 0 && <td rowSpan={tutor.seances.length} style={{ verticalAlign: "middle" }}><b>{tutor.firstname} {tutor.lastname}</b></td>}
                                            {index == 0 && <td rowSpan={tutor.seances.length} style={{ verticalAlign: "middle" }}><b>{tutor.last_updated}</b></td>}
                                            <td>{seance.date}</td>
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