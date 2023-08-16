import { useState } from "react";
import "./../styles/signup.css";
import HomeNav from "../components/HomeNav";
import toast, { Toaster } from "react-hot-toast";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function registerUser(e) {
    e.preventDefault();

    const response = await fetch("http://localhost:8000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await response.json();

    if (data.status === "ok") {
      setTimeout(function () {
        window.location.href = "/login";
      }, 1000);
      toast.success("user successfully created");
    } else {
      toast.error("error creating user");
    }
  }

  return (
    <>
      <div>
        <HomeNav />
      </div>
      <div className="register-container">
        <div className="register-box">
          <h1>Register</h1>
          <form onSubmit={registerUser}>
            <input
              className="input-field"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Name"
            />
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
              Register
            </button>
            <span>
              <a href="/login">Go back to login page </a>
            </span>
          </form>
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default Signup;
