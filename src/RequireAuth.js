import { children } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/Authorization" state={{ from: location }} />;
  }

  return children;
};
export { RequireAuth };
