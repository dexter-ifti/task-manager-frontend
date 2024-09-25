"use client"
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (credentials) => {
        const { data } = await axios.post("/api/users/login", credentials);
        const decoded = jwtDecode(data.token);
        setUser(decoded.id);
        localStorage.setItem("authToken", data.token);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
    };

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                if (decoded.exp * 1000 > Date.now()) {
                    setUser(decoded.id);
                } else {
                    // Token is expired
                    logout();
                }
            } catch (error) {
                // Error decoding token
                console.error("Error decoding token:", error);
                logout();
            }
        } else {
            // No token found
            setUser(null);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
