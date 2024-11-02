import React, { useState } from "react";
import "./login.css";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [session, setSession] = useState(0);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Placeholder for login logic
    try {
      // Send the login request to the server
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok){
        setSession(1);
        // navigate("/open-redirection");
      }  else setSession(0);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="loginContainer">
      <h1>Welcom to login Screen</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            className="w-50px"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            className="w-50px"
            type="text"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      {session ? (
        <h1 className="loggedIn">Login Successfuly...</h1>
      ) : (
        <h1 className="loginerror">Invalid username or password</h1>
      )}
    </div>
  );
};

export default Login;
