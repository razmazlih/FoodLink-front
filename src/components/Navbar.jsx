import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
    const { isLoggedIn, handleLogout } = useContext(AuthContext);

    const navbarList = [
        { name: 'Home', link: '/' },
        { name: 'About', link: '/' },
        { name: 'How it Works', link: '/' },
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
                    <li>
                        <button onClick={handleLogout}>Logout</button>
                    </li>
                ) : (
                    <li>
                        <Link to={'/login'}>Login</Link>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default Navbar;
