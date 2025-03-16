import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import ProductCard from "../components/ProductCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../style/ProductList.css"




function ProductList(props) {
    //   const {token} = useContext(AuthContext)
    const token = localStorage.getItem(`token`)
    const [produits, setProduits] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [categorieId, setCategorieId] = useState("")


    useEffect(() => {
        const fetchProduits = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/produits`, {
                    //headers: {Authorization: `Bearer `+ token}
                });
                setProduits(res.data);
            } catch (err) {
                console.error("Erreur de chargement des produits ",err);

            } finally {
                setIsLoading(false); /* On arrete d'afficher les elemnts de chargement */
            }
        };
        void fetchProduits();
    }, []);

    // Filtrage des produits par catégorie
    const produitsFiltres = categorieId
        ? produits.filter((produit) => produit.id_categorie === parseInt(categorieId))
        : produits;
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

            <div className="category-buttons">
                <button
                    onClick={() => setCategorieId(null)}
                    className={!categorieId ? "active" : ""}
                >
                    Toutes
                </button>
                <button
                    onClick={() => setCategorieId(1)}
                    className={categorieId === 1 ? "active" : ""}
                >
                    Thé
                </button>
                <button
                    onClick={() => setCategorieId(2)}
                    className={categorieId === 2 ? "active" : ""}
                >
                    Café
                </button>
                <button
                    onClick={() => setCategorieId(3)}
                    className={categorieId === 3 ? "active" : ""}
                >
                    Accessoires
                </button>
            </div>


            <div className="product-list">
                {produitsFiltres.length > 0 ? (
                    produitsFiltres.map((produit) => <ProductCard key={produit.id_produit} produit={produit} />)
                ) : (
                    <p>Aucun produit trouvé pour cette catégorie.</p>
                )}
            </div>
        </div>
    );
}

export default ProductList;