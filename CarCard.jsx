
function CarCard({ car, onBook }) {
  return (
    <div className="car-card">
      <img src={car.image} alt={car.name} className="car-image" />

      <div className="car-info">
        <div className="car-heading">
          <h3>{car.name}</h3>
          <span className="category">{car.category}</span>
        </div>

        <p className="car-description">{car.description}</p>

        <div className="car-details">
          <span>👥 {car.seats} Seats</span>
          <span>⛽ {car.fuel}</span>
          <span>⚙️ {car.transmission}</span>
        </div>

        <div className="car-bottom">
          <div className="price">
            ₹{car.price.toLocaleString("en-IN")}
            <small>/day</small>
          </div>

          <button onClick={() => onBook(car)}>
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default CarCard;
