import React, { useState } from "react";
import InstrGraph from "./InstrGraph";
import LocatGraph from "./LocatGraph";
import TopNavBar from "./TopNavBar";
import AvPriceGraph from "./AvPriceGraph";

export default function Data() {
  const slide = [<InstrGraph />, <LocatGraph />, <AvPriceGraph />];
  const [index, setIndex] = useState(0);

  //change slides

  function getPrevSlide() {
    setIndex((prev) => prev - 1);
  }

  function getNextSlide() {
    setIndex((prev) => prev + 1);
  }
  return (
    <>
      <TopNavBar />

      <div
        className="container d-flex justify-content-evenly align-items-center w-50"
        style={{ minWidth: "300px" }}
      >
        <button
          className="btn btn-sm border-dark btn-light w-25"
          onClick={getPrevSlide}
          disabled={index === 0}
        >
          Previous
        </button>

        <div className="py-2 px-4">
          <h3 className="text-center">Useful Statistics</h3>
        </div>

        <button
          className="btn btn-sm border-dark btn-light w-25"
          onClick={getNextSlide}
          disabled={index === slide.length - 1}
        >
          Next
        </button>
      </div>
      <div>{slide[index]}</div>
    </>
  );
}
