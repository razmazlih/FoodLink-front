import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';
import CartNavbar from './CartNavbar';

function Navbar() {
    const { isLoggedIn, handleLogout } = useContext(AuthContext);
    const { showing, setShowing } = useContext(CartContext);

    const navbarList = [
        { name: 'Home', link: '/' },
        { name: 'About', link: '/about' },
        { name: 'How it Works', link: '/how-it-works' },
        { name: 'Restaurants', link: '/restaurants' },
        { name: 'Contact', link: '/' },
    ];

    const navbarLink = (item, index) => {
        return (
            <li key={index}>
                <Link to={item.link}>{item.name}</Link>
            </li>
        );
    };

    return (
        <div>
            <h1>Food Link</h1>
            <ul>
                {navbarList.map(navbarLink)}
                {isLoggedIn ? (
                    <>
                        <li>
                            <Link to={'/my-orders'}>My Orders</Link>
                        </li>
                        <li>
                            <button onClick={() => setShowing(!showing)}>
                                My Cart
                            </button>
                        </li>
                        <li>
                            <button onClick={handleLogout}>Logout</button>
                        </li>
                    </>
                ) : (
                    <li>
                        <Link to={'/login'}>Login</Link>
                    </li>
                )}
            </ul>
            {showing && <CartNavbar />}
        </div>
    );
}

export default Navbar;
