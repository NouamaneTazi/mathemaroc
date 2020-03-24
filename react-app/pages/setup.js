import Head from "next/head"
import { useState, useEffect } from "react"
import Layout from '../components/Layout'
import { useFetchUser } from '../lib/user'

const Profile = () => {
    const getUserData = async (user) => {
        let res = await fetch('/api/mongodb?id=' + user.sub)
        const json = await res.json()
        console.log("json", json)
        if (json.err) {
            setError({ error: true })
        }
        else {
            if (json.isTeacher) {
                res = await fetch('/api/mongodb?groupId=' + json.groupId)
                json.students = await res.json()
                json.students = json.students.filter(student => student.isStudent)
            }
            // console.log("json", json)
            setUserData(json)
        }

    }

    let { user, loading } = useFetchUser()
    const [userData, setUserData] = useState()
    const [error, setError] = useState()
    if (user && !userData && !loading && !error) {
        getUserData(user)
    }

    return (
        <>
            {!loading && <Layout user={user} loading={loading}>

                <Head>
                    <title>Profile Page</title>
                    <meta name="description" content="Profile Page" />
                </Head>

                {user && !user.isSetUp ? <div id="main" className="alt">
                    <section id="one">
                        <div className="inner">
                            <header className="major">
                                <h1>Profile</h1>
                            </header>

                            <div className="row 200%">
                                <div className="6u 12u(medium)">
                                    <h2 id="content">Mettez à jour votre profil</h2>
                                    <ul className="alt">
                                        <li><strong>Email :</strong> {userData.email}</li>
                                        <li><strong>Phone :</strong> {userData.phone}</li>
                                    </ul>

                                </div>
                            </div>

                        </div>
                    </section>
                </div>
                // No user connected
                    : <div id="main" className="alt">
                        <section id="one">
                            <div className="inner">
                                <header className="major">
                                    <h1>Profile</h1>
                                </header>
                                <h2 id="content">Vous n'êtes pas encore connectés</h2>
                                <a href="/api/login" className="button special">Connectez-vous !</a>
                            </div>
                        </section>
                    </div>
                }


            </Layout>}
        </>
    )
}

export default Profile