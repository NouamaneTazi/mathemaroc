import Link from 'next/link'

export default function ({user}) {
    return (
        <ul className="actions" style={{ display: "flex", justifyContent: 'space-evenly', width: "100%", margin: "2em 0 0 0" }}>
            <li><Link href="/profile"><a>Profile</a></Link></li>
            <li><Link href="/seances"><a >Seances données</a></Link></li>
            <li><Link href="/suivicatalogue"><a >Suivi du catalogue</a></Link></li>
            <li><Link href="/attribuertuteur"><a>Tuteurs en attente</a></Link></li>
            <li><Link href="/reports"><a>Elèves signalés</a></Link></li>
            <li><Link href="/demandeseleves"><a>Demandes d'élèves</a></Link></li>
            <li><Link href="/map"><a>Map</a></Link></li>
            {!user && <li><a href="/api/login">Se connecter</a></li>}
        </ul>
    )
}