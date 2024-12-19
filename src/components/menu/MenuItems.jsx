function MenuItems({ menu }) {
    return (
        <div>
            <h2>Menu</h2>
            {menu.map((category) => (
                <div key={category.id}>
                    <h3>{category.name}</h3>
                    <ul>
                        {category.items.map((menuItem) => (
                            <li key={menuItem.id}>
                                <strong>{menuItem.name}</strong> -{' '}
                                {menuItem.price} ₪<p>{menuItem.description}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default MenuItems;
