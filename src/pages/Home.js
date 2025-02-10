import React from 'react';
import ProductList from "./ProductList";
import "../style/Home.css"

function Home(props) {
    return (
        <div>
            <div className="home-banner">
                <h2>Bienvenue chez Cafthé</h2>
            </div>
                <ProductList/>

        </div>
    );
}

export default Home;