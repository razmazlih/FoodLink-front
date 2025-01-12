import { useNavigate, useParams } from 'react-router-dom';
import { updateCartStatus } from '../../services/OrderLine/status/api';
import { CartContext } from '../../context/CartContext';
import { useContext } from 'react';

function OrderSummary({ totalPrice, myOrder }) {
    const { orderId } = useParams();
    const { updateCart } = useContext(CartContext);
    const navigate = useNavigate();

    const handleCheckout = () => {
        updateCartStatus(orderId, 'active')
            .then(() => {
                updateCart([], '');
                navigate('/my-orders');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const hundleContinueCart = (inNavigate) => {
        updateCart(myOrder.items, myOrder.id);
        navigate(inNavigate);
    };

    return (
        <div className="order-checkout-summary-container">
            <h4 className="order-checkout-summary-total">
                Total: {totalPrice > 0 ? totalPrice : 'Loading...'}₪
            </h4>
            <button
                className="order-checkout-button-checkout"
                onClick={handleCheckout}
            >
                Checkout
            </button>
            <button
                className="order-checkout-button-continue"
                onClick={() =>
                    hundleContinueCart(`/restaurants/${myOrder.restaurantId}`)
                }
            >
                Continue Ordering
            </button>
        </div>
    );
}

export default OrderSummary;
