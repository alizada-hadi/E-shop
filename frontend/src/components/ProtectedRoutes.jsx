import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
function ProtectedRoutes() {
  const { user } = useSelector((state) => state.auth);

  return user ? <Outlet /> : <Navigate to={"/signin"} />;
}

export default ProtectedRoutes;
