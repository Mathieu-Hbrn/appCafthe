import React from 'react';
import { Outlet} from "react-router-dom"
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Layout(props) {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>

    );

}

export default Layout;