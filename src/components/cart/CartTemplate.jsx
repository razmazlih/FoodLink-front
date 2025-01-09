import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import './CartTemplate.css';
import { getMenuItemNameById } from '../../services/DishBoard/menu/api';

function CartTemplate({ item }) {
    const { removeFromCart, updateQuantity } = useContext(CartContext);

    const [showItem, setShowItem] = useState({
        itemId: item.id,
        price: Number(item.price),
        quantity: item.quantity,
        name: localStorage.getItem(`menuItem-${item.id}`) || 'Loading...',
    });

    useEffect(() => {
        let isMounted = true;
        if (showItem.name === 'Loading...') {
            getMenuItemNameById(item.menu_item_id)
                .then((response) => {
                    if (isMounted) {
                        setShowItem((prev) => ({
                            ...prev,
                            name: response,
                        }));
                        localStorage.setItem(`menuItem-${item.id}`, response);
                    }
                })
                .catch((error) => {
                    console.error('Error fetching menu item name:', error);
                });
        }
        return () => {
            isMounted = false;
        };
    }, [item.id, item.menu_item_id, showItem.name]);

    const hundleClickAdd = () => {
        const updatedItem = updateQuantity(item.id, item.quantity + 1);
        setShowItem((prev) => ({
            ...prev,
            quantity: updatedItem.quantity,
        }));
    };

    if (!item) {
        return <div>Item not available</div>;
    }

    return (
        <div className="cart-item">
            <strong>{showItem.name}</strong>
            <span>
                {showItem.price}₪{' '}
                {showItem.quantity > 1 && ` x ${showItem.quantity}`}
            </span>
            <button onClick={() => hundleClickAdd()}>+</button>
            <button onClick={() => removeFromCart(showItem.id)}>Remove</button>
        </div>
    );
}

export default CartTemplate;
