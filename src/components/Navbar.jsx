import { useEffect, useState } from 'react';

function Navbar() {
    const [myList, setMyList] = useState([]);

    useEffect(() => {
        setMyList([
            { name: 'Home', link: '/' },
            { name: 'About', link: '/' },
            { name: 'How it Works', link: '/' },
            { name: 'Restaurants', link: '/' },
            { name: 'Contact', link: '/' },
        ]);
    }, []);

    const navbarLink = (item, index) => {
        return (
            <li key={index}>
                <a href={item.link}>{item.name}</a>
            </li>
        );
    };

    return (
        <div>
            <h1>Food Link</h1>
            {myList.map(navbarLink)}
        </div>
    );
}

export default Navbar;
