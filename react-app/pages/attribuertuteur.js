import Head from "next/head"    
import { useState, useEffect } from "react"   
import Layout from '../components/Layout'
import { useFetchUser } from '../lib/user' 
import Router from "next/router"   
import MenuAdmin from '../components/MenuAdmin'  
 
const InputGroupId = ({ tutor }) => {    
    const setGroupId = async (tutor) => { 
        // console.log(tutor, selectedGroupId)  
        await fetch('/api/mongodb', {   
            method: 'post',     
            body: JSON.stringify({ _id: tutor._id, data: { "groupId": selectedGroupId } }) 
        })   
        window.location.reload(false)   
    } 
   
    const [selectedGroupId, setSelectedGroupId] = useState("") 

    return (<div className="12u 12u(small)" >   
        <input   
            type="text" 
            id="group_id" 
            name="group_id" 
            value={selectedGroupId}  
            onChange={event => setSelectedGroupId(parseInt(event.target.value))}  
        />   
        {selectedGroupId && <div className="button special" onClick={() => setGroupId(tutor)}>Confimer</div>}  
    </div>) 
}  
     
const Reports = () => { 
    const getUserData = async (user) => {     
        let res = await fetch('/api/mongodb?auth0id=' + user.sub) 
        let json = await res.json() 
        if (!json.is_admin) Router.push('/profile')   
        Object.assign(user, json)   
        res = await fetch('/api/mongodb?getAwaitingTutors=true')   
        const new_awaitingtutors = await res.json()       
   
        res = await fetch('/api/mongodb?getAwaitingStudents=true')  
        const awaitingStudents = await res.json() 
   
        setAwaitingTutors(new_awaitingtutors) 
        setAwaitingStudents(awaitingStudents)   
    }   
    
    const handleModClick = async (tutor, report_id) => { 
        if (tutor.reports[report_id].mod) {    
            delete tutor.reports[report_id].mod  
        } else { 
            tutor.reports[report_id].mod = { "id": user.sub, "name": user.name }  
        }   
 
        const res = await fetch('/api/mongodb', {     
            method: 'post',  
            body: JSON.stringify({ _id: tutor._id, data: { reports: tutor.reports } })  
        }) 
        setRefresh(!refresh)   
    } 
    
    let { user, loading } = useFetchUser()   
    const [awaitingtutors, setAwaitingTutors] = useState([]) 
    const [awaitingStudents, setAwaitingStudents] = useState([])   
    const [refresh, setRefresh] = useState(true)  
    
    useEffect(() => {     
        // {console.log("useEffect", user, loading)}   
        if (user && !loading) {    
            getUserData(user)     
        }  
    }, [user, loading])  
    
    return (      
        <> 
            {/* {console.log(user)} */}  
            {!loading && <Layout user={user} loading={loading}>
                <Head>
                    <title>Tuteurs en attente</title>   
                    <meta name="description" content="Tuteurs en attente" />   
                </Head>    
                <MenuAdmin user={user}/> 
                <section id="one"> 
                    <div className="inner" style={{maxWidth:"75em"}}>     
                        <header className="major">   
                            {user ? <h1>Tuteurs en attente ({awaitingtutors.length})</h1>    
                                : <h1>Vous n'êtes pas connectés</h1>}    
                        </header>  
   
                        <div className="12u 12u(medium)">  
                            <div className="table-wrapper">  
                                <table> 
                                    <thead>    
                                        <tr>   
                                            <th>Tuteur</th>  
                                            <th>Statut</th>    
                                            <th>Matières</th>   
                                            <th>Whatsapp</th>   
                                            <th>Mail</th>  
                                            <th>Veut encadrer groupe ?</th>  
                                            <th>Groupe</th>      
                                        </tr>  
                                    </thead> 
                                    <tbody>   
 
                                        {awaitingtutors.map(tutor => ( 
                                            <tr key={`${tutor._id}`}>
                                                <td>{tutor.firstname} {tutor.lastname}</td>   
                                                <td>{tutor.statut}</td>
                                                <td>{tutor.matieres}</td>   
                                                <td>{tutor.whatsapp}</td> 
                                                <td>{tutor.mail}</td>  
                                                <td>{tutor.encadrer_groupe ? "Oui" : "Non"}</td>   
                                                <td style={{verticalAlign:"middle"}}><InputGroupId tutor={tutor} /></td>  
                                            </tr>   
                                        )  
                                        )}  
                                    </tbody> 
                                </table>   
                            </div>    
                        </div>     
                    </div>  
    
                </section>  
            </Layout>  
            }   
        </>  
    )
} 
  
 
export default Reports     