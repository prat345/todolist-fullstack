import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ConfigRoutes from "../config/routes";
import Login from "../pages/Login";

export default function PrivateRoutes(props) {
  const role = props.role || "guest";

  const allowedRoutes = ConfigRoutes[role].allowedRoutes;
  const protectedRoutes = ConfigRoutes[role].protectedRoutes;
  const redirectRoutes = ConfigRoutes[role].redirectRoutes;
  // console.log(allowedRoutes, redirectRoutes);
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      {allowedRoutes.map((route) => (
        <Route
          exac
          path={route.url}
          key={route.url}
          element={<route.component setRole={props.setRole} />}
        />
      ))}
      {protectedRoutes.map((route) => (
        <Route
          exac
          path={route.url}
          key={route.url}
          element={<Navigate to={redirectRoutes} />}
        />
      ))}
      <Route path="*" element={<h2>404 Page Not Found</h2>} />
    </Routes>
  );
}
