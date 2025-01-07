import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

function MenuItems({ menu }) {
    const { addToCart } = useContext(CartContext);
    const hundleClickAddToCart = (menuItem) =>
        addToCart(menuItem)

    const showItems = (menuItem) => (
        <li key={menuItem.id}>
            <strong>{menuItem.name}</strong> - {menuItem.price}₪{' '}
            <button onClick={() => hundleClickAddToCart(menuItem)}>
                Add to Cart
            </button>
            <p>{menuItem.description}</p>
        </li>
    );
    return (
        <div>
            <h2>Menu</h2>
            {menu.map((category) => (
                <div key={category.id}>
                    <h3>{category.name}</h3>
                    <ul>{category.items.map(showItems)}</ul>
                </div>
            ))}
        </div>
    );
}

export default MenuItems;
