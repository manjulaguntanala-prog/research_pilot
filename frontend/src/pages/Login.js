import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/auth/login",
        {
          username: username,
          password: password,
        }
      );

      // ✅ Store token in localStorage
      localStorage.setItem("token", res.data.access_token);

      alert("Login successful");

      // ✅ Redirect to Home page
      navigate("/");

    } catch (error) {
      console.error(error);
      alert("Invalid username or password");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;