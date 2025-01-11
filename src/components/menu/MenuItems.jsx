import MenuItem from './MenuItem';
import './MenuItems.css';

function MenuItems({ menu }) {
    return (
        <div className="menu-items-container">
            <h2 className="menu-title">Menu</h2>
            {menu.map((category) => (
                <div key={category.id} className="category-container">
                    <h3 className="category-title">{category.name}</h3>
                    <ul className="menu-item-list">
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