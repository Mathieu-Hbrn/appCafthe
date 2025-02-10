import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import "../style/ProductDetail.css"


function ProductDetail(props) {
    const {id} = useParams();
    const [produit, setProduit] = useState([]);

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
            {/*Image*/}
            <h3>{produit.designation_produit}</h3>
            <p>{produit.description_produit}</p>
            <p>{produit.prix_ht_produit}</p>
        </div>
    );
}

export default ProductDetail;