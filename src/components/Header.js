import React, { useContext, useState } from 'react';
import "../style/Header.css";
import "../style/fonts.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function Header() {
    const { clearCart } = useCart();
    const { user, isAuthenticated, logout } = useContext(AuthContext);
    const { cartItems } = useCart();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="Header">
            <Link to="/">
                <img src="/img/Logo.png" alt="Logo cafthé" id="logo" />
            </Link>

            <h1>Bienvenue chez Caf'Thé</h1>

            <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
                ☰
            </div>

            <nav className={menuOpen ? "menu open" : "menu"}>
                {cartItems.length > 0 ? (
                    <div className="panier">
                        <p>Vous avez <span id="in-cart-items-num">{cartItems.length}</span> articles dans votre panier</p>
                        <button className="go-to-cart"><Link to="/Panier/">Voir le panier</Link></button>
                        <button className="btn btn-primary" onClick={clearCart}>Vider le panier</button>
                    </div>
                ) : (
                    <p id="empty-cart-msg">Votre panier est vide.</p>
                )}

                <div className="user-section">
                    {isAuthenticated ? (
                        <>
                            <span>
                                <Link to={`/client/${user.id}`}>Bonjour {user.nom}</Link>
                            </span>
                            <button onClick={handleLogout}>Se déconnecter</button>
                        </>
                    ) : (
                        <Link to="/login">
                            <img src="/img/pngwing.com.png" alt="Se connecter" />
                        </Link>
                    )}
                </div>
            </nav>
        </div>
    );
}

export default Header;
