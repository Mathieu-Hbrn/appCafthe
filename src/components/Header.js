import React, {useContext} from 'react';
import "../style/Header.css"
import {Link} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

function Header(props) {
    const {user, isAuthenticated, logout} = useContext(AuthContext);
    const handleLogout =() =>{
        logout()
    };
    return (
        <div className="Header">
            <Link to={``}><img src="/img/Logo.jpg" alt="Logo cafthé" id="logo"/></Link>
            <h2>Bienvenu chez Caf'Thé</h2>
            <div>

                {isAuthenticated ? (
                    <>
                    <span>
                        Bonjour {user.nom}
                    </span>

                        <button onClick={handleLogout}>Se déconnecter</button>
                    </>
                ) : (<Link to={`/login`}><img src="/img/pngwing.com.png" alt="Se connecter"/></Link>)
                }

            </div>



        </div>
    );
}

export default Header;