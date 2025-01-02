import React, { createContext, useState, useEffect } from 'react';

// יצירת הקונטקסט
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        setIsLoggedIn(!!accessToken); // עדכון מצב ההתחברות
    }, []);

    const handleLogin = (token) => {
        localStorage.setItem('accessToken', token);
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};