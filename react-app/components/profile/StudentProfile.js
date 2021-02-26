   
  
const Profile = ({ user }) => { //Afficher classement dans file d'attente  
  
    return (<>  
        <section id="one">   
            <div className="inner"> 
                <header className="major">  
                    <h2>Bienvenue {user.fullname}</h2>  
                </header> 
                <p>On va bientôt t'attribuer un tuteur, donc check ta boite mail/whatsapp/facebook régulièrement pour voir si t'as reçu un message de ton tuteur.</p>  
            </div>   
        </section> 
    </> 
    )  
} 
  
export default Profile  