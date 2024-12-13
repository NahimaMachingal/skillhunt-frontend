//src/components/AuthHOC.jsx

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { refreshAccessToken } from "../features/auth/authApi";
import  { jwtDecode }  from "jwt-decode";

// Utility to check token expiration
const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    console.log("dddd",decoded);
    return decoded.exp * 1000 < Date.now();
  } catch (error) {
    return true;
  }
};

// AuthHOC: This will wrap around the routes that need authentication
const AuthHOC = ({ children, restrictedPaths }) => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const refreshTokenState = useSelector((state) => state.auth.refreshToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Check if the token is expired and if so, refresh it
  useEffect(() => {
    if (!accessToken || isTokenExpired(accessToken)) {
      if (refreshTokenState) {
        dispatch(refreshAccessToken())
          .unwrap()
          .catch(() => navigate("/login"));
      } else {
        navigate("/login");
      }
    }

    // Set interval to refresh the token every 4 minutes (240,000ms)
    const tokenRefreshInterval = setInterval(() => {
      if (accessToken && refreshTokenState && !isTokenExpired(accessToken)) {
        // Refresh the token every 4 minutes
        dispatch(refreshAccessToken());
      }
    }, 240000);

    // Cleanup interval on unmount
    return () => clearInterval(tokenRefreshInterval);
  }, [accessToken, refreshTokenState, dispatch, navigate]);

  
    if (!accessToken || isTokenExpired(accessToken)) {
      // Redirect to login if access token is invalid or expired
      return null;
    }
  

  return children; // Render the child components if authenticated
};

export default AuthHOC;
