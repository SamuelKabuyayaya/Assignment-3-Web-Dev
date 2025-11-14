import React, { useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5173/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      alert("Signed in!");
    } else {
      alert(data.error || "Login failed");
    }
  };

  return (
    <section className="contact--section">
      <h2>Sign In</h2>

      <form className="contact--form--container" onSubmit={handleSubmit}>
        <label className="contact--label">
          Email
          <input 
            type="email" 
            className="contact--input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </label>

        <label className="contact--label">
          Password
          <input 
            type="password"
            className="contact--input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </label>

        <button className="btn btn-primary contact--form--btn">Sign In</button>
      </form>
    </section>
  );
}
