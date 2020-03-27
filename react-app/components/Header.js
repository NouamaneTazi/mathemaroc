import PropTypes from 'prop-types'
import Link from 'next/link'

const Header = (props) => (
    <header id="header" className="alt">
        <Link href="/">
            <img src="/logo.png" alt="logo" className="logo" />
        </Link>
        <nav>
            <a className="menu-link" onClick={e => {
                e.preventDefault();
                props.onToggleMenu(e);
                return false; // old browsers, may not be needed
            }} href="javascript:;">Menu</a>
        </nav>
    </header>
)


Header.propTypes = {
    onToggleMenu: PropTypes.func
}

export default Header
