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
    const [formData, setFormData] = useState({
        nom_prenom_client: '',
        Mail_client: '',
        Telephone_client: '',
        adresse_client: ''
    });
    const [updateMessage, setUpdateMessage] = useState('');
    const [updateStatus, setUpdateStatus] = useState('');

    // Récupérer les données du client depuis le localStorage
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user"));
        setUser(userData);
        if (userData) {
            setId_Client(userData.id); // Récupération de l'ID client
            // Initialiser le formulaire avec les données existantes
            setFormData({
                nom_prenom_client: userData.nom || '',
                Mail_client: userData.email || '',
                Telephone_client: userData.tel || '',
                adresse_client: userData.adresse || ''
            });
        }
    }, []);

    // Récupérer les commandes du client
    useEffect(() => {
        const fetchCommande = async () => {
            if (!id_client || !token) return;

            try {
                const res = await axios.get(`http://localhost:3000/api/commande/client/${id_client}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log(res.data);
                setCommande(Array.isArray(res.data) ? res.data : []);
            } catch (err) {
                console.error("Erreur de chargement des commandes", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCommande();
    }, [id_client, token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdateMessage('');
        setUpdateStatus('');

        try {
            // Envoi de toutes les données du formulaire, modifiées ou non
            const res = await axios.put(
                `http://localhost:3000/api/client/update/${id_client}`,
                formData,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            // Mise à jour du localStorage avec les nouvelles données
            const updatedUser = {
                ...user,
                nom: formData.nom_prenom_client,
                email: formData.Mail_client,
                tel: formData.Telephone_client,
                adresse: formData.adresse_client
            };

            localStorage.setItem('user', JSON.stringify(updatedUser));
            setUser(updatedUser);

            setUpdateStatus('success');
            setUpdateMessage('Informations mises à jour avec succès');
        } catch (err) {
            console.error("Erreur lors de la mise à jour", err);
            setUpdateStatus('error');
            setUpdateMessage(err.response?.data?.message || 'Erreur lors de la mise à jour');
        }
    };

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
        <div className="account-container">
            <div className="order-section">
                <h2>Vos commandes</h2>
                <div className="Order-list">
                    {commande.length > 0 ? (
                        commande.map((cmd) => (
                            <div key={cmd.id_commande} className="order-item">
                                <p>Commande ID: {cmd.id_commande}</p>
                                <p>Statut: {cmd.status_commande}</p>
                                <p>Prix TTC: {cmd.montant_ttc} €</p>
                            </div>
                        ))
                    ) : (
                        <p>Aucune commande réalisée</p>
                    )}
                </div>
            </div>

            <div className="profile-section">
                <h2>Modifier vos informations</h2>
                {updateMessage && (
                    <div className={`update-message ${updateStatus}`}>
                        {updateMessage}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nom et Prénom</label>
                        <input
                            type="text"
                            name="nom_prenom_client"
                            value={formData.nom_prenom_client}
                            onChange={handleChange}
                            placeholder="Votre nom et prénom"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Adresse mail</label>
                        <input
                            type="email"
                            name="Mail_client"
                            value={formData.Mail_client}
                            onChange={handleChange}
                            placeholder="Votre email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Téléphone</label>
                        <input
                            type="tel"
                            name="Telephone_client"
                            value={formData.Telephone_client}
                            onChange={handleChange}
                            placeholder="Votre téléphone"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Adresse</label>
                        <input
                            type="text"
                            name="adresse_client"
                            value={formData.adresse_client}
                            onChange={handleChange}
                            placeholder="Votre adresse"
                            required
                        />
                    </div>
                    <button type="submit" className="update-button">
                        Mettre à jour
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Account;