import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';

function MenuItem({ menuItem }) {
    const { userId } = useContext(AuthContext);
    const { addToCart, setShowing, checkInCart, cart } = useContext(CartContext);
    const [isInCart, setIsInCart] = useState(checkInCart(menuItem.id))

    useEffect(() => {
        setIsInCart(checkInCart(menuItem.id));
    }, [cart, checkInCart, menuItem.id]);

    const handleAddToCart = () => {
        setIsInCart(true);
        addToCart(menuItem);
        setShowing(true);
    };

    const userLogin = (
        <button onClick={() => handleAddToCart()}>Add to Cart</button>
    );

    const inCart = (
        <>added</>
    )

    const hundleIsLoginIsInCart = (
        userId ? (isInCart ? inCart : userLogin) : (<p>Please log in to add items to the cart</p>)
    )

    return (
        <li className="menu-item" key={menuItem.id}>
            <strong>{menuItem.name}</strong> - {menuItem.price}₪{' '}
            {hundleIsLoginIsInCart}
            <p>{menuItem.description}</p>
        </li>
    );
}

export default MenuItem;
