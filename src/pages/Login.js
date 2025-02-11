import React, {useState} from 'react';
import {AuthContext} from "../context/AuthContext";
import axios from "axios";

function Login(props) {
    const [email, setEmail] = useState("")
    const [mot_de_passe, setMot_de_passe] = useState("")
    const [errorMsg, setErrorMsg] = useState("")

    const handleSubmit = async (e) =>{
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3000/api/client/login",
                {
                    email, mot_de_passe,
                },
            );

            const {token, client} = response.data
        } catch (error) {}
    };

    return (
        <div>
            <h2> Connexion</h2>
            <form onSubmit={handleSubmit}>
                <ul>
                    <li>
                        <label> E-mail</label>
                        <input type="email"
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}
                               required
                               />
                    </li>
                    <li>
                        <label> Mot de passe</label>
                        <input
                            type="password"
                            value={mot_de_passe}
                            onChange={(e) => setMot_de_passe(e.target.value)}
                            required
                        />
                    </li>
                    <li>
                        <button>Se connecter</button>
                    </li>
                </ul>

            </form>
        </div>
    );
}

export default Login;