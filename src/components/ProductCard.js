import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "../style/ProductCard.css";
import "../style/fonts.css";
import { useCart } from "../context/CartContext";

const getTVA = (categorie) => (categorie === 3 ? 0.20 : 0.055);

function ProductCard({ produit }) {
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);

    const handleAddToCart = () => {
        addToCart(produit);
        setAdded(true);
        setTimeout(() => setAdded(false), 1500); // Effet temporaire
    };

    const prixHT = parseFloat(produit.prix_ht_produit);
    const tva = getTVA(produit.categorie_produit);
    const totalTTC = prixHT * (1 + tva);

    return (
        <div className="Product-card">
            <img src={`/img/${produit.Photo}`} alt="Produit" />
            <h3>{produit.designation_produit}</h3>
            <p>{totalTTC.toFixed(2)}€</p>
            <Link to={`/produit/${produit.id_produit}`} className="detail-btn">Voir détails</Link>
            <button
                className={`btn btn-primary ${added ? "added" : ""}`}
                onClick={handleAddToCart}
            >
                {added ? "Ajouté ! ✅" : "Ajouter au panier"}
            </button>
        </div>
    );
}

export default ProductCard;
