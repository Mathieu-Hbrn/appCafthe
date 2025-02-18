import React, { useEffect, useState } from 'react';
import {useCart} from "../context/CartContext";

function Panier() {

    const { cartItems } = useCart();


    // Charger les données du localStorage


    return (
        <div>
            <p>Articles dans le panier : <span id="in-cart-items-num">{cartItems.length}</span></p>

            <ul id="cart-dropdown">
                {cartItems.length > 0 ? (
                    cartItems.map(article => (
                        <li key={article.id_produit}>
                            <td>{article.designation_produit}<br /></td>
                            <td>{article.designation_produit}</td>
                            <td>{article.prix_ht_produit}€</td>
                            <small>Quantité : <span className="qt">{article.qt}</span></small>

                        </li>
                    ))
                ) : (
                    <p id="empty-cart-msg">Votre panier est vide.</p>
                )}
            </ul>


            <p>Sous total : <span className="subtotal">{cartItems.reduce((sum, item) => sum + cartItems.prix_ht_produit , 0)}</span>€</p>

            <button id="confirm-command">Passer la commande</button>
        </div>
    );
}

export default Panier;
