import React, { useState } from 'react';
import {useCart} from "../context/CartContext";



function Panier() {

    const { cartItems } = useCart();
    const [quantite, setQuantite] = useState(
        cartItems.reduce((acc, item) => ({...acc, [item.id_produit]: 1}), {})
    );
    const { removeFromCart } = useCart();


    const handleQuantityChange = (id, value) => {
        const quantity = Math.max(1, parseInt(value) || 1);
        setQuantite(prevQuantite => ({
            ...prevQuantite,
            [id]: quantity
        }));
    }
    const subtotal = cartItems.reduce((sum, item) =>
        sum + (parseFloat(item.prix_ht_produit) * (quantite[item.id_produit] || 1)), 0
    );



    // Charger les données du localStorage



    return (
        <div>
            <p>Articles dans le panier : <span id="in-cart-items-num">{cartItems.length}</span></p>

            <ul id="cart-dropdown">
                {cartItems.length > 0 ? (
                    cartItems.map(article => (
                        <li key={article.id_produit}>
                            <ul>{article.designation_produit}</ul>
                            <ul>{article.prix_ht_produit}€</ul>
                            <small>Quantité : <input
                                type={"number"}
                                value={quantite[article.id_produit]}
                                onChange={(e) => handleQuantityChange(article.id_produit, e.target.value)}
                                min="1"/></small>
                            <button onClick={() => removeFromCart(article.id_produit)}> Retirer du panier </button>

                        </li>


                    ))

                ) : (
                    <p id="empty-cart-msg">Votre panier est vide.</p>
                )}
            </ul>
            <div>{cartItems.length > 0 && (
                <button id="confirm-command">Passer la commande</button>
            )}</div>


            <p>Sous total : <span className="subtotal">{subtotal.toFixed(2)}</span>€</p>


        </div>
    );
}

export default Panier;
