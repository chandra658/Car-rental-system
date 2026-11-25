
function Header({ onLogin, onBookings, user }) {
  return (
    <header className="header">
      <div className="logo">🚗 KL DriveNow</div>

      <nav className="nav">
        <a href="#home">Home</a>
        <a href="#cars">Cars</a>
        <button onClick={onBookings}>My Bookings</button>
        {user ? (
          <span className="user-name">👤 {user}</span>
        ) : (
          <button className="login-btn" onClick={onLogin}>
            Login / Signup
          </button>
        )}
      </nav>
    </header>
  );
}

export default Header;
