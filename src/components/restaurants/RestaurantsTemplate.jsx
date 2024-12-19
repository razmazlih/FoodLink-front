function RestaurantsTemplate({ restaurant }) {
    function handleClick() {
        window.location.href = `/restaurants/${restaurant.id}`;
    }

    return (
        <div>
            <h3>{restaurant.name}</h3>
            <p>
                {restaurant.address}, {restaurant.city}
            </p>
            <button onClick={handleClick}>View Menu</button>
        </div>
    );
}

export default RestaurantsTemplate;
