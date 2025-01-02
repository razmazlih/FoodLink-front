import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { userCredentials } from "../../services/Userbase/api";

function Login() {
  const { handleLogin } = useContext(AuthContext); // שימוש בפונקציה מהקונטקסט
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    userCredentials({ username, password }).then((response) => {
      if (response.access) {
        handleLogin(JSON.stringify(response));
        navigate("/");
      }
      })
      .catch((error) => {
        console.error("Error login user:", error);
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSubmit}>Login</button>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;