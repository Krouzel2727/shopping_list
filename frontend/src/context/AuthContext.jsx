import { createContext, useState, useEffect, useContext } from "react";
import { api } from "../api/client";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  // Při načtení stránky zkusíme obnovit uživatele, pokud máme token
  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          // Zkusíme načíst data o uživateli (pokud bys měl endpoint /users/me)
          // Pro teď použijeme uložená data z localStorage nebo mock
          const userData = JSON.parse(localStorage.getItem("user"));
          setUser(userData);
        } catch (err) {
          console.error("Auth init failed", err);
          logout();
        }
      }
      setLoading(false);
    };
    initAuth();
  }, [token]);

  const login = async (email, password) => {
    const result = await api.login(email, password);
    // Uložit do localStorage
    localStorage.setItem("token", result.data.token);
    localStorage.setItem("user", JSON.stringify(result.data.user));
    // Nastavit state
    setToken(result.data.token);
    setUser(result.data.user);
    return result;
  };

  const register = async (name, email, password) => {
    await api.register(name, email, password);
    // Po registraci rovnou přihlásíme (volitelné)
    await login(email, password);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);