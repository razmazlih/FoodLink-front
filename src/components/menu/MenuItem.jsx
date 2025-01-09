import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';

function MenuItem({ menuItem }) {
    const { userId } = useContext(AuthContext);
    const { addToCart } = useContext(CartContext);

    return (
        <li className="menu-item" key={menuItem.id}>
            <strong>{menuItem.name}</strong> - {menuItem.price}₪{' '}
            {userId && (
                <button onClick={() => addToCart(menuItem)}>
                    Add to Cart
                </button>
            )}
            <p>{menuItem.description}</p>
        </li>
    );
}

export default MenuItem;
