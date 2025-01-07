import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import './CartTemplate.css';

function CartTemplate({ item }) {
    const { removeFromCart } = useContext(CartContext);

    if (!item) {
        return <div>Item not available</div>;
    }

    return (
        <div className="cart-item">
            <strong>{item.name}</strong>
            <span>{item.price}₪{item.count && ` x ${item.count}`}</span>
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
    );
}

export default CartTemplate;