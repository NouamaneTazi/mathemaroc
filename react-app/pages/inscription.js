import Head from "next/head"
import { useState, useEffect } from "react"
import Layout from '../components/Layout'
import { useFetchUser } from '../lib/user'
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Router from 'next/router';

const Signup = () => {
    const CustomizedTooltip = withStyles(theme => ({
        tooltip: {
            backgroundColor: theme.palette.common.white,
            color: '#3e467f',
            boxShadow: theme.shadows[1],
            fontSize: 16,
        },
    }))(Tooltip)
    
    const handleSubmit = () => {
        if (Object.keys(inputFields).length==5 && Object.values(inputFields).every(x => (x && x !== ''))){
            console.log("yes")
        }
        else {
            setShowError(true)
        }
    }

    const getUserData = async (user) => {
        let res = await fetch('/api/mongodb?auth0id=' + user.sub)
        let json = await res.json()
        // console.log("json", json)
        if (json.role == "tutor") {
            Router.push('/profile')
        }
        setLoading(false)
    }

    let { user, loading: userLoading } = useFetchUser()
    const [inputFields, setInputFields] = useState({whatsapp:"(+212)06"});
    const [loading, setLoading] = useState(false)
    const [showError, setShowError] = useState(false)
    const [role, setRole] = useState("tutor")

    useEffect(() => {
        // {console.log("useEffect", user, userLoading)}
        if (user && !userLoading) {
            setLoading(true)
            getUserData(user)
        }
    }, [user, userLoading])

    return (
        <>
            <Backdrop className={{ zIndex: 9999, color: '#fff' }} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            {!userLoading && <Layout user={user} loading={userLoading}>
                {console.log("inputs", inputFields)}
                <Head>
                    <title>Incription</title>
                    <meta name="description" content="Incription" />
                </Head>

                <section id="one">
                    <div className="inner">
                        <header className="major">
                            <h1>Inscription</h1>
                        </header>
                        {!role ?
                            <>
                                <h2 style={{ textAlign: 'center' }}>Vous êtes :</h2>
                                <div className="row">
                                    <div className="6u" style={{ textAlign: 'center' }}>
                                        <a style={{ borderBottom: "none", cursor: "pointer" }} onClick={() => setRole("tutor")}><span>
                                            <i style={{ fontSize: "9em" }} class="fas fa-chalkboard-teacher"></i>
                                            <p style={{ fontWeight: 600, fontSize: "3em", marginBottom: 0 }}>Tuteur</p>
                                        </span></a>
                                    </div>
                                    <div className="6u" style={{ textAlign: 'center' }}>
                                        <a style={{ borderBottom: "none", cursor: "pointer" }} onClick={() => setRole("student")}><span>
                                            <i style={{ fontSize: "9em" }} class="fas fa-book-reader"></i>
                                            <p style={{ fontWeight: 600, fontSize: "3em", marginBottom: 0 }}>Elève</p>
                                        </span></a>
                                    </div>
                                </div>
                            </>
                            : role == "tutor" ?
                                <>
                                    <div className="6u 12u(medium)" style={{ margin: 'auto' }}>
                                        <div className="6u" style={{ textAlign: 'center', margin: 'auto' }}>
                                            <i style={{ fontSize: "5em" }} class="fas fa-chalkboard-teacher"></i>
                                            <p style={{ fontWeight: 600, fontSize: "2em", marginBottom: "1em" }}>Tuteur</p>
                                        </div>
                                        <div className="row" style={{ display: 'flex', alignItems: 'center', marginBottom: '1em' }}>
                                            <span style={{ width: "16em", fontSize: 'large', fontWeight: 600 }}>Prénom :</span>
                                            <input type="text" value={inputFields.firstname} onChange={e => setInputFields({...inputFields, firstname:e.target.value})} placeholder="Prénom" />
                                        </div>
                                        <div className="row" style={{ display: 'flex', alignItems: 'center', marginBottom: '1em' }}>
                                            <span style={{ width: "16em", fontSize: 'large', fontWeight: 600 }}>Nom :</span>
                                            <input type="text" value={inputFields.name} onChange={e => setInputFields({...inputFields, name:e.target.value})} placeholder="Nom" />
                                        </div>
                                        <div className="row" style={{ display: 'flex', alignItems: 'center', marginBottom: '1em' }}>
                                            <span style={{ width: "16em", fontSize: 'large', fontWeight: 600 }}>Statut :</span>
                                            <input type="text" value={inputFields.statut} onChange={e => setInputFields({...inputFields, statut:e.target.value})} placeholder="Etudiant en master / université / prof..." />
                                        </div>
                                        <div className="row" style={{ display: 'flex', alignItems: 'center', marginBottom: '1em' }}>
                                            <span style={{ width: "16em", fontSize: 'large', fontWeight: 600 }}>Téléphone :</span>
                                            <input type="tel" value={inputFields.whatsapp} onChange={e => setInputFields({...inputFields, whatsapp:e.target.value})} placeholder="Numéro de téléphone" />
                                        </div>
                                        <div className="row" style={{ display: 'flex', alignItems: 'center', marginBottom: '1em' }}>
                                            <span style={{ width: "16em", fontSize: 'large', fontWeight: 600 }}>Adresse e-mail :</span>
                                            <input type="email" value={inputFields.mail} onChange={e => setInputFields({...inputFields, mail:e.target.value})} placeholder="E-mail que vous consultez régulièrement..." />
                                        </div>
                                        {showError && <span style={{textAlign:'center', display:'block  '}}>Tous les champs doivent être remplis !</span>}
                                        <button style={{ margin: 'auto', marginTop: "3em", display: 'block' }} className="button special" onClick={()=>handleSubmit()}>Confirmer</button>
                                    </div>
                                </>
                                :
                                <>
                                </>
                        }
                    </div>
                </section>
            </Layout>}
        </>
    )
}

export default Signup