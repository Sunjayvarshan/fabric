import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext"; // Create an AuthContext to manage authentication status

const requireAuth = (Component) => {
  const WrappedComponent = (props) => {
    const { isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
      if (!isLoggedIn) {
        navigate("/login"); // Redirect to login page if not logged in
      }
    }, [isLoggedIn, navigate]);

    return isLoggedIn ? <Component {...props} /> : null;
  };

  return WrappedComponent;
};

export default requireAuth;
