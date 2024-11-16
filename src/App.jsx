import { Route, Routes } from "react-router-dom";
import "./App.css";
import AddContact from "./components/AddContact";
import Home from "./components/Home";
import EditContact from "./components/EditContact";
import { useState } from "react";

function App() {

  const [editContactDetails,setEditContactDetails] = useState([])
  return (
    <>
      <Routes>
        <Route path="/" element={<Home setEditContactDetails={setEditContactDetails} />} />
        <Route path="/add" element={<AddContact />} />
        <Route path="/:id/edit" element={<EditContact editContactDetails={editContactDetails} />} />
      </Routes>
    </>
  );
}

export default App;
