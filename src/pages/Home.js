import React from 'react';
import ProductList from "./ProductList";
import "../style/Home.css"
import "../style/fonts.css"

function Home(props) {
    return (
        <div>
            <div className="home-banner">
            </div>
                <ProductList/>

        </div>
    );
}

export default Home;