import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { ERRORS } from '../constants/constants';
import ErrorHandler from './ErrorHandler';

const ProtectedRoute = ({ component: Component, roles, ...rest }) => {
    const user = useSelector((state) => state.user);
    const location = useLocation();

    if (!user.token && !localStorage.getItem('token')) {
        // checking token needs to be added
        return <Navigate to="/" state={{ from: location }} />;
    }

    if (roles && roles.indexOf(user.role) === -1) {
        return <ErrorHandler error={ERRORS.ROLE} />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
