import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./Contexts/AuthContext";

const PrivateRoute = ({ element: Element }) => {
  const { currentUser } = useAuth();

  return currentUser ? Element : <Navigate to="/login" />;
};

export default PrivateRoute;
