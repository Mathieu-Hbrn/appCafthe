import React, {useEffect, useState} from 'react';
import axios from "axios";
import ProductCard from "../components/ProductCard";


function ProductList(props) {
    const [produits, setProduits] = useState([]);

    useEffect(() => {
        const fetchProduits = async () => {
            try {
                const res = await axios.get("http://localhost:3000/api/produits");
                setProduits(res.data);
            } catch (err) {
                console.error("Erreur de chargement des produits ",err);
            }
        };
        void fetchProduits();
    }, []);
    return (
        <div>
            <h3>Liste des produits</h3>
            <div className="product-list">
                {produits.map((produit) =>
                    <ProductCard key={produit.id_produit} produit={produit} />
                )}
            </div>
        </div>
    );
}

export default ProductList;