function MenuItems({ menu }) {
    const hundleClickAddToCart = (menuItem) =>
        console.log('Add to cart', menuItem.name, menuItem.id);

    const showItems = (menuItem) => (
        <li key={menuItem.id}>
            <strong>{menuItem.name}</strong> - {menuItem.price} ₪{' '}
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
