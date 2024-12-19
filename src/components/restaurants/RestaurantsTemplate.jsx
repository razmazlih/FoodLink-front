function RestaurantsTemplate({ restaurant }) {
  return (
    <div>
      <h3>{restaurant.name}</h3>
      <p>{restaurant.city} - {restaurant.address}</p>
    </div>
  )
}

export default RestaurantsTemplate
