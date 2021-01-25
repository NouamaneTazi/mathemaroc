import SearchInput, { createFilter } from 'react-search-input' 
import { useState, useEffect } from "react"
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Link from 'next/link'

const AssociateUser = ({ user }) => { 
    const getTutorsSuggestions = async () => {
        let res = await fetch('/api/mongodb?role=tutor') // find all tutors
        const json = await res.json()
        // console.log("tutors", json)
        setTutors(json)
    }
    const associateTutor = async (tutor) => {
        Object.assign(user, tutor);
        user.auth0id = user.sub
        const res = await fetch('/api/mongodb', {
            method: 'post',
            body: JSON.stringify({ _id: tutor._id, data: user })
        })
        window.location.reload(false);
    }

    const [searchTerm, setSearchTerm] = useState("")
    let selectedTutor = ""
    const [tutors, setTutors] = useState([])
    const filteredTutors = tutors.filter(createFilter(searchTerm, ['firstname', 'lastname'])) 
    const CustomizedTooltip = withStyles(theme => ({
        tooltip: {
            backgroundColor: theme.palette.common.white,
            color: '#3e467f',
            boxShadow: theme.shadows[1],
            fontSize: 16,
        },
    }))(Tooltip)

    useEffect(() => {
        getTutorsSuggestions()
    },[])

    return (<div id="main" className="alt">
        <section id="one"> 
            <div className="inner">
                <header className="major">
                    <h1>Profil</h1>
                </header>

                <div className="row 200%">
                    <div className="12u 12u(medium)">
                        <h2 id="content">Mettez à jour votre profil</h2>
                        <h4>Selectionnez votre nom :</h4> 
                        <ul className="actions">
                            <SearchInput className="search-input" placeholder="Tapez votre nom..." onChange={(term) => { setSearchTerm(term) }} />
                            <br />
                            {tutors.length !== filteredTutors.length ? filteredTutors.slice(0,50).map(tutor => (
                                <div className="12u 12u(small)" key={tutor._id}>
                                    <input type="radio" id={`${tutor.firstname}-${tutor.lastname}`} name="demo-priority" onChange={() => { selectedTutor = tutor }} />
                                    <label htmlFor={`${tutor.firstname}-${tutor.lastname}`}>{tutor.lastname} {tutor.firstname}</label>
                                </div>
                            )) : null}
                        </ul>
                        <div className="12u"> 
                            <ul className="actions">
                                <div className="button special" onClick={() => selectedTutor ? associateTutor(selectedTutor) : null}>Submit</div> 
                                    <div style={{ display: "inline", marginLeft: "10px" }}>Si tu as rempli notre formulaire de tuteurs, tu devrais pouvoir retrouver ton nom. Sinon <Link href='/inscription'><a><span>inscris-toi</span></a></Link> !</div>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    </div>
    )
}

export default AssociateUser