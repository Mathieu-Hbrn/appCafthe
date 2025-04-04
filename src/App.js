import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import {AuthProvider} from "./context/AuthContext";
import Login from "./pages/Login";

import {CartProvider} from "./context/CartContext";
import Panier from "./pages/Panier";
import Account from "./pages/Account";
import LegalMentions from "./pages/LegalMentions";
import CGU from "./pages/CGU";
import CGV from "./pages/CGV";



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
                            <Route path="/cient/suprr/:id" element={<Account/>}/>
                            <Route path="LegalMentions" element={<LegalMentions/>}/>
                            <Route path="CGU" element={<CGU/>}/>
                            <Route path="CGV" element={<CGV/>}/>
                        </Route>
                    </Routes>
                </Router>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;