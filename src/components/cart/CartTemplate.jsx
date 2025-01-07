import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

function CartTemplate({ item }) {
    const { removeFromCart } = useContext(CartContext);
    if (!item) {
        return <div>פריט לא זמין</div>;
    }
    return (
        <div>
            <strong>{item.name}</strong> - {item.price}₪{' '}
            {item.count && <span> x {item.count}</span>}
            <button onClick={() => removeFromCart(item.id)}>
                remove from cart
            </button>
        </div>
    );
}

export default CartTemplate;
