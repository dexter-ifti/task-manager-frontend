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
        setUser(decoded);
        localStorage.setItem("token", data.token);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setUser(jwtDecode(token));
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
