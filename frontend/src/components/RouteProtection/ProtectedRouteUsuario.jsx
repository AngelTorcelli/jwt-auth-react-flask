import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../../../context/authcontext";


const ProtectedRouteUsuario = ({children, redirectTo="/login"}) =>{
    const { userRole, loading } = useAuth();

    if (loading) return <div>Loading...</div>; 
    if (userRole === "user") {
        return children ? children : <Outlet />
    }
    return <Navigate to={redirectTo} />;

      
}

export default ProtectedRouteUsuario