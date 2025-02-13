import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";


function Navbar(props) {
    const {user, isAuthenticated, logout} = useContext(AuthContext);
    const handleLogout =() =>{
        logout()
    };

    return (
        <nav>
            <Link to="/">Caf'thé</Link>

            {isAuthenticated ? (
                <>
                    <span>
                        Bonjour {user.nom}
                    </span>

                    <button onClick={handleLogout}>Se déconnecter</button>
                </>
                    ) : (
                        <Link to={`/login`}>Se connecter</Link>
                )
            };

        </nav>
    );
}

export default Navbar;