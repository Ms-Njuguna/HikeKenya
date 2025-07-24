import React, { useState, useContext } from "react";
import "./LoginSignup.css";
import user_icon from "../../ImageIcons/user-name-svgrepo-com.svg";
import email_icon from "../../ImageIcons/email-svgrepo-com.svg";
import password_icon from '../../ImageIcons/password-protection-privacy-access-verification-code-svgrepo-com.svg';
import { AuthContext } from "../../context/AuthContext";

const LoginSignup = () => {
  const [action, setAction] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, error, login, signup, logout } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (action === "Sign Up") {
      await signup(email, password);
    } else {
      await login(email, password);
    }
  };

  const switchTo = (mode) => {
    setAction(mode);
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline" />
      </div>

      {user ? (
        <div className="welcome">
          <p>Welcome, {user.email}!</p>
          <button onClick={logout} className="submit-action">Logout</button>
        </div>
      ) : (
        <form className="inputs" onSubmit={handleSubmit}>
          {action === "Sign Up" && (
            <div className="input-group">
              <img src={user_icon} alt="User" className="icon"/>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
          )}
          <div className="input-group">
            <img src={email_icon} alt="Email" className="icon"/>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <img src={password_icon} alt="Password" className="icon"/>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          {action === "Login" && (
            <button
              type="button"
              className="forgot-password"
              onClick={() => alert("Redirect to reset password")}
            >
              Forgot Password? Click Here
            </button>
          )}

          {error && <div className="error">{error}</div>}

          <div className="submit-container">
            <button type="submit" className="submit-action">
              {action}
            </button>
          </div>

          <div className="toggle-container">
            <button
              type="button"
              className={`submit ${action === "Sign Up" ? "gray" : ""}`}
              onClick={() => switchTo("Sign Up")}
            >
              Sign Up
            </button>
            <button
              type="button"
              className={`submit ${action === "Login" ? "gray" : ""}`}
              onClick={() => switchTo("Login")}
            >
              Login
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default LoginSignup;









