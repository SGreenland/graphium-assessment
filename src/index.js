import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap";
import "./index.css";
import SignUpForm from "./components/SignUpForm";
import FindTeacher from "./components/FindTeacher";
import Data from "./components/Data";
import HomePage from "./components/HomePage";

ReactDOM.render(
  <Router>
    <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route exact path="/join" element={<SignUpForm />} />
      <Route exact path="/find" element={<FindTeacher />} />
      <Route exact path="/data" element={<Data />} />
    </Routes>
  </Router>,
  document.getElementById("root")
);
