import { useEffect, useState, createContext } from "react";
import api from "../services/api";

export const AuthContext = createContext();

// Pour la récupération des données des utilisateurs
export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
        async function fetchMe() {
        if (!token) {
            setLoading(false);
            return;
        }
        try {
            const { data } = await api.get("/auth/me");
            setUser(data.data);
        } catch {
            localStorage.removeItem("token");
            setToken(null);
        } finally {
            setLoading(false);
        }
        }
        fetchMe();
    }, [token]);

  
    const login = async (email, password) => {
        const { data } = await api.post("/auth/login", { email, password });
        localStorage.setItem("token", data.data.token);
        setToken(data.data.token);
        setUser(data.data.user);
    };
    const register = async (username, email, password, favorite_player = "") => {
        const { data } = await api.post("/auth/register", {
            username,
            email,
            password,
            favorite_player,
        });

        localStorage.setItem("token", data.data.token);
        setToken(data.data.token);
        setUser(data.data.user);
    };
    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    };
    
    return (
        <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
        {children}
        </AuthContext.Provider>
    );
}