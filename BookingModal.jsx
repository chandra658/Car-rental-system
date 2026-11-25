
function BookingModal({ car, onClose, onConfirm }) {
  if (!car) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>

        <h2>Book {car.name}</h2>
        <p>₹{car.price.toLocaleString("en-IN")} per day</p>

        <form
          onSubmit={(e) => {
            e.preventDefault();

            const startDate = e.target.startDate.value;
            const endDate = e.target.endDate.value;

            if (endDate < startDate) {
              alert("Return date must be after pickup date.");
              return;
            }

            onConfirm({
              car,
              startDate,
              endDate,
              payment: "Demo payment"
            });
          }}
        >
          <label>Pickup Date</label>
          <input type="date" name="startDate" required min={new Date().toISOString().split("T")[0]} />

          <label>Return Date</label>
          <input type="date" name="endDate" required min={new Date().toISOString().split("T")[0]} />

          <button className="confirm-btn" type="submit">
            Confirm Booking & Demo Pay
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookingModal;
