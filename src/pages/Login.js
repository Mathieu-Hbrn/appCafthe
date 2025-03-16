import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login(props) {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [mot_de_passe, setMot_de_passe] = useState('');
    const [errorMsgLogin, setErrorMsgLogin] = useState('');
    const [nom_prenom, setNom_prenom] = useState('');
    const [telephone, setTelephone] = useState('');
    const [mail_register, setMail_register] = useState('');
    const [adresse, setAdresse] = useState('');
    const [mdp_register, setMdp_register] = useState('');
    const [errorMsgRegister, setErrorMsgRegister] = useState('');

    const dateCreation = new Date();
    const year = dateCreation.getFullYear();
    const month = String(dateCreation.getMonth() + 1).padStart(2, '0');
    const day = String(dateCreation.getDate()).padStart(2, '0');
    const dateFormat = `${year}-${month}-${day}`;


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsgLogin('');

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/client/login`, {
                email: email,
                mot_de_passe: mot_de_passe, // Correction du nom du champ
            });

            const { token, client } = response.data;
            login(token, client);
            navigate('/');
        } catch (error) {
            console.error('Erreur lors de la connexion : ', error);
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMsgLogin(error.response.data.message);
            } else {
                setErrorMsgLogin('Erreur lors de la connexion');
            }
        }
    };

    const registerSubmit = async (e) => {
        e.preventDefault();
        setErrorMsgRegister('');

        try {

            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/client/register`, {
                nom_prenom: nom_prenom,
                telephone: telephone,
                dateFormat: dateFormat,
                mail_register: mail_register,
                mdp_register: mdp_register,
                adresse: adresse,
            });

            const { token, client } = response.data;
            login(token, client);
            navigate('/');
        } catch (error) {
            console.error('Erreur lors de l\'inscription : ', error);
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMsgRegister(error.response.data.message);
            } else {
                setErrorMsgRegister('Erreur lors de l\'inscription');
            }
        }
    };

    return (
        <div className="div-container">
            <div>
                <h2>Connexion</h2>
                <form onSubmit={handleSubmit}>
                    <ul>
                        <li>
                            <label>E-mail</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </li>
                        <li>
                            <label>Mot de passe</label>
                            <input
                                type="password"
                                value={mot_de_passe}
                                onChange={(e) => setMot_de_passe(e.target.value)}
                                required
                            />
                        </li>
                        <li>
                            <div className="error-message">
                                {errorMsgLogin && <div>{errorMsgLogin}</div>}
                            </div>
                            <button>Se connecter</button>
                        </li>
                    </ul>
                </form>
            </div>
            <div>
                <h2>Créer votre compte</h2>
                <form onSubmit={registerSubmit}>
                    <ul>
                        <li>
                            <label>Votre nom et prénom</label>
                            <input
                                type="text"
                                required
                                value={nom_prenom}
                                onChange={(e) => setNom_prenom(e.target.value)}
                            />
                        </li>
                        <li>
                            <label>Votre numéro de téléphone</label>
                            <input
                                type="text" // Changement de type à text
                                required
                                value={telephone}
                                onChange={(e) => setTelephone(e.target.value)}
                            />
                        </li>
                        <li>
                            <label>Votre E-mail</label>
                            <input
                                type="email"
                                value={mail_register}
                                onChange={(e) => setMail_register(e.target.value)}
                                required
                            />
                        </li>
                        <li>
                            <label>Votre adresse</label>
                            <input
                                type="text"
                                value={adresse}
                                onChange={(e) => setAdresse(e.target.value)}
                                required
                            />
                        </li>
                        <li>
                            <label>Votre mot de passe</label>
                            <input
                                type="password"
                                value={mdp_register}
                                onChange={(e) => setMdp_register(e.target.value)}
                            />
                        </li>
                        <li>
                            <div className="error-message">
                                {errorMsgRegister && <div>{errorMsgRegister}</div>}
                            </div>
                            <button>Créer votre compte</button>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
    );
}

export default Login;