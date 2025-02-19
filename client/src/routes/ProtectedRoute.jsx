import React from 'react';
import {Navigate} from "react-router-dom";

function ProtectedRoute({children, to, isAccepted}) {
    if (!isAccepted()) return <Navigate to={to}/>;
    return children;
}

export default ProtectedRoute;