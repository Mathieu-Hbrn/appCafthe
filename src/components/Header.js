import React, {useContext} from 'react';
import "../style/Header.css"
import {Link} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import { useCart} from "../context/CartContext";

function Header(props) {
    const { clearCart } = useCart();
    const {user, isAuthenticated, logout} = useContext(AuthContext);
    const handleLogout =() =>{
        logout()
    };
    const { cartItems } = useCart();
    return (
        <div className="Header">
            <Link to={``}><img src="/img/Logo.jpg" alt="Logo cafthé" id="logo"/></Link>
            <h2>Bienvenu chez Caf'Thé</h2>
            {cartItems.length > 0 ? (
                <div>
                    <p>Vous avez <span id="in-cart-items-num">{cartItems.length}</span> Articles dans votre panier</p>
                    <button className="go-to-cart"><a href="/Panier/">Voir le panier</a></button><button className="btn btn-primary" onClick={clearCart}>Vider le panier</button>
                </div>
            ) : (
                <p id="empty-cart-msg">Votre panier est vide.</p>
            )}

            <div>

                {isAuthenticated ? (
                    <>
                    <span>
                        <Link to={`/client/${user.id}`}> Bonjour {user.nom}</Link>
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