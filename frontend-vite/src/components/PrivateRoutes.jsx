import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ConfigRoutes from "../config/routes";

export default function PrivateRoutes(props) {
  const role = props.role || "guest";

  const allowedRoutes = ConfigRoutes[role].allowedRoutes;
  const redirectRoutes = ConfigRoutes[role].redirectRoutes;
  return (
    <div>
      <Routes>
        {allowedRoutes.map((route) => {
          <Route
            exac
            path={route.url}
            key={route.url}
            component={route.component}
          />;
        })}
        {/* <Navigate to={redirectRoutes} /> */}
      </Routes>
    </div>
  );
}
