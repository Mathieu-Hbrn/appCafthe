import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });


    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (item) => {
        setCartItems((prevItems) => [...prevItems, item]);
    };

    const removeFromCart = (id_produit) => {
        setCartItems(prevItems =>
            prevItems.filter(item => item.id_produit !== id_produit));
    };


    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider
            value={{ cartItems, addToCart, removeFromCart, clearCart }}
        >
            {children}
        </CartContext.Provider>
    );


};


export const useCart = () => useContext(CartContext);

export default CartContext;
