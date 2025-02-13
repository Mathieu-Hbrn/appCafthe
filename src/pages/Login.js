import React, {useContext, useState} from 'react';
import {AuthContext} from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login(props) {
    const {login} = useContext(AuthContext); // Fonction login venant du contexte
    const navigate = useNavigate(); // La navigation

    const [email, setEmail] = useState("")
    const [mot_de_passe, setMot_de_passe] = useState("")
    const [errorMsg, setErrorMsg] = useState("")

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setErrorMsg("")

        try {
            const response = await axios.post("http://localhost:3000/api/client/login",
                {
                    email, mot_de_passe,
                },
            );

            const {token, client} = response.data;


            //On met a jour le contexte d'authentification
            login(token, client);


            //Redirection du cient vers une page
            navigate("/");
        } catch (error) {
            console.error("Erreur lors de la connexion : ", error)
            if (error.response.data.message) {
                setErrorMsg(error.response.data.message);
            } else {
                setErrorMsg("Erreur")
            }
        }
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
                        <div>
                            {errorMsg && (
                                <div>Erreur</div>
                            )}
                        </div>
                        <button>Se connecter</button>
                    </li>
                </ul>

            </form>
        </div>
    );
}

export default Login;