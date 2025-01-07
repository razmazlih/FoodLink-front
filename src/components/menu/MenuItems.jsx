import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';

function MenuItems({ menu }) {
    const { addToCart } = useContext(CartContext);
    const { userId } = useContext(AuthContext);

    const hundleClickAddToCart = (menuItem) => addToCart(menuItem);

    const addToUserCart = (menuItem) => userId && (
        <button onClick={() => hundleClickAddToCart(menuItem)}>
            Add to Cart
        </button>
    );

    const showItems = (menuItem) => (
        <li key={menuItem.id}>
            <strong>{menuItem.name}</strong> - {menuItem.price}₪{' '}
            {addToUserCart(menuItem)}
            <p>{menuItem.description}</p>
        </li>
    );
    return (
        <div>
            <h2>Menu</h2>
            {menu.map((category) => (
                <div key={category.id}>
                    <h3>{category.name}</h3>
                    <ul>{category.items.map(showItems)}</ul>
                </div>
            ))}
        </div>
    );
}

export default MenuItems;
