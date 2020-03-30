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
                <StudentsMap />

            </Layout>
        </>
    )
}

export default Admin