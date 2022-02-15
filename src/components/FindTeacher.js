import React, { useState } from "react";
import TopNavBar from "./TopNavBar";
import ClipboardJS from "clipboard";

export default function FindTeacher() {
  //search result state
  const [results, setResults] = useState("");

  //get matching teachers
  async function searchTeachers(e) {
    e.preventDefault();

    const locationIndex = document.getElementById("Location").options
      .selectedIndex;

    const location = document.getElementById("Location").options[locationIndex]
      .value;

    const instIndex = document.getElementById("Inst").options.selectedIndex;

    const inst = document.getElementById("Inst").options[instIndex].value;

    const body = { location, inst };
    const response = await fetch("/search", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });

    const teachers = await response.json();

    new ClipboardJS(".btn-clipboard");

    //if matches found render teachers else say no matches found
    let i = 0;

    teachers.length
      ? setResults(() =>
          teachers.map((teacher) => (
            <div className="card mt-4 shadow-sm">
              <div className="card-header">{teacher.name}</div>
              <ul className="list-group list-group-flush">
                <li key={Math.random() * 1000} className="list-group-item">
                  £{teacher.price}(ph)
                </li>
                <li
                  id={"teacherEmail" + i++}
                  key={Math.random() * 1000}
                  className="list-group-item email d-flex justify-content-between align-items-center"
                >
                  <div>{teacher.email}</div>
                  <button
                    className="btn btn-sm btn-light border-dark rounded btn-clipboard d-flex"
                    data-clipboard-action="copy"
                  >
                    Copy
                  </button>
                </li>
              </ul>
            </div>
          ))
        )
      : setResults(
          <div className="mt-4 text-center">
            <h3>No matches found!</h3>
          </div>
        );

    //set copy target to corresponding email address

    document
      .querySelectorAll("button.btn-clipboard")
      .forEach((el) =>
        el.setAttribute("data-clipboard-target", `#${el.parentNode.id}`)
      );
  }

  return (
    <div>
      <TopNavBar />
      <div
        className="col col-lg-6 col-sm-12 p-2 vh-100"
        style={{ margin: "0 auto" }}
      >
        <h2 className="text-center">Find a Teacher</h2>
        <form onSubmit={searchTeachers} className="form-group">
          <div className="form-row">
            <label htmlFor="Location">Location:</label>
            <select required id="Location" className="form-control-lg w-100">
              <option value="Bristol">Bristol</option>
              <option value="London">London</option>
              <option value="Manchester">Manchester</option>
              <option value="Cardiff">Cardiff</option>
              <option value="Edinburgh">Edinburgh</option>
            </select>
          </div>
          <div className="form-row">
            <label htmlFor="Inst">Instrument:</label>
            <select
              required
              id="Inst"
              className="form-control-lg w-100"
              type="text"
            >
              <option value="guitar">Guitar</option>
              <option value="drums">Drums</option>
              <option value="bass">Bass</option>
              <option value="keyboard">Keyboard</option>
              <option value="vocals">Vocals</option>
            </select>
          </div>
          <div className="form-row">
            <label htmlFor="submitBtn"></label>
            <button
              id="submitBtn"
              className="btn-dark btn-lg w-100"
              type="submit"
            >
              Search
            </button>
          </div>
        </form>
        {results}
      </div>
    </div>
  );
}
