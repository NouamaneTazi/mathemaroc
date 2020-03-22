import PropTypes from 'prop-types'
import Link from 'next/link'

const Menu = (props) => (
    <nav id="menu">
        <div className="inner">
            <ul className="links">
                <li><Link href="/"><a><span onClick={props.onToggleMenu}>Home</span></a></Link></li>
                <li><Link href="/Publications"><a><span onClick={props.onToggleMenu}>Publications</span></a></Link></li>
                <li><Link href="/Olympiades"><a><span onClick={props.onToggleMenu}>Olympiades</span></a></Link></li>
                <li><Link href="/Actualités"><a><span onClick={props.onToggleMenu}>Actualités</span></a></Link></li>
                <li><Link href="/Stages"><a><span onClick={props.onToggleMenu}>Stages</span></a></Link></li>
            </ul>
            <ul className="actions vertical">
                <li><a href="/login" className="button special fit">Log In</a></li>
                <li><a href="/join" className="button fit">Join Us</a></li>
            </ul>
        </div>
        <a className="close" onClick={props.onToggleMenu} href="javascript:;">Close</a>
    </nav>
)

Menu.propTypes = {
    onToggleMenu: PropTypes.func
}

export default Menu
