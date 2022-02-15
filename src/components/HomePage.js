import React from "react";
import TopNavBar from "./TopNavBar";
import logo from "../images/M-t-n.png";

export default function HomePage() {
  return (
    <>
      <TopNavBar />
      <div className="container-fluid d-flex justify-content-center">
        <div className="d-flex">
          <img src={logo} alt="mainlogo" />
        </div>
      </div>
    </>
  );
}
