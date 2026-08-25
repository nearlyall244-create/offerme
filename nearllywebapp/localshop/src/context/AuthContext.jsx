import React, { createContext, useState, useEffect } from "react";
import { loginUser } from "../api/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("localshop_user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("localshop_token") || null;
  });

  const [location, setLocation] = useState(() => {
    return localStorage.getItem("localshop_selected_location") || "Kattupakkam";
  });

  const isAuthenticated = Boolean(user && token);

  useEffect(() => {
    if (user && token) {
      localStorage.setItem("localshop_user", JSON.stringify(user));
      localStorage.setItem("localshop_token", token);
    } else {
      localStorage.removeItem("localshop_user");
      localStorage.removeItem("localshop_token");
    }
  }, [user, token]);

  useEffect(() => {
    localStorage.setItem("localshop_selected_location", location);
  }, [location]);

  // ============================================================
  // LOGIN STEP 1: Check credentials, sends OTP
  // Returns: { success, requiresOtp, email }
  // ============================================================
  const login = async (email, password) => {
    const data = await loginUser(email, password);
    return data;
  };

  // ============================================================
  // LOGIN STEP 2: Set user + token after OTP verification
  // ============================================================
  const completeLogin = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
  };

  // ============================================================
  // LOGOUT
  // ============================================================
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("localshop_user");
    localStorage.removeItem("localshop_token");
  };

  // ============================================================
  // UPDATE LOCATION
  // ============================================================
  const updateLocation = (newLocation) => {
    setLocation(newLocation);
  };

  // ============================================================
  // GET TOKEN (for API requests)
  // ============================================================
  const getToken = () => token;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        location,
        login,
        completeLogin,
        logout,
        updateLocation,
        getToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
