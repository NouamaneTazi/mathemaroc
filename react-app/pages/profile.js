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
import Router from 'next/router'

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
            Router.push('/inscription')
        }
        else if (json.role == "tutor") {
            res = await fetch('/api/mongodb?groupId=' + json.groupId)
            json.students = await res.json()
            json.students = json.students.filter(student => student.role == "student")
            Object.assign(user, json);
            if (!user.students || user.students.length === 0) {
                // console.log("uu",user)
                Router.push('/catalogue')
            }
        } else if (json.role == "student") {
            Object.assign(user, json);
        }
        
        setLoading(false)
    }

    let { user, loading: userLoading } = useFetchUser()
    const [loading, setLoading] = useState(false)
    const [openReportDialog, setOpenReportDialog] = useState(false)
    const [confettis, setConfettis] = useState(false)
    
    useEffect(() => {
        // {console.log("useEffect", user, userLoading)}
        if (user && !userLoading) {
            setLoading(true)
            getUserData(user)
        } else if (!user && !userLoading) {
            Router.push('/api/login')
        }

    }, [userLoading, openReportDialog])

    const { width, height } = useWindowSize()
    return (
        <>
            {/* {console.log("user", user, userLoading)} */}
            <Backdrop className={{ zIndex: 9999, color: '#fff' }} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>

            {!userLoading && <Layout user={user} loading={userLoading}>

                <Head>
                    <title>Profil</title>
                    <meta name="description" content="Profil" />
                </Head>

                {user && user.role === "student" ? <StudentProfile user={user} />
                    : user && user.role === "tutor" ? <div id="main" className="alt">
                        {confettis && <Confetti width={width} height={height}/>}
                        <section id="one">
                            <div className="inner">
                                <header className="major">
                                    <h1>Profil</h1>
                                </header>

                                <div className="row 200%">
                                    <div className="12u 12u(medium)">
                                        {confettis && <p><b>Nouveauté : </b> On a atteint <b style={{ fontSize: "30px" }}>300</b> séances grâce à tous vos efforts ! Toute l'équipe de Math&Maroc vous remercie pour votre contribution qui encourage la solidarité entre frères marocains et qui donne une aide précieuse à un très grand nombre d'élèves ! On compte sur vous pour continuer comme ça !</p>}
                                        <h2 id="content">{user.firstname} {user.lastname}</h2>
                                        <p>Au nom de l'association Math&Maroc nous te remercions pour ton initiative, nous sommes très fiers et très content de voir qu'il y a autant de personnes prêtes à aider un grand nombre d'élèves dans le besoin. Notre but est et sera toujours d'encourager l'entraide entre marocains.
                                        <br /><br />C'est à toi de contacter les élèves par mail/whatsapp/facebook, et de discuter avec eux du format des séances (qui peuvent être des appels vidéos par Skype/Zoom ou juste de correction d'exos par Whatsapp). N'hésite pas à signaler les élèves qui ne sont pas interéssés ou qui sont injoignables et de prendre d'autres élèves puisqu'il y a plein d'autres en attente d'un tuteur. Finalement, nous te prions de nous faire des comptes rendus de chaque séance que tu fais avec tes élèves.
                                            <br /><br />Si tu rencontres un quelconque souci avec le site ou autre, nous te prions de nous contacter à l'aide de l'adresse suivante: <strong>mathemaroc.contact@gmail.com</strong> (Un screen expliquant la situation sera préférable)
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
                                                {user.students && user.students.map(student => (

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
                                                            <CustomizedTooltip title="Élève signalé" placement="left">
                                                                <Icon style={{ fontSize: 30, verticalAlign: "text-top", color: "red", cursor: "pointer" }} onClick={() => setOpenReportDialog(student)}>warning</Icon>
                                                            </CustomizedTooltip> :
                                                            <CustomizedTooltip title="Signaler doublon, élève injoignable, comportement inapproprié ou juste élève à remplacer !" placement="left">
                                                                <Icon style={{ fontSize: 30, verticalAlign: "text-top", cursor: "pointer" }} onClick={() => setOpenReportDialog(student)}>warning</Icon>
                                                            </CustomizedTooltip>}</td>
                                                        <ReportStudentDialog student={openReportDialog} setOpen={setOpenReportDialog} tutor={user} />
                                                    </tr>

                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    {!user.students || user.students.length === 0 && <p style={{ textAlign: 'center' }}>Commence par sélectionner les élèves que tu veux travailler avec en cliquant sur "Ajouter plus d'élèves" ! <br /> Il nous reste plus de 1000 élèves en attente, donc nous te prions de prendre 5 élèves au minimum !</p>}
                                    <Link href={'/catalogue'}><button className="button icon fa-plus" style={{ fontSize: "12px", marginBottom: "2em" }}>{"Ajouter plus d'élèves"}</button></Link>

                                </div>
                            </div>

                            <SeancesForm user={user} />
                            <ProfileSeancesTutors setConfettis={setConfettis}/>

                        </section>
                    </div>
                        // user not associated
                        // : user && user.needsSetup && !loading ? 
                        //     <AssociateUser user={user} />
                        // Not yet connected
                        : null
                }


            </Layout>}
        </>
    )
}

export default Profile