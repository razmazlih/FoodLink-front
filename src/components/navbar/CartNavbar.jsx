import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

function CartNavbar() {
    const { cart } = useContext(CartContext);
    return (
        <div>
            <h2>My Cart</h2>
            {cart ? cart : <h3>Your cart is empty</h3>}
        </div>
    );
}

export default CartNavbar;
