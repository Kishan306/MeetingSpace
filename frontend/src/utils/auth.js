import {jwtDecode} from "jwt-decode";

// Constants
const TOKEN_KEY = "jwt";

// Get the JWT token from local storage
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

// Save the JWT token to local storage
export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

// Remove the JWT token from local storage
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

// Decode the JWT token to get user information
export const decodeToken = (token) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    return null;
  }
};

// Check if the user is authenticated
export const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;

  const decoded = decodeToken(token);
  if (!decoded) return false;

  // Optionally, check if the token has expired
  const currentTime = Date.now() / 1000; // Current time in seconds
  return decoded.exp > currentTime;
};

export const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 < Date.now();
  } catch (error) {
    return true; // Token is invalid or expired
  }
};

// Get the current user from the JWT token
export const getCurrentUser = () => {
  const token = getToken();
  if (!token) return null;

  return decodeToken(token);
};
