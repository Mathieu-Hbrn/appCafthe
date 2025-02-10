import React from 'react';
import {Link} from "react-router-dom";

function ProductCard({produit}) {
    return (
        <div className="Product-card">
            {/*image*/}
            <h3>{produit.designation_produit}</h3>
            <p>{produit.prix_ht_produit}</p>
            <Link to={`/produit/${produit.id_produit}`} className="detail-btn">Voir détails</Link>
        </div>
    );
}

export default ProductCard;