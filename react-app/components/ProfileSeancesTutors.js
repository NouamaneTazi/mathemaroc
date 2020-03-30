import { useState, useEffect, Fragment } from "react"

const ProfileSeancesTutors = () => {
    const [tutors, setTutors] = useState([])
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
            <h3 style={{ marginTop: "2em" }}>Tu n'es pas seul !</h3>
            <p>Voici toute une communauté qui travaille aussi pour aider une génération à étinceler. S’entre aider c’est réussir ensemble.<br/> Ensemble on va plus loin, on crée un vrai impact.</p>
            <h3>Compteur de séances données :</h3>
            <div className="box" style={{ textAlign: "center" }}>
                <h1>{getNumberSeances(tutors)}</h1>
            </div>
            <div className="table-wrapper">
                <table className="alt">
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
                        {tutors.map(tutor => {
                            return (
                                <Fragment key={`${tutor._id}`}>
                                    {tutor.seances && tutor.seances.map((seance, index) => (
                                        <tr key={`${tutor._id}~${index}`}>
                                            {index == 0 && <th rowSpan={tutor.seances.length} style={{ verticalAlign: "middle" }}>{tutor.firstname} {tutor.lastname}</th>}
                                            {index == 0 && <th rowSpan={tutor.seances.length} style={{ verticalAlign: "middle" }}>{tutor.last_updated}</th>}
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
            </div>

        </div>
    )
}

export default ProfileSeancesTutors