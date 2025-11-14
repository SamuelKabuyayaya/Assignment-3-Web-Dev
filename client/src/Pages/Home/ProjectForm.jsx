import React, { useEffect, useState } from "react";

export default function ProjectForm({ initialData = null, onSubmit, }) {
  const [form, setForm] = useState({
    title: "",
    src: "",
    githubLink: "",
    description: "",
  });

    useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        src: initialData.src || "",
        githubLink: initialData.githubLink || "",
        description: initialData.description || "",
      });
    }
  }, [initialData]);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <section className="contact--section">
      <h2>{initialData ? "Edit Project" : "Add New Project"}</h2>

      <form className="contact--form--container" onSubmit={handleSubmit}>

        <label className="contact--label">
          <span className="text-md">Project Title</span>
          <input
            type="text"
            className="contact--input"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </label>

        <label className="contact--label">
          <span className="text-md">Image Path</span>
          <input
            type="text"
            className="contact--input"
            value={form.src}
            onChange={handleChange}
            placeholder="/img/Project1.png"
            required
          />
        </label>

        <label className="contact--label">
          <span className="text-md">GitHub Link</span>
          <input
            type="url"
            className="contact--input"
             name="githubLink"
            value={form.githubLink}
            onChange={handleChange}
            required
          />
        </label>

        <label className="contact--label">
          <span className="text-md">Description</span>
          <textarea
            className="contact--input"
            rows="5"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          />
        </label>

        <button className="btn btn-primary">Save</button>
      </form>
    </section>
  );
}
