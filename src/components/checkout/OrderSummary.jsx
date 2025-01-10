import { useNavigate, useParams } from "react-router-dom";
import { updateCartStatus } from "../../services/OrderLine/status/api";

function OrderSummary({ totalPrice }) {
    const { orderId } = useParams();
    const navigate = useNavigate();

    const handleCheckout = () => {
        updateCartStatus(orderId)
        navigate('/my-orders')
    };

    return (
        <div>
            <h4>Total: {totalPrice > 0 ? totalPrice : 'Loading...'}₪</h4>
            <button onClick={handleCheckout}>Checkout</button>
        </div>
    );
}

export default OrderSummary;
