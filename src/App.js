import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import {AuthProvider} from "./context/AuthContext";
import Login from "./pages/Login";
import panier from "./pages/Panier";
import axios from "axios";
import ProductList from "./pages/ProductList"; // Récupérer le token depuis localStorage
import {CartProvider} from "./context/CartContext";
import Panier from "./pages/Panier";
import Account from "./pages/Account";
const token = localStorage.getItem("token");

if (token) {
    axios.get("http://localhost:3000/api/produits", {
        headers: {
            Authorization: `Bearer ${token}`  // Ajouter le token dans l'en-tête Authorization
        }
    })
        .then(response => {
            console.log("Réponse des produits : ", response.data);
        })
        .catch(error => {
            console.error("Erreur :", error.response.data);
        });
} else {
    console.log("Aucun token trouvé");
}
function App() {
    return (
        <AuthProvider>
            <CartProvider>
                {" "}
                <Router>
                    <Routes>
                        <Route path={"/"} element={<Layout />}>
                            <Route index element={<Home />}/>
                            <Route path={"login"} element={<Login/>}/>
                            <Route path={"Panier"} element={<Panier />}/>
                            <Route path="produit/:id" element={<ProductDetail/>}/>
                            <Route path="/client/:id" element={<Account />}/>
                        </Route>
                    </Routes>
                </Router>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;