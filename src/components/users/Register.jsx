import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { registerUser, userCredentials } from "../../services/Userbase/api";
import "./Register.css"; // ייבוא קובץ CSS

function Register() {
  const { handleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [streetName, setStreetName] = useState("");
  const [houseNumber, setHouseNumber] = useState("");

  const handleSubmit = () => {
    registerUser({
      username,
      password,
      phone_number: phoneNumber,
      city,
      street_name: streetName,
      house_number: houseNumber,
    })
      .then((userInfo) => {
        userCredentials({
          username: userInfo.username,
          password,
        })
          .then((accessToken) => {
            handleLogin(JSON.stringify(accessToken));
            navigate("/");
          })
          .catch((error) => {
            console.error("Error in userCredentials:", error);
            alert("Failed to save user credentials.");
          });
      })
      .catch((error) => {
        console.error("Error registering user:", error);
        alert("Error during registration. Please check your details and try again.");
      });
  };

  return (
    <div className="register-container">
      <h1 className="register-title">Register</h1>
      <div className="register-form">
        <input
          className="register-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="register-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="register-input"
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <input
          className="register-input"
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          className="register-input"
          type="text"
          placeholder="Street Name"
          value={streetName}
          onChange={(e) => setStreetName(e.target.value)}
        />
        <input
          className="register-input"
          type="text"
          placeholder="House Number"
          value={houseNumber}
          onChange={(e) => setHouseNumber(e.target.value)}
        />
        <button className="register-button" onClick={handleSubmit}>
          Register
        </button>
        <p className="register-text">
          Already have an account? <Link to="/login" className="register-link">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;