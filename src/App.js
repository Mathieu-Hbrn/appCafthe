import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";

function App() {
    return (
        <Router>
            <Routes>
                <Route path={"/"} element={<Layout />}>
                    <Route index element={<Home />}/>
                    <Route path="produit/:id" element={<ProductDetail/>}/>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;