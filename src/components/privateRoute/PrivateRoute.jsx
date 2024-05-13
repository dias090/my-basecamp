import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const PrivateRoute = ({ isAuthenticated }) => {
    const navigate = useNavigate();
    return isAuthenticated ? <Outlet /> : navigate("/form");
};

export default PrivateRoute;
