import Link from 'next/link'

export default function ({user}) {
    return (
        <ul className="actions" style={{ display: "flex", justifyContent: 'space-evenly', width: "100%", margin: "2em 0 0 0" }}>
            <li><Link href="/profile"><a>Profile</a></Link></li>
            <li><Link href="/seances"><a >Seances données</a></Link></li>
            <li><Link href="/suivi-catalogue"><a >Suivi du catalogue</a></Link></li>
            <li><Link href="/suivi-inscription"><a>Suivi des inscriptions (tuteurs)</a></Link></li>
            <li><Link href="/reports"><a>Elèves signalés</a></Link></li>
            <li><Link href="/voir-groupe"><a>Voir groupe</a></Link></li>
            <li><Link href="/map"><a>Map</a></Link></li>
            {!user && <li><a href="/api/login">Se connecter</a></li>}
        </ul>
    )
}