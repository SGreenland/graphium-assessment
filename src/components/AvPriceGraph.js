import React, { useEffect } from "react";
import * as d3 from "d3";

export default function AvPriceGraph() {
  async function getAvCostByLocation() {
    const width = document.getElementById("priceGraph").offsetWidth;
    const height = document.getElementById("priceGraph").offsetHeight;
    const response = await fetch("/av_price");

    if (response.ok) {
      const avPrices = await response.json();

      const root = d3
        .hierarchy(avPrices)
        .sum((d) => d.avg)
        .sort((a, b) => b.avg - a.avg);

      d3.treemap().size([width, height]).padding(2)(root);

      d3.select("svg")
        .selectAll("rect")
        .data(root.leaves())
        .enter()
        .append("rect")
        .attr("x", function (d) {
          return d.x0;
        })
        .attr("y", function (d) {
          return d.y0;
        })
        .attr("width", function (d) {
          return d.x1 - d.x0;
        })
        .attr("height", function (d) {
          return d.y1 - d.y0;
        })
        .style("stroke", "black")
        .style("fill", "rgb(37, 95, 94)");

      d3.select("svg")
        .selectAll("text")
        .data(root.leaves())
        .enter()
        .append("text")
        .attr("x", function (d) {
          return d.x0 + 5;
        })
        .attr("y", function (d) {
          return d.y0 + 20;
        })
        .text(function (d) {
          return d.data.location;
        })
        .attr("font-size", "15px")
        .attr("fill", "white");
    } else {
      alert(`${response.status}: ${response.statusText}`);
    }

    const graphSize = d3.selectAll("rect").size();
    //hide spinner once all data rendered...
    graphSize === 5 && d3.select("#spinner3").style("display", "none");
  }

  useEffect(() => {
    //create canvas
    d3.select("#priceGraph")
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100%");
    //get data
    getAvCostByLocation();
  }, []);

  return (
    <div id="priceGraphContainer">
      <h4 className="text-center p-5">Average price for each Location</h4>
      <div
        className="graph container d-flex justify-content-evenly bg-light rounded shadow"
        id="priceGraph"
      >
        <div
          id="spinner3"
          style={{ position: "absolute" }}
          class="spinner-border text-secondary"
          role="status"
        >
          <span class="sr-only"></span>
        </div>
      </div>
    </div>
  );
}
