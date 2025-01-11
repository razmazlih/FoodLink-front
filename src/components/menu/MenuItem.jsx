import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';

function MenuItem({ menuItem }) {
    const { userId } = useContext(AuthContext);
    const { addToCart, setShowing, checkInCart, cart } =
        useContext(CartContext);
    const [isInCart, setIsInCart] = useState(checkInCart(menuItem.id));

    useEffect(() => {
        setIsInCart(checkInCart(menuItem.id));
    }, [cart, checkInCart, menuItem.id]);

    const handleAddToCart = () => {
        setIsInCart(true);
        addToCart(menuItem);
    };

    const userLogin = (
        <button onClick={() => handleAddToCart()} className="add-to-cart-btn">
            Add to Cart
        </button>
    );

    const inCart = <span className="added-to-cart" onClick={() => setShowing(true)}>Added</span>;

    const hundleIsLoginIsInCart = userId ? (
        isInCart ? (
            inCart
        ) : (
            userLogin
        )
    ) : (
        <p className="login-prompt">Please log in to add items to the cart</p>
    );

    return (
        <li className="menu-item" key={menuItem.id}>
            <div className="menu-item-header">
                <strong>{menuItem.name}</strong> -{' '}
                <span className="price">{menuItem.price}₪</span>
            </div>
            <p className="menu-item-description">{menuItem.description}</p>
            {hundleIsLoginIsInCart}
        </li>
    );
}

export default MenuItem;
