import React, {useEffect, useState} from 'react';
import axios from "axios";
import ProductCard from "../components/ProductCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../style/ProductList.css"



function ProductList(props) {
    const [produits, setProduits] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchProduits = async () => {
            try {
                const res = await axios.get("http://localhost:3000/api/produits");
                setProduits(res.data);
            } catch (err) {
                console.error("Erreur de chargement des produits ",err);
            } finally {
                setIsLoading(false); /* On arrete d'afficher les elemnts de chargement */
            }
        };
        void fetchProduits();
    }, []);
    if(isLoading){
        return (
            <div className="product-list">
                {Array.from({length : 6}).map((_,i) => (
                    <div key={i} className="product-skeleton">
                        {/* Image*/}
                        <Skeleton height={200} width={300} />
                        <div style={{marginTop: "10px"}}>
                            <Skeleton height={20} width="70%" />
                        </div>


                        <div style={{ marginTop: "5px"}}>
                            <Skeleton height={20} width="40%" />
                        </div>
                    </div>


                ))}
            </div>
        );
    }
    return (
        <div>
            <h3>Liste des produits</h3>
            <div className="product-list">
                {/* Image*/}

                {produits.map((produit) =>
                    <ProductCard key={produit.id_produit} produit={produit} />
                )}
            </div>
        </div>
    )
}

export default ProductList;