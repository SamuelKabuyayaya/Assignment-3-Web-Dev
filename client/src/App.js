import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from "./Pages/Home/Navbar";
import Home from './Pages/Home/Homescreen';

import SignIn from "./Pages/Home/SignIn";
import SignUp from "./Pages/Home/SignUp";
import AdminProjects from "./Pages/Home/AdminProjects";
import AdminCreateProject from "./Pages/Home/AdminCreateProject";

import Qualifications from "./Pages/Home/Qualifications";
import AdminAddQualification from "./Pages/Home/AdminAddQualification";
import AdminQualifications from "./Pages/Home/AdminQualifications";
import AdminEditQualification from "./Pages/Home/AdminEditQualification";

import AdminContacts from "./Pages/Home/AdminContacts";
import AdminEditContact from "./Pages/Home/AdminEditContact";


function App() {
  return(
    <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>

          <Route path="/education" element={<Qualifications />} />

          <Route path="/admin/projects" element={<AdminProjects />} />
          <Route path="/admin/projects/create" element={<AdminCreateProject />} />

        <Route path="/admin/qualifications" element={<AdminQualifications />} />
        <Route path="/admin/qualifications/add" element={<AdminAddQualification />} />
        <Route path="/admin/qualifications/edit/:id" element={<AdminEditQualification />} />

        <Route path="/admin/contacts" element={<AdminContacts />} />
        <Route path="/admin/contacts/:contactId" element={<AdminEditContact />} />

          <Route path="*" element={<div>404 Not Found</div>}></Route>
        </Routes>
      </div>
  );
}

export default App;