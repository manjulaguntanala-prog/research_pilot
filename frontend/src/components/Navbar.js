import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  // ✅ Check token directly
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav>
      <Link to="/">Home</Link> |{" "}

      {!token && <Link to="/login">Login</Link>}

      {token && (
        <button onClick={handleLogout}>
          Logout
        </button>
      )}
    </nav>
  );
}

export default Navbar;