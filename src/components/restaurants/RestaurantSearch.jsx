import { useState } from 'react';

function RestaurantSearch({ searchTerm, setSearchTerm }) {
    const [tempSearchTerm, setTempSearchTerm] = useState(searchTerm);

    const handleSearch = () => {
        if (tempSearchTerm.trim() === '') {
            return;
        }
        setSearchTerm(tempSearchTerm);
    };

    return (
        <div>
            <h2>Restaurant Search</h2>
            <input
                type="text"
                placeholder="Search for restaurants..."
                value={tempSearchTerm}
                onChange={(e) => setTempSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            <button onClick={() => setSearchTerm('')}>Clear</button>
        </div>
    );
}

export default RestaurantSearch;
