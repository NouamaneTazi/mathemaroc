import Head from "next/head" 
import { useState, useEffect } from "react"
import Layout from '../components/Layout'  
import { useFetchUser } from '../lib/user'
import moment from 'moment' 
import Icon from '@material-ui/core/Icon'; 
import Divider from '@material-ui/core/Divider';   
import SearchInput, { createFilter } from 'react-search-input'   
import Router from 'next/router'     
import Link from 'next/link'  
import Backdrop from '@material-ui/core/Backdrop'; 
import CircularProgress from '@material-ui/core/CircularProgress'; 
import Button from '@material-ui/core/Button';  
import Dialog from '@material-ui/core/Dialog';  
import MuiDialogContent from '@material-ui/core/DialogContent';   
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';

const Reports = () => { 
    const getUserData = async (user) => {  
        let res = await fetch('/api/mongodb?auth0id=' + user.sub)    
        let json = await res.json()
        Object.assign(user, json)  
        if (!user.students || user.students.length === 0) {   
            setUserHasNoStudents(true)  
        }  
        // console.log("u",user) 
    }
 
    const getAwaitingStudentsData = async () => {
        let res = await fetch('/api/mongodb?getAwaitingStudents=true&limit=true') //TODO: Add limits    
        const awaitingStudents = await res.json()  
        setAwaitingStudents(awaitingStudents) 
        setLoading(false)
    }   
  
    const handleSelectStudent = (student) => {    
        let value = selectedStudents 
        value.push(student)
        setSelectedStudents([...value])
    }
 
    const handleSubmit = async () => {
        if ((user.students && user.students.length + selectedStudents.length > 20) || (selectedStudents.length > 20)) {  
            setError({ message: 'Si vous voulez prendre plus que 20 élèves, veuillez nous contacter sur mathemaroc.contact@gmail.com' }) 
        }   
        else {
            for (let student of selectedStudents) { 
                await fetch('/api/mongodb', { 
                    method: 'post', 
                    body: JSON.stringify({ _id: student._id, data: { "groupId": user.groupId } }) 
                })
            }  
            let catalogue_logs = user.catalogue_logs ? user.catalogue_logs : [] 
            catalogue_logs.push({  
                time: new Date(Date.now()).toLocaleString("en-US"), 
                students: selectedStudents.map(student => ({ _id: student._id, name: student.fullname })) 
            })
            await fetch('/api/mongodb', { 
                method: 'post',  
                body: JSON.stringify({
                    _id: user._id,  
                    data: { "catalogue_logs": catalogue_logs }  
                })
            })  
            Router.push('/profile')   
        }
        setLoading(false) 
    } 
  
    let { user, loading: userLoading } = useFetchUser()  
    const [loading, setLoading] = useState(false) 
    const [error, setError] = useState()  
    const [awaitingStudents, setAwaitingStudents] = useState([])   
    const [filiereTerm, setFiliereTerm] = useState("")   
    const [matiereTerm, setMatiereTerm] = useState("") 
    const [wishesTerm, setWishesTerm] = useState("")  
    const filteredFiliereStudents = awaitingStudents.filter(createFilter(filiereTerm, ['filiere']))  
    const filteredMatiereStudents = filteredFiliereStudents.filter(createFilter(matiereTerm, ['matiere']))
    const filteredWishesStudents = filteredMatiereStudents.filter(createFilter(wishesTerm, ['wishes'])) 
    const [selectedStudents, setSelectedStudents] = useState([])  
    const [maxRows, setMaxRows] = useState(10) 
    const [userHasNoStudents, setUserHasNoStudents] = useState(false)   
  
    useEffect(() => { 
        // { console.log("useEffect", user, userLoading) }     
        if (user && !userLoading) { 
            setLoading(true)
            getUserData(user)   
            getAwaitingStudentsData()  
        } 
        else if (!userLoading && !user) {   
            Router.push('/profile')   
        } 
    }, [user, userLoading]) 
 
  
    useEffect(() => { 
        // {console.log("useEffect", user, userLoading)}
        const timer = setTimeout(() => {
            if (!userLoading && user) {
                getAwaitingStudentsData() 
            }   
        }, 1000);  
 
        return () => clearTimeout(timer); 
    }, [maxRows, selectedStudents, filiereTerm, matiereTerm, wishesTerm]) 
   
    return (  
        <>   
            <Backdrop className={{ zIndex: 9999, color: '#fff' }} open={loading}> 
                <CircularProgress color="inherit" /> 
            </Backdrop>  
            {!loading && user && <Layout user={user} loading={userLoading}> 
                <Head>
                    <title>Catalogue à élèves</title>   
                    <meta name="description" content="Catalogue des élèves" />  
                </Head> 
 
                <Dialog aria-labelledby="customized-dialog-title" open={userHasNoStudents} fullWidth>  
                    <MuiDialogContent dividers> 
                        <Typography variant="h5" color="primary" align="center"> 
                            Bienvenue {user.fullname} ! 
                        </Typography>
                        <Typography align="left">  
                            <br />  
                            <ul>
                                <li>
                                    Commence par sélectionner un groupe homogène d'élèves que tu veux travailler avec ! </li>  
                                <li>Ça sera à toi de choisir le format des séances que tu veux faire avec les élèves choisis. Cela pourrait être des appels par Skype / Whatsapp / Zoom, ou juste des exos corrigés sur Whatsapp !</li>   
                                <li>Il nous reste plus de 500 élèves en attente, donc nous te prions de prendre 5 élèves au minimum ! </li> 
                            </ul>
                        </Typography>
 
                    </MuiDialogContent>  
 
                    <Button autoFocus onClick={() => setUserHasNoStudents(false)} color="primary"> 
                        Fermer
                        </Button>  
                </Dialog>
   

                <section id="one"> 
                    <div className="inner"> 
                        {(user.students && user.students.length !== 0) && 
                            <div style={{ marginBottom: "2em" }}>  
                                <Link href="/profile"> 
                                    <a style={{ borderBottom: "none" }}><div style={{ display: "inline", marginRight: " 0.5em" }} className="icon fa-chevron-left"></div><span style={{ fontSize: "30px", fontWeight: 600 }}>Profil</span></a> 
                                </Link> 
                            </div>   
                        } 
                        <header className="major">   
                            <h1>Catalogue des élèves</h1>  
                        </header>  
                        <p>Tu peux prendre autant d'élèves que tu veux mais à seule condition, que tu t'engages à les enseigner ! Si cela se trouve que t'as des empêchements qui ne te permettent pas de continuer à tutorer tes élèves, tu pourras facilement les remettre dans la liste d'attente après !<br />   
                            Et pour nous permettre d'assurer le suivi de tous les élèves, nous te prions de remplir les séances que tu vas donner aux élèves sur ton profil.</p>    
   
                    </div>  

                    {selectedStudents.length > 0 && <> 
                        <div style={{ maxWidth: "95%", width: "100%", margin: "auto" }}>
                            <div className="table-wrapper"> 
                                <table> 
                                    <thead> 
                                        <tr>
                                            <th>Date de demande</th>  
                                            <th>Filière</th>
                                            <th>Matières</th> 
                                            <th>Demandes</th> 
                                            <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Selectionné</th> 
                                        </tr>  
                                    </thead>
                                    <tbody> 
                                        {selectedStudents.map(student => (  
                                            <tr key={`${student._id}`}>  
                                                <td>{moment(student.timestamp).format('DD/MM/YYYY HH:mm:ss')}</td> 
                                                <td>{student.filiere}</td>  
                                                <td>{student.matiere}</td>  
                                                <td>{student.wishes}</td>
                                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{selectedStudents.includes(student) ?  
                                                    <Icon style={{ fontSize: 30, verticalAlign: "text-top", color: "white", cursor: "pointer" }} onClick={() => { setError(false); setSelectedStudents(selectedStudents.filter(s => s._id != student._id)) }}>check_box</Icon> 
                                                    : <Icon style={{ fontSize: 30, verticalAlign: "text-top", color: "white", cursor: "pointer" }} onClick={() => handleSelectStudent(student)}>check_box_outline_blank</Icon>
                                                }</td>   
                                            </tr>  
                                        ))  
 
                                        }   
                                    </tbody>  
                                </table> 
                            </div>    
                            {error && <Alert severity="error">{error.message}</Alert>}  
                            <p style={{ marginBottom: '1em', textAlign: 'center' }}><b>Voulez vous prendre en charge ces élèves ?</b></p> 
                            <button className="button special medium" style={{ margin: 'auto', display: 'block' }} onClick={() => { setLoading(true); handleSubmit() }}>Oui !</button>   
                        </div> 
                        <Divider style={{ marginBottom: "3em" }} />    
                    </>} 

                    <div style={{ maxWidth: "95%", width: "100%", margin: "auto" }}>  
   
   
                        <div className="table-wrapper">   
                            <table>
                                <thead> 
                                    <tr>   
                                        <th>Date de demande</th>
                                        <th>Filière   
                                            <div className="select-wrapper" >
                                                <select style={{ backgroundColor: "#434b84" }} onChange={(e) => setFiliereTerm(e.target.value)}>   
                                                    <option value="">- Filière -</option>  
                                                    <option value="SCIENCES MATHÉMATIQUES">SCIENCES MATHÉMATIQUES</option>  
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
                                        </th> 
                                        <th>Matières<SearchInput className="search-input" placeholder="Filtrer par matière..." onChange={(term) => { setMatiereTerm(term) }} /></th> 
                                        <th>Demandes<SearchInput className="search-input" placeholder="Filtrer par chapitres..." onChange={(term) => { setWishesTerm(term) }} /></th>   
                                        <th>Selectionné</th> 
                                    </tr>   
                                </thead>
                                <tbody>  
                                    {filteredWishesStudents.slice(0, maxRows).map(student => (  
                                        <tr key={`${student._id}`}> 
                                            <td>{moment(student.timestamp).format('DD/MM/YYYY HH:mm:ss')}</td>   
                                            <td>{student.filiere}</td>  
                                            <td style={{ width: "50%" }}>{student.matiere}</td> 
                                            <td style={{ width: "40%" }}>{student.wishes}</td>    
                                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{selectedStudents.filter(s => s._id === student._id).length > 0 ?   
                                                <Icon style={{ fontSize: 30, verticalAlign: "text-top", color: "white", cursor: "pointer" }} onClick={() => { setError(false); setSelectedStudents(selectedStudents.filter(s => s._id != student._id)) }}>check_box</Icon> 
                                                : <Icon style={{ fontSize: 30, verticalAlign: "text-top", color: "white", cursor: "pointer" }} onClick={() => handleSelectStudent(student)}>check_box_outline_blank</Icon>
                                            }</td>
                                        </tr>   
                                    ))}  
                                </tbody>   
                            </table>   
                            <p style={{ textAlign: "center", cursor: "pointer" }} onClick={() => setMaxRows(maxRows + 10)}><b>Voir plus...</b></p> 
                        </div> 
                    </div>  
                </section>  
            </Layout> 
            } 
        </> 
    ) 
}   
 
export default Reports    