import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProjectForm from "./ProjectForm";

const API = process.env.REACT_APP_API_URL|| "http://localhost:8000";

export default function AdminEditProject() {
  const { id } = useParams();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API}/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setInitialData(data);
    };

    fetchProject();
  }, [id]);

  const handleUpdate = async (projectData) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API}/api/projects/${id}`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(projectData)
    });

    const data = await res.json();

    if (res.ok) {
      alert("Project updated!");
    } else {
      alert(data.error);
    }
  };

  return initialData ? (
    <ProjectForm onSubmit={handleUpdate} initialData={initialData} />
  ) : (
    <p>Loading...</p>
  );
}
