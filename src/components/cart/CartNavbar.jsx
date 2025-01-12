import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import CartTemplate from './CartTemplate';
import './CartNavbar.css';
import { useNavigate } from 'react-router-dom';

function CartNavbar() {
    const { cart, setShowing, orderId } = useContext(CartContext);
    const navigate = useNavigate();

    const hundleClickCheckout = () => {
        setShowing(false);
        navigate(`/my-orders/checkout/${orderId}`);
    };

    return (
        <div className="cart-navbar">
            <h2 className="cart-navbar-title">My Cart</h2>
            {!cart.length && (
                <p className="cart-navbar-pas">No items in the cart</p>
            )}

            <div className="cart-items-container">
                {cart.map((item) => (
                    <CartTemplate key={item.id} item={item} />
                ))}
            </div>
            {cart.length > 0 && (
                <button
                    className="cart-button"
                    onClick={() => hundleClickCheckout()}
                >
                    Checkout
                </button>
            )}
            <button className="cart-button" onClick={() => setShowing(false)}>
                Close
            </button>
        </div>
    );
}

export default CartNavbar;
