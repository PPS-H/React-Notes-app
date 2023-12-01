import React, { useState } from "react";
import Navbar from "./componenets/Navbar";
import Home from "./componenets/Home";
import About from "./componenets/About";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NoteState from "./context/notesState";
import Login from "./componenets/Login";
import Signup from "./componenets/Signup";
import Alert from "./componenets/Alert";
import AlertContext from "./context/alertContext";

export default function App() {
  const [alert, setAlert] = useState({ msg: "", type: "" });
  const showAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => {
      setAlert({ msg: "", type: "" });
    }, 1500);
  };
  return (
    <>
      <AlertContext.Provider value={{ showAlert }}>
        <NoteState>
          <Router>
            <Navbar />
          <Alert msg={alert.msg} type={alert.type} />
            <Routes>
              <Route exact path="/" element={<Home />}></Route>
              <Route exact path="/about" element={<About />}></Route>
              <Route exact path="/login" element={<Login />}></Route>
              <Route exact path="/signup" element={<Signup />}></Route>
            </Routes>
          </Router>
        </NoteState>
      </AlertContext.Provider>
    </>
  );
}
