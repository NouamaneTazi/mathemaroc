import Head from "next/head"  
import Link from 'next/link'    
    
import Layout from '../components/Layout'        
import BannerCovid from '../components/BannerCovid'    
     
export default () => (     
    <Layout>     
        <Head>      
            <title>Covid</title>   
            <meta name="description" content="Covid" />     
        </Head>    
    
        <div>      
            <BannerCovid />     
    
            <div id="main">   
                <section id="one">  
                    <div className="inner">     
                        <header className="major">  
                            <h2>Resources for schools, teachers, and parents </h2>   
                        </header>    
                        <p>Resources for schools, teachers, and parents<br />       
                        Hello parents and teachers,<br />       
      
                        With concerns growing over the coronavirus (COVID-19), we know many of you are making plans to keep learning going should your school need to close.<br />    
        
                        We want to do everything we can to support you. We are a nonprofit organization with free educational resources.<br />     
   
                        We are having daily (weekdays) 9am PST/12 EST live streams on Facebook, YouTube and Twitter for students, parents and teachers navigating school closures.<br />    
    
                        Here are guides we’ve created for you:</p>    
                    </div>   
                </section>    
            </div>     
  
        </div>   
    </Layout>    
)     
