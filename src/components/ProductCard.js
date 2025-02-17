import React from 'react';
import {Link} from "react-router-dom";
import "../style/ProductCard.css"
import {useCart} from "../context/CartContext";

function ProductCard({produit}) {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart(produit)
    }

    return (
        <div className="Product-card">
            <img src={`/img/${produit.Photo}`} alt="Produit" />
            <h3>{produit.designation_produit}</h3>
            <p>{produit.prix_ht_produit}</p>
            <Link to={`/produit/${produit.id_produit}`} className="detail-btn">Voir détails</Link>
            <button className="btn btn-primary" onClick={handleAddToCart}>Ajouter au panier</button>
        </div>
    );
}

export default ProductCard;