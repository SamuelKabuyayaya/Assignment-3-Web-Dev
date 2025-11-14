import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  
  title:{
    type: String,
    trim: true,
    required: "Title is required",
  },
  
  src:{
    type: String,
    trim: true,
    required: "Image path is required",
  },   

  githubLink:{
    type: String,
    trim: true,
    required: "GitHub link is required",
  },

  description:{
    type: String,
    trim: true,
    required: "Description is required"
  },
});

export default mongoose.model("Project", ProjectSchema);

