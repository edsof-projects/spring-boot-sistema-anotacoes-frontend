import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const PrivateRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" />;
  }

  try {
    const decoded = jwtDecode(token);
    const role    = decoded.role; // já vem como "USUARIO" ou "ADMINISTRADOR"

    if (allowedRoles && !allowedRoles.includes(role)) {
      return <Navigate to="/" />;
    }
  } catch (err) {
    // token inválido
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;