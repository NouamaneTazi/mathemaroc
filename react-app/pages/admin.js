import Head from "next/head"
import { useState, useEffect } from "react"
import Layout from '../components/Layout'
import { useFetchUser } from '../lib/user'
import SearchInput, { createFilter } from 'react-search-input'
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles, makeStyles } from '@material-ui/core/styles';

const Admin = () => {
    const getUserData = async (user) => {
        let res = await fetch('/api/mongodb?auth0id=' + user.sub)
        let json = await res.json()
        Object.assign(user, json)
        res = await fetch('/api/mongodb?getAllSeances=true')
        const value = await res.json()
        setTutors(value)
    }

    let { user, loading } = useFetchUser()
    const [tutors, setTutors] = useState([])

    useEffect(() => {
        // {console.log("useEffect", user, loading)}
        if (user && !loading) {
            getUserData(user)
        }
    }, [user, loading])

    return (
        <>
            {!loading && <Layout user={user} loading={loading}>
                {console.log("tutors", tutors)}
                <Head>
                    <title>Admin Page</title>
                    <meta name="description" content="Admin Page" />
                </Head>
                <section id="one">
                    <div className="inner">
                        <header className="major">
                            <h1>Tuteurs</h1>
                        </header>

                        <div className="12u 12u(medium)">
                            {tutors.map(tutor => (
                                <div className="table-wrapper">
                                    <h4>{tutor.firstname} {tutor.lastname} <i>({tutor.last_updated})</i></h4>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>Durée</th>
                                                <th>Chapitres traités</th>
                                                <th>Elèves absents</th>
                                                <th>Remarques</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tutor.seances ? tutor.seances.map((seance, index) => (
                                                <tr key={`${seance}~${index}`}>
                                                    <th>{seance.date}</th>
                                                    <th>{seance.duree}</th>
                                                    <th>{seance.chapitres}</th>
                                                    <th>{Object.values(seance.absents).join()}</th>
                                                    <th>{seance.remarques}</th>
                                                </tr>
                                            )): null}
                                        </tbody>
                                    </table>
                                </div>

                            ))}
                        </div>

                    </div>
                </section>
            </Layout>
            }
        </>
    )
}

export default Admin