import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthContext';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import PrivatePage from '../components/layout/PrivatePage/PrivatePage'

function PrivateRoute({ children }) {
    const navigate = useNavigate()
    const { authuser } = useContext(AuthContext)
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        if (authuser.token !== null) {
            setAuthChecked(true)
        }
    }, [authuser]);

    if(authChecked) 
        return children
    else
        return <PrivatePage/>
}

export default PrivateRoute;
