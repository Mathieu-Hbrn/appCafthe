import React from 'react';
import {Link} from "react-router-dom";
import "../style/ProductCard.css"
import {useCart} from "../context/CartContext";

const getTVA = (categorie) => {
    return categorie === 3 ? 0.20 : 0.055
}

function ProductCard({produit}) {
    const {addToCart} = useCart();

    const handleAddToCart = () => {
        addToCart(produit)
    }

    const prixHT = parseFloat(produit.prix_ht_produit);
    const tva = getTVA(produit.categorie_produit);
    const totalTTC = prixHT * (1+tva);

    return (
        <div className="Product-card">
            <img src={`/img/${produit.Photo}`} alt="Produit" />
            <h3>{produit.designation_produit}</h3>
            <p>{totalTTC.toFixed(2)}€</p>
            <Link to={`/produit/${produit.id_produit}`} className="detail-btn">Voir détails</Link>
            <button className="btn btn-primary" onClick={handleAddToCart}>Ajouter au panier</button>
        </div>
    );
}

export default ProductCard;