function OrderSummary({ totalPrice }) {
    const handleCheckout = () => {
        console.log('checkout clicked');
    };

    return (
        <div>
            <h4>Total: {totalPrice > 0 ? totalPrice : 'Loading...'}₪</h4>
            <button onClick={handleCheckout}>Checkout</button>
        </div>
    );
}

export default OrderSummary;
