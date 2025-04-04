import React from 'react';
import "../style/Footer.css"
import "../style/fonts.css";
import {Link} from "react-router-dom";

function Footer(props) {
    return (
        <div className="BasDePage">
            <Link to={`LegalMentions`}>Mentions légales</Link>
            <Link to={`CGU`}>CGU</Link>
            <Link to={`CGV`}>CGV</Link>
        </div>
    );
}

export default Footer;