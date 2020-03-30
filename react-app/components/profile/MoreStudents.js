import { useState, useEffect, StrictMode } from "react"
import moment from 'moment'
import Icon from '@material-ui/core/Icon';

const MoreSeances = ({ user }) => {
    const handleAskedMoreStudents = async () => {
        
        const res = await fetch('/api/mongodb', {
            method: 'post',
            body: JSON.stringify({ _id: user._id, data: { asked_more_students: true } })
        })
        setAskedMoreStudents(true)
    }
    
    const cancelAskedMoreStudents = async () => {
        delete user.asked_more_students
        const res = await fetch('/api/mongodb?unset=true', {
            method: 'post',
            body: JSON.stringify({ _id: user._id, data: { asked_more_students: "" } })
        })
        setAskedMoreStudents(false)
    }

    const [askedMoreStudents, setAskedMoreStudents] = useState(user.asked_more_students)

    return (
        <>
            {askedMoreStudents ? <>
            <p style={{display:"inline"}}>Vous avez demandé plus d'élèves.          </p>
            <button className="button special" style={{ fontSize: "11px", marginBottom:"2em"}} onClick={() => cancelAskedMoreStudents()}>Annuler la demande</button>
            </>
        : <button className="button" style={{ fontSize: "12px", marginBottom:"2em"}} onClick={() => handleAskedMoreStudents()}>{"Demander plus d'élèves"}</button>
            }
        </>
    )
}

export default MoreSeances