import React, { useEffect, useState } from "react";
import * as d3 from "d3";

function LocatGraph() {
  const [locations, setLocations] = useState([]);

  async function getLocationCount() {
    const response = await fetch("/location_count");

    if (response.ok) {
      const locationCount = await response.json();

      setLocations(locationCount);
    } else {
      alert(`${response.status}: ${response.statusText}`);
    }
  }

  //fetch data when page loads and store state.
  useEffect(() => {
    getLocationCount();
  }, []);

  //map data from json

  useEffect(() => {
    locations.forEach((loc) => {
      d3.select("#locGraph")
        .append("div")
        .style("display", "flex")
        .style("color", "white")
        .style("justify-content", "center")
        .style("align-items", "center")
        .style("height", `${loc.count * 10}px`)
        .style("margin", "3px")
        .style("width", "20%")
        .style("background", "rgb(37, 95, 94)")
        .append("div")
        .text(loc.loc);
    });
    const graphSize = d3.select("#locGraph").selectChildren("div").size();

    //hide spinner once all bars rendered...
    graphSize === 6 && d3.select("#spinner2").style("display", "none");
  });

  return (
    <div id="locGraphContainer">
      <h4 className="text-center p-5">Teachers per Location</h4>
      <div
        className="graph container d-flex justify-content-evenly align-items-end bg-light rounded shadow"
        id="locGraph"
      >
        <div id="spinner2" class="spinner-border text-secondary" role="status">
          <span class="sr-only"></span>
        </div>
      </div>
    </div>
  );
}

export default LocatGraph;
