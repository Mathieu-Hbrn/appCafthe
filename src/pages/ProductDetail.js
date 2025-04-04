import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import "../style/ProductDetail.css";
import "../style/fonts.css";
import {useCart} from "../context/CartContext";


function ProductDetail(props) {
    const {id} = useParams();
    const [produit, setProduit] = useState([]);
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);
    const getTVA = (categorie) => {
        return categorie === 3 ? 0.20 : 0.055
    }
    const prixHT = parseFloat(produit.prix_ht_produit);
    const tva = getTVA(produit.categorie_produit);
    const totalTTC = prixHT * (1+tva);

    const handleAddToCart = () => {
        addToCart(produit);
        setAdded(true);
        setTimeout(() => setAdded(false), 1500); // Effet temporaire
    };

    useEffect(() => {
        const fetchProduits = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/produits/${id}`);
                setProduit(res.data);
            } catch (err) {
                console.error("Erreur de chargement du produit ",err);
            }
        };
        void fetchProduits();
    }, [id]);

    return (
        <div className="product-details">
            <img src={`/img/${produit.Photo}`} alt="Produit" width={700}/>
            <h3>{produit.designation_produit}</h3>
            <p>{produit.description_produit}</p>
            <p>{totalTTC.toFixed(2)}€</p>
            <button
                className={`btn btn-primary ${added ? "added" : ""}`}
                onClick={handleAddToCart}
            >
                {added ? "Ajouté ! ✅" : "Ajouter au panier"}
            </button>
        </div>
    );
}

export default ProductDetail;