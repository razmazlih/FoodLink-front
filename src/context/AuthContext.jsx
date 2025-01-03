import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null);

    const handleLogout = useCallback(() => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userId');
        setUserId(null);
        setIsLoggedIn(false);
        navigate('/');
    }, [navigate]);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const myUserId = localStorage.getItem('userId');
        if ((accessToken && !myUserId) || (!accessToken && myUserId)) {
            handleLogout();
        } else {
            setIsLoggedIn(!!accessToken);
            setUserId(myUserId || '');
        }
    }, [handleLogout]);

    const handleLogin = (tokens) => {
        localStorage.setItem('accessToken', JSON.stringify(tokens));
        extractUserIdFromToken(tokens.access);
        setIsLoggedIn(true);
    };


    const extractUserIdFromToken = (token) => {
        try {
            const payload = token.split('.')[1];
            const decodedPayload = JSON.parse(atob(payload));
            const userId = decodedPayload.user_id;
            setUserId(userId);
            localStorage.setItem('userId', userId);
            return userId;
        } catch (error) {
            console.error('Failed to extract user_id from token:', error);
            return null;
        }
    };

    return (
        <AuthContext.Provider
            value={{ isLoggedIn, handleLogin, handleLogout, userId }}
        >
            {children}
        </AuthContext.Provider>
    );
};
