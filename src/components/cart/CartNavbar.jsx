import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import CartTemplate from './CartTemplate';
import './CartNavbar.css';
import { useNavigate } from 'react-router-dom';

function CartNavbar() {
    const { cart, setShowing, orderId } = useContext(CartContext);
    const navigate = useNavigate();

    return (
        <div className="cart-navbar">
            <h2>My Cart</h2>
            {!cart.length && (
                <p className="cart-navbar-pas">No items in the cart</p>
            )}

            <div className="cart-items">
                {cart.map((item) => (
                    <CartTemplate key={item.id} item={item} />
                ))}
            </div>
            {cart.length > 0 && (
                <button
                    onClick={() => navigate(`/my-orders/checkout/${orderId}`)}
                >
                    Checkout
                </button>
            )}
            <button onClick={() => setShowing(false)}>Close</button>
        </div>
    );
}

export default CartNavbar;
