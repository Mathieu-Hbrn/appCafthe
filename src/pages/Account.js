import {useEffect, useState} from "react";
import Skeleton from "react-loading-skeleton";
import axios from "axios";
import "../style/Account.css"

function Account() {
    const token = localStorage.getItem("token");
    const [id_client, setId_Client] = useState(null);
    const [commande, setCommande] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user"));
        setUser(userData);
        if (userData) {
            setId_Client(userData.id); // Récupération de l'ID client
        }
    }, []);

    useEffect(() => {
        if (!id_client || !token) return;

        const fetchCommande = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/api/commande/client/${id_client}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log(res.data)
                setCommande(Array.isArray(res.data) ? res.data : []);
            } catch (err) {
                console.error("Erreur de chargement des commandes", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCommande()
    }, [id_client, token]);

    if (isLoading) {
        return (
            <div className="order-list">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="product-skeleton">
                        <Skeleton height={200} width={300} />
                        <div style={{ marginTop: "10px" }}>
                            <Skeleton height={20} width="70%" />
                        </div>
                        <div style={{ marginTop: "5px" }}>
                            <Skeleton height={20} width="40%" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div>
            <div className="Order-list">
                {commande.length > 0 ? (
                    commande.map((cmd) => (
                        <div key={cmd.id_commande}>
                            <p>Commande ID: {cmd.id_commande}</p>
                            <p>Statut: {cmd.status_commande}</p>
                            <p> Prix TTC: {cmd.montant_ttc}</p>
                        </div>
                    ))
                ) : (
                    <p>Aucune commande réalisée</p>
                )}
            </div>
            <div>
                <h3>Modifier vos informations</h3>
                <ul>
                    <li>Nom et Prénom <br/><input type={"text"} placeholder={user.nom}/></li>
                    <li>Adresse mail <br/><input type={"email"} placeholder={user.email}/></li>
                    <li>Téléphone <br/><input type={"tel"} placeholder={user.tel}/></li>
                    <li>Adresse <br/><input type={"text"} placeholder={user.adresse}/></li>
                </ul>
            </div>
        </div>

    );
}

export default Account;