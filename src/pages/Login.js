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
    const [nom_prenom, setNom_prenom] = useState("")
    const [telephone, setTelephone] = useState("")
    const [mail_register, setMail_register] = useState("")
    const [adresse, setAdresse] = useState("")
    const [mdp_register, setMdp_register] = useState("")
    const dateCreation = new Date();
    const year = dateCreation.getFullYear();
    const month = String(dateCreation.getMonth() + 1).padStart(2, '0'); // Ajoute un zéro si nécessaire
    const day = String(dateCreation.getDate()).padStart(2, '0'); // Ajoute un zéro si nécessaire
    const dateFormat = `${year}-${month}-${day}`;



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
    const registerSubmit = async (e) =>{
        e.preventDefault();
        setErrorMsg("")

        try {
            const response = await axios.post("http://localhost:3000/api/client/register",
                {
                    nom_prenom, telephone, dateFormat, mail_register, mdp_register, adresse
                },
            );

            const { token, client } = response.data;
            login(token, client);
            navigate("/");
        } catch (error) {
            console.error("Erreur lors de l'inscription : ", error);
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMsg(error.response.data.message);
            } else {
                setErrorMsg("Erreur lors de l'inscription");
            }
        }
    };

    return (
        <div className="div-container">
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
                            <div className="error-message">
                                {errorMsg && (
                                    <div>Erreur</div>
                                )}
                            </div>
                            <button>Se connecter</button>
                        </li>
                    </ul>

                </form>
            </div>
            <div>
                <h2>Créer votre compte</h2>
                <form onSubmit={registerSubmit}>
                    <li>
                        <label> Votre nom et prénom </label>
                        <input type="text" required
                               value={nom_prenom}
                               onChange={(e) =>setNom_prenom(e.target.value)}/>
                        <label> Votre numéro de téléphone</label>
                        <input type="number" required
                               value={telephone}
                               onChange={(e) =>setTelephone(e.target.value)}/>
                        <label> Votre E-mail</label>
                        <input type="email"
                               value={mail_register}
                               onChange={(e) => setMail_register(e.target.value)}
                               required
                        />
                        <label> Votre adresse</label>
                        <input type="text"
                               value={adresse}
                               onChange={(e) => setAdresse(e.target.value)}
                               required
                        />
                        <label>Votre mot de passe</label>
                        <input type={"password"}
                               value={mdp_register}
                               onChange={(e) => setMdp_register(e.target.value)}/>

                        <div className="error-message">
                            {errorMsg && (
                                <div>Erreur</div>
                            )}
                        </div>
                        <button>Créer votre compte</button>
                    </li>
                </form>
            </div>
        </div>

    );
}

export default Login;