import Head from "next/head"
import stylesheet from 'styles/main.scss'
  
import Header from './Header'
import Menu from './Menu' 
import Contact from './Contact'
import Footer from './Footer' 
import Router from "next/router"
import MenuAdmin from '../components/MenuAdmin'   

class Layout extends React.Component {
    constructor(props) { 
        super(props)
        this.state = {
            isMenuVisible: false,  
            loading: 'is-loading'   
        }
        this.handleToggleMenu = this.handleToggleMenu.bind(this)
    } 

    componentDidMount() {
        if (!this.props.loading && !this.props.user) {   
            Router.push('/profile') 
        } 
        this.timeoutId = setTimeout(() => {
            this.setState({ loading: '' }); 
        }, 100);   
    } 
  
    componentWillUnmount() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId); 
        } 
    }
 
    handleToggleMenu() {
        this.setState({ 
            isMenuVisible: !this.state.isMenuVisible  
        })  
    } 
  
    render() { 
        const {user} = this.props 
        return (  
            <div className={`body ${this.props.loading ? 'is-loading' : this.state.loading} ${this.state.isMenuVisible ? 'is-menu-visible' : ''}`}>
                <Head> 
                    <title>Math&Maroc</title>
                    <meta name="description" content="Le site de Math&Maroc" />  
                    <link href="/static/css/skel.css" rel="stylesheet" />  
                    <link href='https://cdn.jsdelivr.net/npm/react-phone-input-2@2.12.1/lib/lib.min.js' rel='stylesheet' />  
                    <link rel="stylesheet" href="https://unpkg.com/react-phone-number-input@3.x/bundle/style.css"/> 
                    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" rel="stylesheet" /> 
                    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.7.1/css/all.min.css" rel="stylesheet" />
                    <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,300i,600,600i" rel="stylesheet" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />     
                    <link
                        href="https://api.mapbox.com/mapbox-gl-js/v0.51.0/mapbox-gl.css" 
                        rel="stylesheet"  
                    /> 
                </Head> 
                <style dangerouslySetInnerHTML={{ __html: stylesheet }} />

                <div id="wrapper"> 
                    <Header onToggleMenu={this.handleToggleMenu} />
                   <MenuAdmin user={user} /> 
                    {this.props.children}
                    {/* <Contact /> */}  
                    <Footer />
                </div>  
                <Menu onToggleMenu={this.handleToggleMenu} user={this.props.user} loading={this.props.loading} /> 
   
            </div>
        ) 
    }  
}

export default Layout 
