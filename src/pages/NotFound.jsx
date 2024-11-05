// pages/NotFound.js
import React from "react";
import { useLocation, Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <p>
        <strong>URL:</strong> {location.pathname}
      </p>
      <p>Go to <Link to="/">Home</Link></p>
    </div>
  );
};

export default NotFound;
