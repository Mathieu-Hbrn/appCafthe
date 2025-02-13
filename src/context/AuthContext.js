import React, { createContext, useState, useEffect } from "react";

/* Exportation du contexte pour y avoir accès*/
export const AuthContext = createContext(null);

/* Création du provider pour la connexion et la deco */
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null); // Client
    const [token, setToken] = useState(null); // token JWT

    // Stockage dans le LocalStorage pour la persistance des données
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (storedUser && storedToken) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
    }, []);


    // Si le token ou l'user changent, on met à jour le localStorage
    useEffect(() => {
        if (token && user) {
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        }
    }, [token, user]);

    // Connexion (on reçoit les données envoyées par l'API: token + info client)
    const login = (jwt, userData) => {
        setToken(jwt);
        setUser(userData);
    }
    // Déconnexion
    const logout = () => {
        setToken(null);
        setUser(null);
    };

    const value ={
        token,
        user,
        login,
        logout,
        isAuthenticated : !!token, // Soit vrais, soit faux, ture ou false
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}