import React, { useState } from "react";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5173/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    res.ok ? alert("User created!") : alert(data.error);
  };

  return (
    <section className="contact--section">
      <h2>Sign Up</h2>

      <form className="contact--form--container" onSubmit={handleSubmit}>
        <label className="contact--label">
          Name
          <input 
            type="text" 
            className="contact--input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required 
          />
        </label>

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

        <button className="btn btn-primary contact--form--btn">Sign Up</button>
      </form>
    </section>
  );
}
