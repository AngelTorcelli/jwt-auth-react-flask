import { createContext, useContext, useState, useEffect } from "react";
import { getRole } from "../endpoints/endpoints";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const role = await getRole();
        console.log("se obtuvo el rol:", role);
        setUserRole(role);
      } catch (error) {
        console.error("Error fetching role:", error);
        console.log("se obtuvo el rol:", null);
        setUserRole(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, []);

  return (
    <AuthContext.Provider value={{ userRole, setUserRole, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
