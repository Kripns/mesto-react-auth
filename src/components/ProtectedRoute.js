import React from "react";
import { Route, Navigate } from "react-router-dom";


function ProtectedRoute(props) {
  const { isLoggedIn, children } = props;
  
  return(
  !isLoggedIn ? <Navigate to="/sign-in" replace /> : children
  )
}

export default ProtectedRoute;