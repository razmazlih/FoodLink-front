function RestaurantInfo({ restaurant }) {
  return (
    <div>
            <h2>{restaurant.name}</h2>
            <h3>
                {restaurant.address}, {restaurant.city}
            </h3>
        </div>
  )
}

export default RestaurantInfo
