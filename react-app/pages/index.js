import Link from 'next/link'

import Layout from '../components/Layout'   
import Banner from '../components/Banner'  
import { useFetchUser } from '../lib/user'
import Router from 'next/router' 
import { useEffect } from 'react' 

export default () => {
  
    const { user, loading } = useFetchUser()  
    useEffect(() => { 
        Router.push('/profile')
    })  
     
    return ( 
        <Layout user={user} loading={loading}>  
            {/* {console.log("user", user)} */}
            <div> 
                <Banner /> 
                <div id="main"> 
                    <section id="one" className="tiles"> 
  
                        <article style={{ backgroundImage: `url('/static/images/publications.jpg')` }}>
                            <header className="major"> 
                                <h3>Publications</h3>  
                                <p>Nos publications...</p>   
                            </header> 
                            <Link href="/publications"><a className="link primary"></a></Link> 
                        </article>

                        <article style={{ backgroundImage: `url('/static/images/IMO/IMO2019.jpg')` }}>
                            <header className="major"> 
                                <h3>Olympiades</h3> 
                                <p>IMOs...</p>  
                            </header> 
                            <Link href="/olympiades"><a className="link primary"></a></Link> 
                        </article> 
 
                        <article style={{ backgroundImage: `url('/static/images/news.jpg')` }}> 
                            <header className="major"> 
                                <h3>Actualités</h3> 
                                <p>Suivez nos actualités...</p>
                            </header>   
                            <Link href="/actualites"><a className="link primary"></a></Link> 
                        </article>
   
   
                        <article style={{ backgroundImage: `url('/static/images/stages.jpg')` }}>
                            <header className="major"> 
                                <h3>Stages</h3>
                                <p>Savoir plus sur nos stages...</p>
                            </header>
                            <Link href="/stages"><a className="link primary"></a></Link> 
                        </article>
 
                    </section>
 
                    {/* <section id="two">
                    <div className="inner">
                        <header className="major">  
                            <h2>Massa libero</h2> 
                        </header> 
                        <p>Nullam et orci eu lorem consequat tincidunt vivamus et sagittis libero. Mauris aliquet magna magna sed nunc rhoncus pharetra. Pellentesque condimentum sem. In efficitur ligula tate urna. Maecenas laoreet massa vel lacinia pellentesque lorem ipsum dolor. Nullam et orci eu lorem consequat tincidunt. Vivamus et sagittis libero. Mauris aliquet magna magna sed nunc rhoncus amet pharetra et feugiat tempus.</p> 
                        <ul className="actions">
                            <li><Link href="/landing"><a className="button next">Get Started</a></Link></li>  
                        </ul> 
                    </div>
                </section> */} 
                </div>

            </div>
        </Layout>
    ) 
} 