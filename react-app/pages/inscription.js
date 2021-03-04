import Head from "next/head"
import { useState, useEffect } from "react" 
import Layout from '../components/Layout'
import { useFetchUser } from '../lib/user'  
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop'; 
import CircularProgress from '@material-ui/core/CircularProgress'; 
import Router from 'next/router';
import isEmail from 'validator/lib/isEmail';
import trim from 'validator/lib/trim';
import normalizeEmail from 'validator/lib/normalizeEmail';

const Signup = () => {
    const CustomizedTooltip = withStyles(theme => ({
        tooltip: {
            backgroundColor: theme.palette.common.white,
            color: '#3e467f',
            boxShadow: theme.shadows[1],
            fontSize: 16,
        },
    }))(Tooltip)
 
    const capitalize = s => s.substr(0, 1).toUpperCase() + s.substr(1).toLowerCase();  
 
    const handleMatieresSelect = (val) => {
        if (inputFields.matieres.includes(val)) {
            setInputFields({ ...inputFields, matieres: inputFields.matieres.filter(mat => mat !== val) })
        } 
        else if (inputFields.matieres.length < 3) {
            setInputFields({ ...inputFields, matieres: inputFields.matieres.concat([val]) })
        } else {
            let inputs = inputFields
            inputs.matieres.shift() 
            inputs.matieres.push(val)
            setInputFields(inputs)
            setRefresh(!refresh) 
        } 
    }
 
    const handleSubmit = async () => {
        const requiredFields = role === "tutor" ? ['firstname', 'lastname', 'statut', 'mail'] : ['firstname', 'lastname', 'mail', 'lycee', 'ville', 'niveau', 'filiere', 'matieres', 'wishes']
        if (requiredFields.every(x => (x in inputFields && inputFields[x] !== ''))) { 
            if (!isEmail(inputFields.mail + '')) { 
                setError({ mail: true }) 
            } else { 
                setLoading(true)
                if (role === "student") { 
                    inputFields.matiere = inputFields.matieres.join(', ') 
                } 
                delete inputFields.matieres
                Object.entries(inputFields).map(([k, v]) => inputFields[k] = trim(v))
                inputFields.firstname = capitalize(inputFields.firstname)
                inputFields.lastname = capitalize(inputFields.lastname)
                inputFields.fullname = inputFields.firstname + " " + inputFields.lastname 
                inputFields.mail = normalizeEmail(inputFields.mail)
                Object.assign(user, inputFields)
                user.role = role 
                user.auth0id = user.sub
                await fetch('/api/mongodb?insert=true', { 
                    method: 'post',
                    body: JSON.stringify({ data: user })
                })
                Router.push('/profile') 
                // console.log("res",user)
            }
        }
        else {
            let errors = {}
            requiredFields.map(x => (x in inputFields && inputFields[x] !== '') ? null : errors[x] = true)
            setError({ ...errors }) 
            setShowError(true) 
        }
        // console.log("error", error)
    }

    const getUserData = async (user) => {
        let res = await fetch('/api/mongodb?auth0id=' + user.sub)
        let json = await res.json()
        // console.log("json", json)
        if (json.role) {
            Router.push('/profile') 
        }
        setLoading(false) 
    }

    let { user, loading: userLoading } = useFetchUser()
    const [inputFields, setInputFields] = useState({ matieres: [] });
    const [loading, setLoading] = useState(false)
    const [showError, setShowError] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [error, setError] = useState({}) 
    const [role, setRole] = useState() 
 
    useEffect(() => { 
        // {console.log("useEffect", user, userLoading)}
        if (user && !userLoading) {
            setLoading(true)
            getUserData(user)
        } else if (!userLoading && !user) {
            Router.push('/profile')
        }
    }, [user, userLoading]) 
    return ( 
        <>
            <Backdrop className={{ zIndex: 9999, color: '#fff' }} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            {!userLoading && <Layout user={user} loading={userLoading}>
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
                                            <p style={{ fontWeight: 600, fontSize: "3em", marginBottom: 0 }}>Élève</p>  
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
                                            <span style={{ width: "16em", fontSize: 'large', fontWeight: 600 }}>Prénom (*) :</span>
                                            <input className={error.firstname ? "invalid" : null} type="text" value={inputFields.firstname} onChange={e => setInputFields({ ...inputFields, firstname: capitalize(e.target.value) })} placeholder="Prénom" />
                                        </div> 
                                        <div className="row" style={{ display: 'flex', alignItems: 'center', marginBottom: '1em' }}>
                                            <span style={{ width: "16em", fontSize: 'large', fontWeight: 600 }}>Nom (*) :</span> 
                                            <input className={error.lastname ? "invalid" : null} type="text" value={inputFields.lastname} onChange={e => setInputFields({ ...inputFields, lastname: capitalize(e.target.value) })} placeholder="Nom" />
                                        </div>
                                        <div className="row" style={{ display: 'flex', alignItems: 'center', marginBottom: '1em' }}> 
                                            <span style={{ width: "16em", fontSize: 'large', fontWeight: 600 }}>Statut (*) :</span>
                                            <input className={error.statut ? "invalid" : null} type="text" value={inputFields.statut} onChange={e => setInputFields({ ...inputFields, statut: e.target.value })} placeholder="Etudiant en master / université / prof..." />
                                        </div>
                                        <div className="row" style={{ display: 'flex', alignItems: 'center', marginBottom: '1em' }}>
                                            <span style={{ width: "16em", fontSize: 'large', fontWeight: 600 }}>Téléphone :</span>
                                            <input className={error.whatsapp ? "invalid" : null} type="tel" value={inputFields.whatsapp} onChange={e => setInputFields({ ...inputFields, whatsapp: e.target.value })} placeholder="+212611223344" />
                                        </div>
                                        <div className="row" style={{ display: 'flex', alignItems: 'center', marginBottom: '1em' }}>
                                            <span style={{ width: "16em", fontSize: 'large', fontWeight: 600 }}>Adresse e-mail (*) :</span>
                                            <input className={error.mail ? "invalid" : null} type="email" value={inputFields.mail} onChange={e => setInputFields({ ...inputFields, mail: e.target.value })} placeholder="E-mail que vous consultez régulièrement..." /> 
                                        </div> 
                                        {showError && <span style={{ textAlign: 'center', display: 'block  ' }}>Tous les champs marqués en (*) doivent être remplis !</span>}
                                        <button style={{ margin: 'auto', marginTop: "3em", display: 'block' }} className="button special" onClick={() => handleSubmit()}>Confirmer</button>
                                    </div>
                                </> 
                                : role == "student" ? 
                                    <>
                                        <div className="6u 12u(medium)" style={{ margin: 'auto' }}>
                                            <div className="6u" style={{ textAlign: 'center', margin: 'auto' }}>
                                                <i style={{ fontSize: "5em" }} class="fas fa-book-reader"></i>
                                                <p style={{ fontWeight: 600, fontSize: "2em", marginBottom: "1em" }}>Élève</p>
                                            </div>
                                            <div className="row" style={{ display: 'flex', alignItems: 'center', marginBottom: '1em' }}> 
                                                <span style={{ width: "20em", fontSize: 'large', fontWeight: 600 }}>Prénom (*) :</span>
                                                <input className={error.firstname ? "invalid" : null} type="text" value={inputFields.firstname} onChange={e => setInputFields({ ...inputFields, firstname:capitalize(e.target.value) })} placeholder="Prénom" /> 
                                            </div>
                                            <div className="row" style={{ display: 'flex', alignItems: 'center', marginBottom: '1em' }}>
                                                <span style={{ width: "20em", fontSize: 'large', fontWeight: 600 }}>Nom (*) :</span>
                                                <input className={error.lastname ? "invalid" : null} type="text" value={inputFields.lastname} onChange={e => setInputFields({ ...inputFields, lastname: capitalize(e.target.value)})} placeholder="Nom" /> 
                                            </div> 
                                            <div className="row" style={{ display: 'flex', alignItems: 'center', marginBottom: '1em' }}>
                                                <span style={{ width: "20em", fontSize: 'large', fontWeight: 600 }}>Numéro Whatsapp :</span>
                                                <input className={error.whatsapp ? "invalid" : null} type="tel" value={inputFields.whatsapp} onChange={e => setInputFields({ ...inputFields, whatsapp: e.target.value })} placeholder="+212611223344" />
                                            </div>
                                            <div className="row" style={{ display: 'flex', alignItems: 'center', marginBottom: '1em' }}> 
                                                <span style={{ width: "20em", fontSize: 'large', fontWeight: 600 }}>Facebook :</span>
                                                <input className={error.facebook ? "invalid" : null} type="tel" value={inputFields.facebook} onChange={e => setInputFields({ ...inputFields, facebook: e.target.value })} placeholder="Nom sur Facebook" />
                                            </div>
                                            <div className="row" style={{ display: 'flex', alignItems: 'center', marginBottom: '1em' }}>
                                                <span style={{ width: "20em", fontSize: 'large', fontWeight: 600 }}>Adresse e-mail (*) :</span>  
                                                <input className={error.mail ? "invalid" : null} type="email" value={inputFields.mail} onChange={e => setInputFields({ ...inputFields, mail: e.target.value })} placeholder="E-mail que vous consultez régulièrement..." />
                                            </div>
                                            <div className="row" style={{ display: 'flex', alignItems: 'center', marginBottom: '1em' }}> 
                                                <span style={{ width: "20em", fontSize: 'large', fontWeight: 600 }}>Nom du lycée (*) :</span> 
                                                <input className={error.lycee ? "invalid" : null} type="text" value={inputFields.lycee} onChange={e => setInputFields({ ...inputFields, lycee: e.target.value })} placeholder="Nom de votre lycée" />
                                            </div>
                                            <div className="row" style={{ display: 'flex', alignItems: 'center', marginBottom: '1em' }}> 
                                                <span style={{ width: "20em", fontSize: 'large', fontWeight: 600 }}>Ville du lycée (*) :</span>
                                                <input className={error.ville ? "invalid" : null} type="text" value={inputFields.ville} onChange={e => setInputFields({ ...inputFields, ville: e.target.value })} placeholder="Ville de votre lycée" /> 
                                            </div> 
                                            <div className="row" style={{ display: 'flex', alignItems: 'center', marginBottom: '1em' }}>
                                                <span style={{ width: "20em", fontSize: 'large', fontWeight: 600 }}>Niveau scolaire (*) :</span>
                                                <div style={{ width: "100%", display: 'flex', justifyContent: 'space-evenly', paddingLeft: 0 }}>
                                                    {/* <input type="radio" id="premiere-bac" checked={inputFields.niveau === 'bac-1'} onClick={() => setInputFields({ ...inputFields, niveau: 'bac-1' })} />
                                                    <label style={{ margin: 0 }} htmlFor="premiere-bac">1ère bac</label> */} 

                                                    <input type="radio" id="deuxieme-bac" checked={inputFields.niveau === 'bac'} onClick={() => setInputFields({ ...inputFields, niveau: 'bac' })} /> 
                                                    <label style={{ margin: 0 }} htmlFor="deuxieme-bac">2ème bac</label> 
                                                </div>
                                            </div>

                                            <div className="row" style={{ display: 'flex', alignItems: 'center', marginBottom: '1em' }}>
                                                <span style={{ width: "20em", fontSize: 'large', fontWeight: 600 }}>Filière (*) :</span>
                                                <div className="select-wrapper" style={{ width: '100%', paddingLeft: 0 }}>
                                                    <select onChange={e => setInputFields({ ...inputFields, filiere: e.target.value })}> 
                                                        <option value="">Sélectionnez votre filière</option>
                                                        <option value="SCIENCES MATHÉMATIQUES A">SCIENCES MATHÉMATIQUES A</option>
                                                        <option value="SCIENCES MATHÉMATIQUES B">SCIENCES MATHÉMATIQUES B</option>
                                                        <option value="SCIENCES PHYSIQUES">SCIENCES PHYSIQUES</option>
                                                        <option value="SCIENCES DE LA VIE ET DE LA TERRE">SCIENCES DE LA VIE ET DE LA TERRE</option>
                                                        <option value="ECONOMIE">ECONOMIE</option>
                                                        <option value="SCIENCES TECH">SCIENCES TECH</option>
                                                        <option value="LITTERATURE - SCIENCES HUMAINES">LITTERATURE - SCIENCES HUMAINES</option>
                                                        <option value="Bac Pro">BAC PRO</option>
                                                    </select> 
                                                </div> 
                                            </div>
                                            <div className="row" style={{ display: 'flex', marginBottom: '1em' }}>  
                                                <span style={{ width: "20em", fontSize: 'large', fontWeight: 600 }}>Matières (*) :</span>
                                                <div style={{ display: 'flex', flexDirection: 'column' }}> 
                                                    {['MATHÉMATIQUES', 'PHYSIQUE-CHIMIE', 'SVT', 'SI', 'ARABE', 'FRANÇAIS', 'ANGLAIS', 'PHILOSOPHIE', 'EDUCATION ISLAMIQUE', 'HISTOIRE GÉOGRAPHIE', 'COMPTABILITÉ', 'ECONOMIE GÉNÉRALE', 'ORGANISATION ADMINISTRATIVE DES ENTREPRISES'] 
                                                        .map(matiere => (
                                                            <>
                                                                <input type="checkbox" id={matiere} checked={inputFields.matieres && inputFields.matieres.includes(matiere)} onClick={(e) => handleMatieresSelect(e.target.id)} />
                                                                <label htmlFor={matiere}>{matiere}</label>
                                                            </>
                                                        ))}
                                                </div>
                                            </div> 

                                            <div className="row" style={{ display: 'flex', alignItems: 'center', marginBottom: '1em' }}>
                                                <span style={{ width: "20em", fontSize: 'large', fontWeight: 600 }}>Chapitres (*) :</span>
                                                <div style={{ width: "100%", padding: 0 }}>
                                                    <textarea className={error.wishes ? "invalid" : null} value={inputFields.wishes} onChange={e => setInputFields({ ...inputFields, wishes: e.target.value })} placeholder="Spécifiez les chapitres pour lesquels vous avez besoin d'aide" rows="6" />
                                                </div>
                                            </div> 
                                            {showError && <span style={{ textAlign: 'center', display: 'block  ' }}>Tous les champs marqués en (*) doivent être remplis !</span>}
                                            <button style={{ margin: 'auto', marginTop: "3em", display: 'block' }} className="button special" onClick={() => handleSubmit()}>Confirmer</button>
                                        </div> 
                                    </> : null
                        } 
                    </div>
                </section>
            </Layout>} 
        </>
    )
}

export default Signup