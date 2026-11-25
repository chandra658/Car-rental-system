
function Bookings({ bookings, onClose, onCancel }) {
  return (
    <div className="modal-overlay">
      <div className="modal bookings-modal">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>

        <h2>My Bookings</h2>

        {bookings.length === 0 ? (
          <p>No bookings yet. Book a car to see it here!</p>
        ) : (
          bookings.map((booking) => (
            <div className="booking-item" key={booking.id}>
              <img src={booking.car.image} alt={booking.car.name} />

              <div className="booking-info">
                <h3>{booking.car.name}</h3>
                <p>Pickup: {booking.startDate}</p>
                <p>Return: {booking.endDate}</p>
                <p>Days: {booking.days}</p>
                <p>
                  Total: ₹
                  {booking.total.toLocaleString("en-IN")}
                </p>
                <p className="payment-status">
                  {booking.paymentStatus}
                </p>

                <button
                  className="cancel-btn"
                  onClick={() => onCancel(booking.id)}
                >
                  Cancel Booking
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Bookings;
