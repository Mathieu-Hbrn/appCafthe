import React, { useState, useEffect } from 'react';
import { useCart } from "../context/CartContext";
import "../style/fonts.css";
import "../style/Panier.css"

function Panier() {
    const { cartItems, removeFromCart, clearCart } = useCart();
    const [quantite, setQuantite] = useState(
        cartItems.reduce((acc, item) => ({ ...acc, [item.id_produit]: 1 }), {})
    );
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [id_client, setId_Client] = useState(null);
    const [user, setUser] = useState(null);
    const [adresseClient, setAdresseClient] = useState(null);

    // Charger les infos client depuis localStorage

    useEffect(() =>{
        const userData = JSON.parse(localStorage.getItem("user"));
        setUser(userData);

        if (userData) {
            setId_Client(userData.id); // Récupération de l'ID client
            setAdresseClient(userData.adresse)

        }}, []) ;

    const handleQuantityChange = (id, value) => {
        const quantity = Math.max(1, parseInt(value) || 1);
        setQuantite(prevQuantite => ({
            ...prevQuantite,
            [id]: quantity
        }));
    };

    const getTVA = (categorie) => (categorie === 3 ? 0.20 : 0.055);

    const subtotal = cartItems.reduce((sum, item) =>
        sum + parseFloat(item.prix_ht_produit) * (quantite[item.id_produit] || 1), 0
    );

    const totalTTC = cartItems.reduce((sum, item) => {
        const prixHT = parseFloat(item.prix_ht_produit);
        const tva = getTVA(item.categorie_produit);
        return sum + (prixHT * (1 + tva) * (quantite[item.id_produit] || 1));
    }, 0);

    // Fonction pour valider la commande
    const handleConfirmOrder = async () => {
        setLoading(true);
        setMessage(null);

        //Bloquer la valid. commande si non connecté
        if (!id_client || !adresseClient) {
            setMessage({ type: "error", text: "Veuillez vous connecter et ajouter une adresse de livraison." });
            setLoading(false);
            return;
        }

        // Création de l'objet commande
        const commandeData = {
            commande: {
                id_client: id_client,
                Montant_ht: subtotal.toFixed(2),
                Montant_tva: (totalTTC - subtotal).toFixed(2),
                Montant_ttc: totalTTC.toFixed(2),
                adresse_livraison_commande: adresseClient
            },

            // Création des objets lignes commande
            lignes_commande: cartItems.map(item => ({
                id_produit: item.id_produit,
                QuantiteProduitLigne: quantite[item.id_produit],
                PrixUnitLigne: item.prix_ht_produit
            }))
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/commande/ajout/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(commandeData)
            });

            const data = await response.json();

            if (response.ok) {
                setMessage({ type: "success", text: "Commande validée avec succès !" });
                clearCart(); // Vide le panier après validation
            } else {
                throw new Error(data.message || "Erreur lors de la validation de la commande");
            }
        } catch (error) {
            setMessage({ type: "error", text: error.message });
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="Cart">
            <p>Articles dans le panier : <span id="in-cart-items-num">{cartItems.length}</span></p>

            <ul id="cart-dropdown">
                {cartItems.length > 0 ? (
                    cartItems.map(article => (
                        <li key={article.id_produit}>
                            <ul>{article.designation_produit}</ul>
                            <ul>{article.prix_ht_produit}€</ul>
                            <small>Quantité :
                                <input
                                    type="number"
                                    value={quantite[article.id_produit]}
                                    onChange={(e) => handleQuantityChange(article.id_produit, e.target.value)}
                                    min="1"
                                />
                            </small>
                            <button onClick={() => removeFromCart(article.id_produit)}> Retirer du panier </button>
                        </li>
                    ))
                ) : (
                    <p id="empty-cart-msg">Votre panier est vide.</p>
                )}
            </ul>

            <p>Sous total : <span className="subtotal">{subtotal.toFixed(2)}</span>€</p>
            <p>Total TTC : <span className="total-ttc">{totalTTC.toFixed(2)}</span>€</p>

            {id_client ? (
                <>
                    <p><strong>Adresse de livraison :</strong> {adresseClient}</p>
                    {cartItems.length > 0 && (
                        <button id="confirm-command" onClick={handleConfirmOrder} disabled={loading}>
                            {loading ? "Validation en cours..." : "Passer la commande"}
                        </button>
                    )}
                </>
            ) : (
                <p style={{ color: "red" }}>Veuillez vous connecter pour valider votre commande.</p>
            )}

            {message && (
                <p className={message.type === "success" ? "success-message" : "error-message"}>
                    {message.text}
                </p>
            )}
        </div>
    );
}

export default Panier;
