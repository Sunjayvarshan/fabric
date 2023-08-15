import { useState } from "react";
import "./../styles/login.css";
import HomeNav from "../components/HomeNav";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function loginUser(e) {
    e.preventDefault();

    const response = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await response.json();

    if (data.user) {
      localStorage.setItem("token", data.user);
      // alert("Login successful");
      setTimeout(function () {
        window.location.href = "/dashboard";
      }, 1000);
      toast.success("successfully logged-in");
    } else {
      toast.error("Invalid username or password");
    }
  }

  return (
    <>
      <div className="home-nav">
        <HomeNav />
      </div>
      <div className="login-container">
        <div className="login-box">
          <h1>Login</h1>
          <form onSubmit={loginUser}>
            <input
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
            />
            <input
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
            <button className="submit-button" type="submit">
              Login
            </button>
            <span>
              <a href="/signup">Don't have an account, create one</a>
            </span>
          </form>
        </div>
      </div>
      <Toaster />
    </>
  );
}
