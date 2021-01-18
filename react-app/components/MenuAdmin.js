import Link from 'next/link'
import { useRouter } from 'next/router'
import Router from 'next/router'
import { useEffect } from 'react'

export default function ({ user }) {
    const router = useRouter() 
    // useEffect(() => {
    //     if (router.pathname !== '/profile' && (!user || !user.is_admin)) Router.push('/profile')
    // }, [user])
 
    if (user && user.is_admin) {
        return (
            <ul className="actions" style={{ display: "flex", justifyContent: 'space-evenly', width: "100%", margin: "2em 0 0 0" }}>
                <li><Link href="/profile"><a>Profil</a></Link></li> 
                <li><Link href="/seances"><a >Seances données</a></Link></li> 
                <li><Link href="/suivi-catalogue"><a >Suivi du catalogue</a></Link></li> 
                <li><Link href="/suivi-inscription"><a>Inscriptions tuteurs</a></Link></li>
                <li><Link href="/suivi-inscription2"><a>Inscriptions élèves</a></Link></li> 
                <li><Link href="/reports"><a>Élèves signalés</a></Link></li>
                <li><Link href="/voir-groupe"><a>Voir groupe</a></Link></li> 
                <li><Link href="/map"><a>Map</a></Link></li> 
            </ul> 
        )
    } else return null
}