import Head from "next/head"
import { useState, useEffect } from "react"
import Layout from '../components/Layout'
import { useFetchUser } from '../lib/user'
import SearchInput, { createFilter } from 'react-search-input'
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import Seances from '../components/Seances'
import ReportStudentDialog from '../components/ReportStudentDialog'

const Profile = () => {
    const getUserData = async (user) => {
        let res = await fetch('/api/mongodb?auth0id=' + user.sub)
        let json = await res.json()
        // console.log("json", json)
        if (json.notYetSetUp) {
            let res = await fetch('/api/mongodb?role=tutor') // find all tutors
            const json = await res.json()
            // console.log("tutors", json)
            user.needsSetup = true
            setTutors(json)
        }
        else if (json.role == "tutor") {
            res = await fetch('/api/mongodb?groupId=' + json.groupId)
            json.students = await res.json()
            json.students = json.students.filter(student => student.role == "student")
            Object.assign(user, json);
            user.isSetup = true
            setRefresh(!refresh)
        }
    }

    const associateTutor = async (tutor) => {
        Object.assign(user, tutor);
        delete user.needsSetup
        user.auth0id = user.sub
        delete user.sub
        delete user._id
        const res = await fetch('/api/mongodb', {
            method: 'post',
            body: JSON.stringify({ _id: tutor._id, data: user })
        })
        window.location.reload(false);
    }

    let { user, loading } = useFetchUser()
    const [tutors, setTutors] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [refresh, setRefresh] = useState(true)
    const [queryReady, setQueryReady] = useState(false)
    const [openReportDialog, setOpenReportDialog] = useState(false)

    useEffect(() => {
        // {console.log("useEffect", user, loading)}
        if (user && !loading) {
            getUserData(user)
        }
        setQueryReady(true)
    }, [user, loading])

    let selectedTutor = ""
    const filteredTutors = tutors.filter(createFilter(searchTerm, ['firstname', 'lastname']))
    const CustomizedTooltip = withStyles(theme => ({
        tooltip: {
            backgroundColor: theme.palette.common.white,
            color: '#3e467f',
            boxShadow: theme.shadows[1],
            fontSize: 16,
        },
    }))(Tooltip)


    return (
        <>
            {!loading && <Layout user={user} loading={loading}>
                {/* {console.log("user", user)} */}
                <Head>
                    <title>Profil</title>
                    <meta name="description" content="Profil" />
                </Head>

                {user && user.isSetup ? <div id="main" className="alt">
                    <section id="one">
                        <div className="inner">
                            <header className="major">
                                <h1>Profil</h1>
                            </header>

                            <div className="row 200%">
                                <div className="12u 12u(medium)">
                                    <h2 id="content">{user.firstname} {user.lastname}</h2>
                                    <p>Au nom de l'association Math&Maroc nous te remercions pour ton initiative, nous sommes très fiers et très content de voir qu'il y a autant de personnes prêtes à aider un grand nombre d'élèves dans le besoin. Notre but est et sera toujours d'encourager l'entraide entre marocains.
                                    <br /><br />Dans le but de suivre les tuteurs et les élèves et de s'assurer que tout se passe bien, nous te prions de <strong><u>nous faire un compte rendu rapide de chaque séance à l'aide du tableau en dessous des information des élèves.</u></strong>
                                        <br /><br />Si tu as rencontré un quelconque souci avec le site ou autre, nous te prions de nous contacter à l'aide de l'adresse suivante: mathemaroc.contact@gmail.com (Un screen expliquant la situation sera préférable)
</p>

                                </div>
                            </div>
                            <div className="12u 12u(medium)">
                                <h4>Liste des élèves</h4>
                                <div className="table-wrapper">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Nom</th>
                                                <th>Lycée</th>
                                                <th>Ville</th>
                                                <th>Filière</th>
                                                <th>Matières</th>
                                                <th>Demandes</th>
                                                <th>Whatsapp</th>
                                                <th>Facebook</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {user.students.map(student => (

                                                    <tr key={student._id} onMouseEnter={() => null}>
                                                        <td>{student.firstname} {student.lastname}</td>
                                                        <td>{student.lycee}</td>
                                                        <td>{student.ville}</td>
                                                        <td>{student.filiere}</td>
                                                        <td>{student.matiere}</td>
                                                        <td>{student.wishes}</td>
                                                        <td>{student.whatsapp}</td>
                                                        <td>{student.facebook}</td>
                                                        <td> {student.reported ?
                                                        <CustomizedTooltip title="Elève signalé" placement="left">
                                                        <Icon style={{ fontSize: 30, verticalAlign: "text-top", color:"red", cursor:"pointer" }} onClick={() => setOpenReportDialog(student)}>warning</Icon>
                                                    </CustomizedTooltip>:
                                                            <CustomizedTooltip title="Signaler élève injoignable ou comportement inapproprié" placement="left">
                                                            <Icon style={{ fontSize: 30, verticalAlign: "text-top", cursor:"pointer"  }} onClick={() => setOpenReportDialog(student)}>warning</Icon>
                                                        </CustomizedTooltip>}</td>
                                                        <ReportStudentDialog student={openReportDialog} setOpen={setOpenReportDialog} tutor={user}/>
                                                    </tr>

                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <Seances user={user} />

                        </div>
                    </section>
                </div>
                    // user not associated
                    : user && user.needsSetup ? <div id="main" className="alt">
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
                                            {/* {tutors.map(tutor => (
                                                <div className="4u 12u(small)" key={tutor._id}>
                                                    <input type="radio" id={`${tutor.firstname}-${tutor.lastname}`} name="demo-priority" onChange={() => { selectedTutor = tutor }} />
                                                    <label htmlFor={`${tutor.firstname}-${tutor.lastname}`}>{tutor.lastname} {tutor.firstname}</label>
                                                </div>
                                            ))} */}
                                            <SearchInput className="search-input" placeholder="Tapez votre nom..." onChange={(term) => { setSearchTerm(term) }} />
                                            <br />
                                            {tutors.length !== filteredTutors.length ? filteredTutors.map(tutor => (
                                                <div className="12u 12u(small)" key={tutor._id}>
                                                    <input type="radio" id={`${tutor.firstname}-${tutor.lastname}`} name="demo-priority" onChange={() => { selectedTutor = tutor }} />
                                                    <label htmlFor={`${tutor.firstname}-${tutor.lastname}`}>{tutor.lastname} {tutor.firstname}</label>
                                                </div>
                                            )) : null}
                                        </ul>
                                        <div className="12u">
                                            <ul className="actions">
                                                <div className="button special" onClick={() => selectedTutor ? associateTutor(selectedTutor) : null}>Submit</div>
                                                <CustomizedTooltip placement="right" title="On a pas encore terminé l'attribution de tous les élèves. Veuillez revenir plus tard !">
                                                    <div style={{ display: "inline", marginLeft: "10px" }}>Je ne trouve pas mon nom !</div>
                                                </CustomizedTooltip>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </section>
                    </div>
                        // Not yet connected
                        : queryReady ? <div id="main" className="alt">
                            <section id="one">
                                <div className="inner">
                                    <header className="major">
                                        <h1>Profil</h1>
                                    </header>
                                    <a href="/api/login" className="button special">Se connecter</a>
                                </div>
                            </section>
                        </div>
                            : null
                }


            </Layout>}
        </>
    )
}

export default Profile