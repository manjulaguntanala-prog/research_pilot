import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");  
    }
  }, [navigate]);

  return (
    <div>
      <h2>Welcome to Home Page</h2>
      <p>You are logged in successfully.</p>
    </div>
  );
}

export default Home;