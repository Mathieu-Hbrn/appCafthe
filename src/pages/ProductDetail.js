import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import "../style/ProductDetail.css"
import {useCart} from "../context/CartContext";


function ProductDetail(props) {
    const {id} = useParams();
    const [produit, setProduit] = useState([]);
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart(produit)
    }

    useEffect(() => {
        const fetchProduits = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/api/produits/${id}`);
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
            <p>{produit.prix_ht_produit}€ (HT)</p>
            <button className="btn btn-primary" onClick={handleAddToCart}>Ajouter au panier</button>
        </div>
    );
}

export default ProductDetail;