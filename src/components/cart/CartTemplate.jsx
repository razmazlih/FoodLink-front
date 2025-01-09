import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import './CartTemplate.css';
import { getMenuItemNameById } from '../../services/DishBoard/menu/api';

function CartTemplate({ item }) {
    const { removeFromCart } = useContext(CartContext);

    const [showItem, setShowItem] = useState({
        id: item.id,
        price: item.price,
        quantity: item.quantity,
        name: localStorage.getItem(`menuItem-${item.id}`) || ''
    });

    useEffect(() => {
        let isMounted = true;
        getMenuItemNameById(item.id).then((response) => {
            if (isMounted) {
                setShowItem((prev) => ({
                    ...prev,
                    name: response,
                }));
                localStorage.setItem(`menuItem-${item.id}`, JSON.stringify(response));
            }
        }).catch((error) => {
            console.error("Error fetching menu item name:", error);
        });
        return () => {
            isMounted = false;
        };
    }, [item.id]);

    if (!item) {
        return <div>Item not available</div>;
    }

    return (
        <div className="cart-item">
            <strong>{showItem.name || 'Loading...'}</strong>
            <span>{showItem.price}₪ {item.quantity > 1 && ` x ${showItem.quantity}`}</span>
            <button onClick={() => removeFromCart(showItem.id)}>Remove</button>
        </div>
    );
}

export default CartTemplate;