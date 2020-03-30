import Head from "next/head"
import StudentsMap from "../components/StudentsMap"
import Layout from '../components/Layout'

const Admin = () => {

    return (
        <>
            <Layout >
                <Head>
                    <title>Map</title>
                    <meta name="description" content="Map" />
                </Head>
                <section id="one">
                    <div className="inner">
                        <header className="major">
                            <h1>Map</h1>
                        </header>
                        <StudentsMap />
                    </div>
                </section >
            </Layout>
        </>
    )
}

export default Admin