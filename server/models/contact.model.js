import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  firstname: {
    type: String,
    trim: true,
    required: "Name is required",
  },

  lastname: {
    type: String,
    trim: true,
    required: "Last name is required",
  },

  email: {
    type: String,
    trim: true,
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
    required: "Email is required",
  },
   
  phone: {
    type: String,
    trim: true
  },

  topic: {
    type: String,
    trim: true
  },

  message: {
    type: String,
    trim: true
  },

  created: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model("Contact", ContactSchema);

