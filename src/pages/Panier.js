import React, { useEffect, useState } from 'react';
import CartContext from "../context/CartContext";

function Panier() {
    const [inCartItemsNum, setInCartItemsNum] = useState(0);
    const [cartArticles, setCartArticles] = useState([]);

    // Charger les données du localStorage au montage du composant
    useEffect(() => {
        const storedItemsNum = parseInt(localStorage.getItem('inCartItemsNum')) || 0;
        const storedCartArticles = JSON.parse(localStorage.getItem('cartArticles')) || [];

        setInCartItemsNum(storedItemsNum);
        setCartArticles(storedCartArticles);
    }, []);

    return (
        <div>
            <p>Articles dans le panier : <span id="in-cart-items-num">{inCartItemsNum}</span></p>

            <ul id="cart-dropdown">
                {cartArticles.length > 0 ? (
                    cartArticles.map(article => (
                        <li key={article.id}>
                            <a href={article.url}>
                                {article.name}<br />
                                <small>Quantité : <span className="qt">{article.qt}</span></small>
                            </a>
                        </li>
                    ))
                ) : (
                    <p id="empty-cart-msg">Votre panier est vide.</p>
                )}
            </ul>

            <table className="table">
                <thead>
                <tr>
                    <th>Article</th>
                    <th>Prix</th>
                    <th>Quantité</th>
                </tr>
                </thead>
                <tbody id="cart-tablebody">
                {cartArticles.map(article => (
                    <tr key={article.id}>
                        <td>{article.name}</td>
                        <td>{article.price}€</td>
                        <td>{article.qt}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <p>Sous total : <span className="subtotal">{cartArticles.reduce((sum, item) => sum + item.price * item.qt, 0)}</span>€</p>

            <button id="confirm-command">Passer la commande</button>
        </div>
    );
}

export default Panier;
