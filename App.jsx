
import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import CarCard from "./components/CarCard";
import BookingModal from "./components/BookingModal";
import LoginModal from "./components/LoginModal";
import Bookings from "./components/Bookings";
import { cars } from "./data/cars";
import "./App.css";

function App() {
  const [user, setUser] = useState(() =>
    localStorage.getItem("kl_user") || ""
  );

  const [selectedCar, setSelectedCar] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showBookings, setShowBookings] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [bookings, setBookings] = useState(() =>
    JSON.parse(localStorage.getItem("kl_bookings") || "[]")
  );

  function saveBookings(updated) {
    setBookings(updated);
    localStorage.setItem("kl_bookings", JSON.stringify(updated));
  }

  function login(name) {
    setUser(name);
    localStorage.setItem("kl_user", name);
    setShowLogin(false);
  }

  function confirmBooking({ car, startDate, endDate }) {
    if (!user) {
      alert("Please login before booking.");
      setSelectedCar(null);
      setShowLogin(true);
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.max(
      1,
      Math.ceil((end - start) / (1000 * 60 * 60 * 24))
    );

    const booking = {
      id: Date.now(),
      user,
      car,
      startDate,
      endDate,
      days,
      total: days * car.price,
      paymentStatus: "Demo Payment - Simulated"
    };

    saveBookings([...bookings, booking]);
    setSelectedCar(null);

    alert(
      `Booking successful!\nCar: ${car.name}\nTotal: ₹${booking.total.toLocaleString("en-IN")}\nDemo payment completed.`
    );
  }

  function cancelBooking(id) {
    const updated = bookings.filter((booking) => booking.id !== id);
    saveBookings(updated);
  }

  const filteredCars = cars.filter((car) => {
    const matchesSearch = car.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || car.category === category;

    return matchesSearch && matchesCategory;
  });

  const myBookings = bookings.filter(
    (booking) => booking.user === user
  );

  return (
    <>
      <Header
        user={user}
        onLogin={() => setShowLogin(true)}
        onBookings={() => {
          if (!user) {
            alert("Please login to see your bookings.");
            setShowLogin(true);
          } else {
            setShowBookings(true);
          }
        }}
      />

      <Hero />

      <section className="cars-section" id="cars">
        <div className="section-heading">
          <h2>Explore Our Cars</h2>
          <p>Choose the perfect vehicle for your journey.</p>
        </div>

        <div className="filters">
          <input
            type="text"
            placeholder="Search car name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Luxury">Luxury</option>
            <option value="SUV">SUV</option>
            <option value="Sedan">Sedan</option>
            <option value="Hatchback">Hatchback</option>
          </select>
        </div>

        <div className="car-grid">
          {filteredCars.length === 0 ? (
            <p>No cars found.</p>
          ) : (
            filteredCars.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                onBook={(car) => {
                  if (!user) {
                    alert("Please login first to book a car.");
                    setShowLogin(true);
                  } else {
                    setSelectedCar(car);
                  }
                }}
              />
            ))
          )}
        </div>
      </section>

      <footer className="footer">
        <h3>🚗 KL DriveNow</h3>
        <p>Drive your journey. Discover your freedom.</p>
        <p>© 2026 KL DriveNow Car Rental System</p>
      </footer>

      {selectedCar && (
        <BookingModal
          car={selectedCar}
          onClose={() => setSelectedCar(null)}
          onConfirm={confirmBooking}
        />
      )}

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onLogin={login}
        />
      )}

      {showBookings && (
        <Bookings
          bookings={myBookings}
          onClose={() => setShowBookings(false)}
          onCancel={cancelBooking}
        />
      )}
    </>
  );
}

export default App;
