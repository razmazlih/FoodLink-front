import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';
import CartNavbar from '../cart/CartNavbar';
import './Navbar.css';

const Navbar = () => {
    const { isLoggedIn, handleLogout } = useContext(AuthContext);
    const { showing, setShowing } = useContext(CartContext);

    return (
        <div className="navbar">
            <h1 className="navbar-title">Food Link</h1>
            <ul className="navbar-list">
                {[
                    { name: 'Home', link: '/' },
                    { name: 'About', link: '/about' },
                    { name: 'How it Works', link: '/how-it-works' },
                    { name: 'Restaurants', link: '/restaurants' },
                    { name: 'Contact', link: '/' },
                ].map((item, index) => (
                    <li key={index} className="navbar-item">
                        <Link to={item.link} className="navbar-link">
                            {item.name}
                        </Link>
                    </li>
                ))}
                {isLoggedIn ? (
                    <>
                        <li className="navbar-item">
                            <Link to={'/my-orders'} className="navbar-link">
                                My Orders
                            </Link>
                        </li>
                        <li className="navbar-item">
                            <button
                                className="navbar-button"
                                onClick={() => setShowing(!showing)}
                            >
                                My Cart
                            </button>
                        </li>
                        <li className="navbar-item">
                            <button
                                className="navbar-button"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </li>
                    </>
                ) : (
                    <li className="navbar-item">
                        <Link to={'/login'} className="navbar-link">
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