import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import MenuItem from './MenuItem';
import './MenuItems.css';
import { AuthContext } from '../../context/AuthContext';

function MenuItems({ menu }) {
    const { userId } = useContext(AuthContext);
    const { cart, showing, setShowing } = useContext(CartContext);
    const [showCheckout, setShowCheckout] = useState(false);

    useEffect(() => {
        if (cart.length > 0 && showing === false && userId) {
            setShowCheckout(true);
        } else {
            setShowCheckout(false);
        }
    }, [cart, showing, userId]);
    const hundleClickCheckout = () => {
        setShowing(true);
    };

    return (
        <div className="menu-items-container">
            <h2 className="menu-title">Menu</h2>
            {menu.map((category) => (
                <div key={category.id} className="category-container">
                    <h3 className="category-title">{category.name}</h3>
                    <ul className="menu-item-list">
                        {category.items.map((menuItem) => (
                            <MenuItem key={menuItem.id} menuItem={menuItem} />
                        ))}
                    </ul>
                </div>
            ))}
            {showCheckout ? (
                <button
                    className="menu-checkout-button"
                    onClick={() => hundleClickCheckout()}
                >
                    Checkout <span className="cart-count">{cart.length}</span>
                </button>
            ) : (
                <div class="menu-checkout-placeholder"></div>
            )}
        </div>
    );
}

export default MenuItems;
