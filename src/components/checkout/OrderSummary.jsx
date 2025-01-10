import { useNavigate, useParams } from 'react-router-dom';
import { updateCartStatus } from '../../services/OrderLine/status/api';
import { CartContext } from '../../context/CartContext';
import { useContext } from 'react';

function OrderSummary({ totalPrice }) {
    const { orderId } = useParams();
    const { updateCart } = useContext(CartContext);
    const navigate = useNavigate();

    const handleCheckout = () => {
        updateCartStatus(orderId)
            .then(() => {
                updateCart([], '');
                navigate('/my-orders');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="order-checkout-summary-container">
            <h4 className="order-checkout-summary-total">
                Total: {totalPrice > 0 ? totalPrice : 'Loading...'}₪
            </h4>
            <button
                className="order-checkout-summary-button"
                onClick={handleCheckout}
            >
                Checkout
            </button>
        </div>
    );
}

export default OrderSummary;
