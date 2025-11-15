import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL || "http://localhost:8000";

export default function AdminEditContact() {
  const { contactId } = useParams();
  const navigate = useNavigate();

  const [contact, setContact] = useState(null);
  const [msg, setMsg] = useState("");

  const token = localStorage.getItem("jwt");

  const load = async () => {
    const res = await fetch(`${API}/api/contacts/${contactId}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    const data = await res.json();
    if (res.ok) setContact(data);
  };

  const update = async (e) => {
    e.preventDefault();

    const res = await fetch(`${API}/api/contacts/${contactId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(contact),
    });

    const data = await res.json();

    if (res.ok) setMsg("Updated successfully!");
    else setMsg(data.error);
  };

  useEffect(() => {
    load();
  }, []);

  if (!contact) return <p>Loading...</p>;

  return (
    <div className="admin-page">
      <h2>Edit Contact</h2>

      <p style={{ color: "green" }}>{msg}</p>

      <form onSubmit={update} className="auth--form">

        <label>
          First Name
          <input
            value={contact.firstname}
            onChange={(e) => setContact({ ...contact, firstname: e.target.value })}
          />
        </label>

        <label>
          Last Name
          <input
            value={contact.lastname}
            onChange={(e) => setContact({ ...contact, lastname: e.target.value })}
          />
        </label>

        <label>
          Email
          <input
            value={contact.email}
            onChange={(e) => setContact({ ...contact, email: e.target.value })}
          />
        </label>

        <label>
          Message
          <textarea
            rows="6"
            value={contact.message}
            onChange={(e) => setContact({ ...contact, message: e.target.value })}
          />
        </label>

        <button className="btn btn-primary">Save</button>
      </form>

      <button
        className="btn btn-secondary"
        style={{ marginTop: "20px" }}
        onClick={() => navigate("/admin/contacts")}
      >
        Back
      </button>
    </div>
  );
}
