import React, { useEffect, useState } from "react";
import * as d3 from "d3";

function InstrGraph() {
  const [instruments, setInstruments] = useState([]);

  async function getInstrumentCount() {
    const response = await fetch("/instrument_count");

    const instrumentCount = await response.json();

    if (response.ok) {
      setInstruments(instrumentCount);
    }
  }

  //fetch data when page loads and store state.
  useEffect(() => {
    getInstrumentCount();
  }, []);

  //map data from json

  useEffect(() => {
    instruments.map((inst) =>
      d3
        .select("#instGraph")
        .append("div")
        .style("height", "15%")
        .text(`${inst.inst}`)
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .append("rect")
        .attr("height", "20px")
        .attr("width", inst.count * 10 + "%")
        .attr("max-width", "100%")
        .attr("fill", "#255f5e")
    );
    const graphSize = d3.select("#instGraph").selectChildren("div").size();

    //hide spinner once all bars rendered...
    graphSize === 6 && d3.select("#spinner").style("display", "none");
  });

  return (
    <div id="instGraphContainer">
      <h4 className="text-center p-5">Instrument Popularity</h4>
      <div
        className="graph container d-flex flex-column justify-content-evenly bg-light rounded shadow"
        id="instGraph"
      >
        <div id="spinner" class="spinner-border text-secondary" role="status">
          <span class="sr-only"></span>
        </div>
      </div>
    </div>
  );
}

export default InstrGraph;
