import React from 'react';

function LigneCommande({id, quantite, prix}) {

    // Appel à l'API pour récupérer les infos du produit d'id : id

    return (
        <div style={{padding: "15px", background:"lightgrey", border:"1px solid black", borderRadius:"20px"}}>
            <p>Nom produit d'id : {id}</p>
            <p>Quantité : {quantite}</p>
            <p>Prix : {prix * quantite}</p>
        </div>
    );
}

export default LigneCommande;