import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import CartTemplate from './CartTemplate';
import './CartNavbar.css';

function CartNavbar() {
    const { cart, clearCart, setShowing } = useContext(CartContext);

    return (
        <div className="cart-navbar">
            <h2>My Cart</h2>
            {cart.length ? (
                <button onClick={clearCart}>Reset Cart</button>
            ) : (
                <>
                <br/>
                <br/>
                <p className='cart-navbar'>No items in the cart</p>
                </>
            )}
            
            <div className="cart-items">
                {cart.map((item) => (
                    <CartTemplate key={item.id} item={item} />
                ))}
            </div>
            <button onClick={() => setShowing(false)}>Close</button>
        </div>
    );
}

export default CartNavbar;
