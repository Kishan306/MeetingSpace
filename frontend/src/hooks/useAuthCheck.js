import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getToken, isTokenExpired, removeToken } from '../utils/auth';

const useAuthCheck = () =>{
    useEffect(() => {
        const token = getToken();
    
        if (token) {
          if (isTokenExpired(token)) {
            removeToken();
            window.location.href = '/login'; // Redirect to login if token expired
          }
        } else {
          window.location.href = '/login'; // Redirect to login if no token
        }
      }, []);
}

export default useAuthCheck;