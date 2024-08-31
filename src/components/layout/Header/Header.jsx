import { Link } from 'react-router-dom'
import './Header.css'
import { useKeycloak } from '@react-keycloak/web';
import { useEffect, useState } from 'react';

const Header = () => {
    const { keycloak, initialized } = useKeycloak();
    const [ profileUrl, setProfile ] = useState();
 
    const socailMediaSingup = (keycloakData) => {
      console.log(keycloakData.tokenParsed.email);
      console.log(keycloakData);

      if(localStorage.getItem("token") === null){
        localStorage.setItem("token", keycloakData.token);
      }
      
      setProfile(keycloakData.tokenParsed.picture);
    
    }
    useEffect(() => {
      if (keycloak.authenticated) {
        console.log("keycloak.authenticated", keycloak.authenticated);
        socailMediaSingup(keycloak, (res) => {
          if (res.data.status === 200) {
            if (res.data.result.isDetailsAvailable) {
                console.log("Ok");
            //   // If details are available take the user to dashborad page
            //   if (nonLoggedInUserData && nonLoggedInUserData.redirectUrl) {
            //     history.push(nonLoggedInUserData.redirectUrl);
            //   } else {
            //     history.push("/homebuyer/explore");
            //   }
            } else {
                console.log("Not Ok");
              //If details are not available take the user to home buyer details page
              //history.push("/homebuyerdetails");
            }
          }
        });
      }
    }, [keycloak.authenticated]);

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
                            {!keycloak.authenticated && <li className="nav-item">
                                <b><Link className="h1 navbar-link-white nav-link " aria-current="page" to="/signin">SIGN IN</Link></b>
                            </li>}
                            {keycloak.authenticated && <li className="nav-item">
                                <b><Link className="h1 navbar-link-white nav-link " aria-current="page"><img src={profileUrl} className="img-fluid rounded" alt="Profile" width={30}/></Link></b>
                            </li>}
                            {keycloak.authenticated && <li className="nav-item">
                                <b><Link className="h1 navbar-link-white nav-link " aria-current="page" onClick={() => keycloak.logout()}> Log out</Link></b>
                            </li>}
                        </ul>
                    </div>
                </div>
            </nav>

        </>
    )
}

export default Header