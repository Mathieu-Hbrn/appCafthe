import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import {AuthProvider} from "./context/AuthContext";
import Login from "./pages/Login";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path={"/"} element={<Layout />}>
                        <Route index element={<Home />}/>
                        <Route path={"login"} element={<Login/>}/>
                        <Route path="produit/:id" element={<ProductDetail/>}/>

                    </Route>
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;