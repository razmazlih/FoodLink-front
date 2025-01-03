import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

function CartNavbar() {
    let { cart } = useContext(CartContext);
    return (
        <div>
            <h2>My Cart</h2>
            {cart.length ? <h2>{cart}</h2> : <h3>cart is empty</h3>}
        </div>
    );
}

export default CartNavbar;
