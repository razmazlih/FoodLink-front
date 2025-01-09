import MenuItem from './MenuItem';
import './MenuItems.css';

function MenuItems({ menu }) {
    return (
        <div className="menu-items">
            <h2>Menu</h2>
            {menu.map((category) => (
                <div key={category.id}>
                    <h3>{category.name}</h3>
                    <ul>
                        {category.items.map((menuItem) => (
                            <MenuItem key={menuItem.id} menuItem={menuItem} />
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default MenuItems;
