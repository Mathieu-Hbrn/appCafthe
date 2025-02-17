import React, {useContext} from 'react';
import "../style/Header.css"
import {Link} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import { useCart} from "../context/CartContext";

function Header(props) {
    const {user, isAuthenticated, logout} = useContext(AuthContext);
    const handleLogout =() =>{
        logout()
    };
    const { cartItems } = useCart();
    console.log(cartItems)
    return (
        <div className="Header">
            <Link to={``}><img src="/img/Logo.jpg" alt="Logo cafthé" id="logo"/></Link>
            <h2>Bienvenu chez Caf'Thé</h2>
            <div className="dropdown">
                <div id="cart">
                    <p>Vous avez <span id="in-cart-items-num">{cartItems.length}</span> Articles dans votre panier</p>
                </div>

                <ul id="cart-dropdown" hidden>
                    <li id="empty-cart-msg"><a>Votre panier est vide</a></li>
                    <li className="go-to-cart hidden"><a href="/panier/">Voir le panier</a></li>
                </ul>
            </div>
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