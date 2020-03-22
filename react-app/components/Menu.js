import PropTypes from 'prop-types'
import Link from 'next/link'

const Menu = ({ user, loading, onToggleMenu }) => (
    <nav id="menu">
        <div className="inner">
            <ul className="links">
                <li><Link href="/"><a><span onClick={onToggleMenu}>Home</span></a></Link></li>
                <li><Link href="/Publications"><a><span onClick={onToggleMenu}>Publications</span></a></Link></li>
                <li><Link href="/Olympiades"><a><span onClick={onToggleMenu}>Olympiades</span></a></Link></li>
                <li><Link href="/Actualités"><a><span onClick={onToggleMenu}>Actualités</span></a></Link></li>
                <li><Link href="/Stages"><a><span onClick={onToggleMenu}>Stages</span></a></Link></li>
            </ul>
            <ul className="actions vertical">
                {!user ? <li><a href="/api/login" className="button special fit">Log In</a></li>
                : <li><a href="/api/logout" className="button special fit">Log Out</a></li>}
                <li><a href="/join" className="button fit">Join Us</a></li>
            </ul>
        </div>
        <a className="close" onClick={onToggleMenu} href="javascript:;">Close</a>
    </nav>
)

Menu.propTypes = {
    onToggleMenu: PropTypes.func
}

export default Menu
