
function LoginModal({ onClose, onLogin }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>

        <h2>Welcome to KL DriveNow</h2>
        <p>Login or create your demo account</p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onLogin(e.target.name.value.trim());
          }}
        >
          <label>Your Name</label>
          <input
            name="name"
            type="text"
            placeholder="Enter your name"
            required
          />

          <label>Email</label>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            required
          />

          <label>Password</label>
          <input
            name="password"
            type="password"
            placeholder="Enter password"
            minLength="4"
            required
          />

          <button className="confirm-btn" type="submit">
            Login / Signup
          </button>
        </form>

        <p className="demo-note">
          Demo only: this form does not provide real authentication.
        </p>
      </div>
    </div>
  );
}

export default LoginModal;
