import { useState } from 'react';
import './RestaurantSearch.css';

function RestaurantSearch({ searchTerm, setSearchTerm }) {
    const [tempSearchTerm, setTempSearchTerm] = useState(searchTerm);

    const handleSearch = () => {
        if (tempSearchTerm.trim() === '') {
            return;
        }
        setSearchTerm(tempSearchTerm);
    };

    return (
        <div className="restaurant-search">
            <h2>Restaurant Search</h2>
            <input
                type="text"
                placeholder="Search for restaurants..."
                value={tempSearchTerm}
                onChange={(e) => setTempSearchTerm(e.target.value)}
            />
            <div className="buttons">
                <button className="search" onClick={handleSearch}>
                    Search
                </button>
                <button className="clear" onClick={() => setSearchTerm('')}>
                    Reset
                </button>
            </div>
        </div>
    );
}

export default RestaurantSearch;
