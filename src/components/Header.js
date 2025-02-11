import React from 'react';
import "../style/Header.css"
import {Link} from "react-router-dom";

function Header(props) {
    return (
        <div className="Header">
            <img src="/img/Logo.jpg" alt="Logo cafthé" id="logo"/>
            <h2>Header</h2>
            <Link to={`/login`}>Se connecter</Link>
        </div>
    );
}

export default Header;