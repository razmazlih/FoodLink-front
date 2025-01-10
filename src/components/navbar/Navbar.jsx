import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';
import CartNavbar from '../cart/CartNavbar';
import './Navbar.css';

const Navbar = () => {
    const { isLoggedIn, handleLogout } = useContext(AuthContext);
    const { showing, setShowing } = useContext(CartContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <div className="navbar">
            <div className="navbar-header">
                <h1 className="navbar-title">Food Link</h1>
                <button className="navbar-toggle" onClick={toggleMenu}>
                    ☰
                </button>
            </div>
            <ul className={`navbar-list ${isMenuOpen ? 'open' : ''}`}>
                {[
                    { name: 'Home', link: '/' },
                    { name: 'About', link: '/about' },
                    { name: 'How it Works', link: '/how-it-works' },
                    { name: 'Restaurants', link: '/restaurants' },
                ].map((item, index) => (
                    <li key={index} className="navbar-item">
                        <Link
                            to={item.link}
                            className="navbar-link"
                            onClick={closeMenu}
                        >
                            {item.name}
                        </Link>
                    </li>
                ))}
                {isLoggedIn ? (
                    <>
                        <li className="navbar-item">
                            <Link
                                to={'/my-orders'}
                                className="navbar-link"
                                onClick={closeMenu}
                            >
                                My Orders
                            </Link>
                        </li>
                        <li className="navbar-item">
                            <button
                                className="navbar-button"
                                onClick={() => {
                                    setShowing(!showing);
                                    closeMenu();
                                }}
                            >
                                My Cart
                            </button>
                        </li>
                        <li className="navbar-item">
                            <button
                                className="navbar-button"
                                onClick={() => {
                                    handleLogout();
                                    closeMenu();
                                }}
                            >
                                Logout
                            </button>
                        </li>
                    </>
                ) : (
                    <li className="navbar-item">
                        <Link
                            to={'/login'}
                            className="navbar-link"
                            onClick={closeMenu}
                        >
                            Login
                        </Link>
                    </li>
                )}
            </ul>
            {showing && <CartNavbar />}
        </div>
    );
};

export default Navbar;