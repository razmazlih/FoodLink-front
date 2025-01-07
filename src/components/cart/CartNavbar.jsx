import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import CartTemplate from './CartTemplate';

function CartNavbar() {
    let { cart, clearCart } = useContext(CartContext);

    const mapCart = (
        <div>
            {cart.map((item) => (
                <CartTemplate key={item.id} item={item} />
            ))}
        </div>
    )

    const resetCart = (
        <button onClick={() => {clearCart()}}>Reset Cart</button>
    )


    return (
        <div>
            <h2>My Cart</h2>
            {resetCart}
            {mapCart}
        </div>
    );
}

export default CartNavbar;
