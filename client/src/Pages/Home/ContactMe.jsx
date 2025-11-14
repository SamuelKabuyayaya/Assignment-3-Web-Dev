//This displays the "Contact Me" section with a for for user input
import { useState } from "react";
import { createContact } from "../../contact-api";

export default function ContactMe(){

    const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    topic: "",
    message: "",
  });

    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

      const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    const token = localStorage.getItem("jwtToken");

    if (!token) {
      setError("You must be signed in to submit the form.");
      return;
    }

    const response = await createContact(token, formData);

    if (response.error) {
      setError(response.error);
    } else {
      setSuccess("Message sent successfully!");
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        topic: "",
        message: "",
      });
    }
  };


    return (
        //section container with id for easy css styling and navigation
        <section id="Contact" className="contact--section">

            {/*Heading and subtitle*/}
            <div>
                <h2 className="contact--section--heading">Contact Me</h2>
                <p className="contact--sub--title">What do you need help with?</p>
            </div>

            {/*Form container*/}
            <form className="contact--form--container">

                {/*Name, email and phone number*/}
                <div className="contact--container">
                    <label className="contact--label">
                        <span className="text-md">First Name</span>
                        <input 
                        type="text"
                        className="contact--input text-md"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                        required
                        />
                    </label>
                    <label className="contact--label">
                        <span className="text-md">Last Name</span>
                        <input 
                        type="text"
                        className="contact--input text-md"
                        name="lastname"
                       value={formData.lastname}
                       onChange={handleChange}
                       required
                        />
                    </label>
                    <label className="contact--label">
                        <span className="text-md">Email</span>
                        <input 
                        type="email"
                        className="contact--input text-md"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        />
                    </label>
                    <label className="contact--label">
                        <span className="text-md">Phone Number</span>
                        <input 
                        type="number"
                        className="contact--input text-md"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        />
                    </label>
                </div>

                {/*Dropdown for choosing a topic*/}
                <label className="contact--label">
                        <span className="text-md">Choose Topic</span>
                        <select 
                            name="topic"
                            value={formData.topic}
                            onChange={handleChange}
                            className="contact--input text-md"
                            required
                        >
                            <option value="">Select One...</option>
                            <option value="Basic Programming Projects">Basic Programming Projects</option>
                            <option value="Web Development Basics">Web Development Basics</option>
                            <option value="3D modelling in Blender">3D modelling in Blender</option>
                        </select>
                    </label>
                    
                    {/*Message input*/}
                    <label className="contact--label">
                        <span className="text-md">Message</span>
                        <textarea 
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="8"
                        placeholder="Type your message here..."
                        required
                        />
                    </label>

                    {/*Checkbox for terms acceptance*/}
                    <label className="checkbox--label">
                        <input type="checkbox" required />
                        <span className="text-sm">I accept the terms</span>
                    </label>
                    <div>
                        <button className="btn btn-primary contact--form--btn">Submit</button>
                    </div>
            </form>
        </section>
    )
}