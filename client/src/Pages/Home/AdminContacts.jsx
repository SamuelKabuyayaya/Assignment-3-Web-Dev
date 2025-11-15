import React, { useEffect, useState } from "react";

const API = process.env.REACT_APP_API_URL || "http://localhost:8000";

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState("");

  const token = localStorage.getItem("jwt");

  const fetchContacts = async () => {
    const res = await fetch(`${API}/api/contacts`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    const data = await res.json();
    if (res.ok) setContacts(data);
    else setError(data.error);
  };

  const deleteContact = async (id) => {
    if (!window.confirm("Delete this contact?")) return;

    const res = await fetch(`${API}/api/contacts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    const data = await res.json();
    if (res.ok) fetchContacts();
    else alert(data.error);
  };

  const deleteAll = async () => {
    if (!window.confirm("DELETE ALL CONTACTS?")) return;

    const res = await fetch(`${API}/api/contacts`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    const data = await res.json();
    if (res.ok) fetchContacts();
    else alert(data.error);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="admin-page">
      <h2>Admin: All Contacts</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button className="btn btn-danger" onClick={deleteAll} style={{ marginBottom: "20px" }}>
        Delete ALL Contacts
      </button>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Topic</th>
            <th>Message</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {contacts.map((c) => (
            <tr key={c._id}>
              <td>{c.firstname} {c.lastname}</td>
              <td>{c.email}</td>
              <td>{c.topic}</td>
              <td>{c.message}</td>

              <td>
                <a href={`/admin/contacts/${c._id}`} className="btn btn-secondary">
                  View / Edit
                </a>

                <button
                  className="btn btn-danger"
                  onClick={() => deleteContact(c._id)}
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}
