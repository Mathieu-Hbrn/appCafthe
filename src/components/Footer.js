import React from 'react';
import LegalMentions from "../pages/LegalMentions";
import {Link} from "react-router-dom";

function Footer(props) {
    return (
        <div><Link to={`LegalMentions`}>Mentions légales</Link></div>
    );
}

export default Footer;