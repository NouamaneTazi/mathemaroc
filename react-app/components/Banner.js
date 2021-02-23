import Link from 'next/link'                            
                                
const Banner = (props) => (                        
    <section id="banner" className="major">                        
        <div className="inner">                                    
            <header className="major">                              
                <h1>COVID-19 Special</h1>                               
            </header>                                
            <div className="content">                                  
                <p>School closed? We’re here for you with free resources to keep everyone learning..</p>                       
                <ul className="actions">                         
                    <li><Link href="/profile"><a className="button next">More</a></Link></li>                         
                </ul>                                
            </div>                      
        </div>                           
    </section>                      
)                              
                               
export default Banner                            
