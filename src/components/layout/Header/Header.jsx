import { Link } from 'react-router-dom'
import './Header.css'

const Header = () => {

    return (
        <>
            <nav className="navbar navbar-custom navbar-expand-md navbar-text " >
                <div className="container">
                    <Link className="navbar-link-white navbar-brand h1" to="/">Agro Genius</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                        <ul className="navbar-nav ">
                            <li className="nav-item">
                                <b><Link className="h1 navbar-link-white nav-link  active" aria-current="page" to="/">HOME</Link></b>
                            </li>
                            <li className="nav-item">
                                <b><Link className="h1 navbar-link-white nav-link " aria-current="page" to="/crop">CROP-RECOMMEDATION</Link></b>
                            </li>
                            <li className="nav-item">
                                <b><Link className="h1 navbar-link-white nav-link " aria-current="page" to="/product">PRODUCTS</Link></b>
                            </li>
                            <li className="nav-item">
                                <b><Link className="h1 navbar-link-white nav-link " aria-current="page" to="/about">ABOUT</Link></b>
                            </li>
                            <li className="nav-item">
                                <b><Link className="h1 navbar-link-white nav-link " aria-current="page" to="/contact">CONTACT</Link></b>
                            </li>
                            {<li className="nav-item">
                                <b><Link className="h1 navbar-link-white nav-link " aria-current="page" to="/signin">SIGN IN</Link></b>
                            </li>}
                            {/* { <li className="nav-item">
                                <b><Link className="h1 navbar-link-white nav-link " aria-current="page"><img src={profileUrl} className="img-fluid rounded" alt="Profile" width={30}/></Link></b>
                            </li>} */}
                            {/* { <li className="nav-item">
                                <b><Link className="h1 navbar-link-white nav-link " aria-current="page" > Log out</Link></b>
                            </li>} */}
                        </ul>
                    </div>
                </div>
            </nav>

        </>
    )
}

export default Header