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
        name:
            JSON.parse(localStorage.getItem('cartNames'))?.[item.id] ||
            'Loading...',
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
                        const cartNames =
                            JSON.parse(localStorage.getItem('cartNames')) || {};
                        cartNames[item.id] = response;
                        localStorage.setItem(
                            'cartNames',
                            JSON.stringify(cartNames)
                        );
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

    const hundleClickAdd = async () => {
        const updatedItem = await updateQuantity(item.id, item.quantity + 1);
        setShowItem((prev) => ({
            ...prev,
            quantity: updatedItem.quantity,
        }));
    };

    const hundleClickRemove = async () => {
        const newItem = await removeFromCart(item);
        setShowItem((prev) => ({
            ...prev,
            quantity: newItem.quantity,
        }));
    };

    if (!item) {
        return <div>Item not available</div>;
    }

    return (
        <div className="cart-item">
            <div>
            <strong
                className="cart-item-strong">{showItem.name}</strong>
            <span
                className="cart-item-span">
                {showItem.price}₪{' '}
                {showItem.quantity > 1 && ` x ${showItem.quantity}`}
            </span>
            </div>
            <div>
            <button 
            className="cart-item-button"
            onClick={() => hundleClickAdd()}>+</button>
            <button 
            className="cart-item-button"
            onClick={() => hundleClickRemove()}>-</button>
            </div>
        </div>
    );
}

export default CartTemplate;
