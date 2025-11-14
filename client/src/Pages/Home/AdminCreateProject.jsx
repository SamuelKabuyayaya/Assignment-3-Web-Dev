import React from "react";
import ProjectForm from "./ProjectForm";

const API = process.env.REACT_APP_API_URL || "http://localhost:8000";


export default function AdminCreateProject() {

  const handleCreate = async (projectData) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API}/api/projects`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(projectData)
    });

    const data = await res.json();

    if (res.ok) {
      alert("Project created!");
    } else {
      alert(data.error);
    }
  };

  return <ProjectForm onSubmit={handleCreate} />;
}
