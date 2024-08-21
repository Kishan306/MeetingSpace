import { Navigate } from "react-router-dom";
import { getCurrentUser, isAuthenticated } from "../utils/auth";
import PropTypes from 'prop-types'
import { useDispatch } from "react-redux";
import { logout } from "../features/user/userSlice";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const dispatch = useDispatch();
    const user = getCurrentUser();
    const isAuth = isAuthenticated();

    if(!isAuth){
        dispatch(logout())
        alert("Session expired, please login again!")
        return <Navigate to='/login'/>;
    }

    if(allowedRoles && !allowedRoles.includes(user.role)){
        return <Navigate to='/notfound'/>;
    }

    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
    allowedRoles: PropTypes.arrayOf(PropTypes.string)
}

export default ProtectedRoute;