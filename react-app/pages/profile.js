import Head from "next/head"
import { useState, useEffect } from "react"
import Layout from '../components/Layout'
import { useFetchUser } from '../lib/user'
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import SeancesForm from '../components/SeancesForm'
import ReportStudentDialog from '../components/ReportStudentDialog'
import AssociateUser from '../components/profile/AssociateUser'
import ProfileSeancesTutors from "../components/ProfileSeancesTutors";
import Link from 'next/link'
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import StudentProfile from '../components/profile/StudentProfile'

const Profile = () => {

    const CustomizedTooltip = withStyles(theme => ({
        tooltip: {
            backgroundColor: theme.palette.common.white,
            color: '#3e467f',
            boxShadow: theme.shadows[1],
            fontSize: 16,
        },
    }))(Tooltip)

    const getUserData = async (user) => {
        let res = await fetch('/api/mongodb?auth0id=' + user.sub)
        let json = await res.json()
        // console.log("json", json)
        if (json.notYetSetUp) {
            user.needsSetup = true
        }
        else if (json.role == "tutor") {
            res = await fetch('/api/mongodb?groupId=' + json.groupId)
            json.students = await res.json()
            json.students = json.students.filter(student => student.role == "student")
            Object.assign(user, json);
            user.isSetup = true
        } else if (json.role == "student") {
            Object.assign(user, json);
        }
        setLoading(false)
    }

    let { user, loading: userLoading } = useFetchUser()
    const [loading, setLoading] = useState(false)
    const [openReportDialog, setOpenReportDialog] = useState(false)

    useEffect(() => {
        // {console.log("useEffect", user, userLoading)}
        if (user && !userLoading) {
            setLoading(true)
            getUserData(user)
        }
    }, [user, userLoading])

    const { width, height } = useWindowSize()
    return (
        <>
            <Backdrop className={{ zIndex: 9999, color: '#fff' }} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            {!userLoading && <Layout user={user} loading={userLoading}>
                {/* {console.log("user", user)} */}
                <Head>
                    <title>Profil</title>
                    <meta name="description" content="Profil" />
                </Head>

                {user && user.role === "student" ? <StudentProfile user={user}/>
                    : user && user.isSetup ? <div id="main" className="alt">
                        {/* <Confetti width={width} height={height}/> */}
                        <section id="one">
                            <div className="inner">
                                <header className="major">
                                    <h1>Profil</h1>
                                </header>

                                <div className="row 200%">
                                    <div className="12u 12u(medium)">
                                        {/* <p><b>Nouveauté : </b> On a atteint <b style={{ fontSize: "30px" }}>100</b> séances grâce à tous vos efforts ! Toute l'équipe de Math&Maroc vous remercie pour votre contribution qui encourage la solidarité entre frères marocains et qui donne une aide précieuse à un très grand nombre d'élèves ! On compte sur vous pour continuer comme ça !</p> */}
                                        <p><b>Nouveauté : </b> Pour ceux qui veulent avoir plus d'élèves, vous pouvez à présent choisir vous mêmes les élèves dans le catalogue à élèves en cliquant sur le bouton "Demander plus d'élèves" !</p>
                                        <h2 id="content">{user.firstname} {user.lastname}</h2>
                                        <p>Au nom de l'association Math&Maroc nous te remercions pour ton initiative, nous sommes très fiers et très content de voir qu'il y a autant de personnes prêtes à aider un grand nombre d'élèves dans le besoin. Notre but est et sera toujours d'encourager l'entraide entre marocains.
                                    <br /><br />Dans le but de suivre les tuteurs et les élèves et de s'assurer que tout se passe bien, nous te prions de <strong><u>nous faire un compte rendu rapide de chaque séance à l'aide du tableau en dessous des informations des élèves.</u></strong>
                                            <br /><br />Si tu rencontres un quelconque souci avec le site ou autre, nous te prions de nous contacter à l'aide de l'adresse suivante: mathemaroc.contact@gmail.com (Un screen expliquant la situation sera préférable)
</p>

                                    </div>
                                </div>
                                <div className="12u 12u(medium)">
                                    <h2>Liste des élèves</h2>
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
                                                    <th>Signaler</th>
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
                                                        <td style={{ textAlign: "center" }}> {student.reported ?
                                                            <CustomizedTooltip title="Elève signalé" placement="left">
                                                                <Icon style={{ fontSize: 30, verticalAlign: "text-top", color: "red", cursor: "pointer" }} onClick={() => setOpenReportDialog(student)}>warning</Icon>
                                                            </CustomizedTooltip> :
                                                            <CustomizedTooltip title="Signaler doublon, élève injoignable ou comportement inapproprié" placement="left">
                                                                <Icon style={{ fontSize: 30, verticalAlign: "text-top", cursor: "pointer" }} onClick={() => setOpenReportDialog(student)}>warning</Icon>
                                                            </CustomizedTooltip>}</td>
                                                        <ReportStudentDialog student={openReportDialog} setOpen={setOpenReportDialog} tutor={user} />
                                                    </tr>

                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    {user.students.length === 0 && <p style={{ textAlign: 'center' }}>Commence par sélectionner les élèves que tu veux travailler avec en cliquant sur "Demander plus d'élèves" !</p>}
                                    <Link href={'/catalogue'}><button className="button icon fa-plus" style={{ fontSize: "12px", marginBottom: "2em" }}>{"Demander plus d'élèves"}</button></Link>

                                </div>

                                <SeancesForm user={user} />
                                <ProfileSeancesTutors />

                            </div>
                        </section>
                    </div>
                        // user not associated
                        : user && user.needsSetup ? <AssociateUser user={user} />
                            // Not yet connected
                            : !loading ? <div id="main" className="alt">
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