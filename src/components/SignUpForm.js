import { useState } from "react";
import $ from "jquery";
import "bootstrap";
import TopNavBar from "./TopNavBar";

function SignUpForm() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("Bristol");
  const [inst, setInst] = useState("guitar");
  const [price, setPrice] = useState(15);
  const [email, setEmail] = useState("");

  async function signUp(e) {
    //stop page reloading on form-submission
    e.preventDefault();

    const body = { name, email, location, inst, price };
    const response = await fetch("/signup", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    if (response.ok) {
      $("#modal").show();
    } else {
      alert(`${response.status}: ${response.statusText}`);
    }
  }

  function hideModal() {
    $("#modal").hide();
  }

  const getSelection = (e) => {
    const selectedIndex = e.target.options.selectedIndex;
    switch (e.target.id) {
      case "Location":
        setLocation(() => e.target.options[selectedIndex].value);
        break;
      case "Inst":
        setInst(() => e.target.options[selectedIndex].value);
        break;
      case "Price":
        setPrice(() => e.target.options[selectedIndex].value);
        break;
      case "Email":
        setEmail(() => e.target.options[selectedIndex].value);
        break;
      default:
        return;
    }
  };

  return (
    <>
      <TopNavBar getSelection={getSelection} />
      <div
        id="signupForm"
        className="col col-lg-6 col-sm-12 p-2 vh-100"
        style={{ margin: "0 auto" }}
      >
        <h2 className="text-center">Register</h2>
        {/* modal to display once registered */}
        <div
          id="modal"
          className="modal modal-backdrop"
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Welcome {name}</h5>
              </div>
              <div className="modal-body">
                <p>Succesfully Registered!</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={hideModal}
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>

        <form
          className="form-group d-flex flex-column h-75 justify-content-evenly"
          onSubmit={signUp}
        >
          <div className="form-row">
            <label htmlFor="Name" placeholder="Name">
              Name:
            </label>
            <input
              required
              id="Name"
              value={name}
              className="form-control-lg w-100"
              type="text"
              onChange={(e) => {
                setName(() => e.target.value);
              }}
            />
          </div>
          <div className="form-row">
            <label htmlFor="Email" placeholder="Email">
              Email:
            </label>
            <input
              required
              id="Email"
              value={email}
              className="form-control-lg w-100"
              type="email"
              onChange={(e) => {
                setEmail(() => e.target.value);
              }}
            />
          </div>

          <div className="form-row">
            <label htmlFor="Location">Location:</label>
            <select
              required
              id="Location"
              className="form-control-lg w-100"
              onChange={getSelection}
            >
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
              onChange={getSelection}
            >
              <option value="guitar">Guitar</option>
              <option value="drums">Drums</option>
              <option value="bass">Bass</option>
              <option value="keyboard">Keyboard</option>
              <option value="vocals">Vocals</option>
            </select>
          </div>
          <div className="form-row">
            <label htmlFor="Price">Price(ph):</label>
            <select
              required
              id="Price"
              className="form-control-lg w-100"
              type="text"
              onChange={getSelection}
            >
              <option value={15}>£15</option>
              <option value={20}>£20</option>
              <option value={25}>£25</option>
              <option value={30}>£30</option>
              <option value={35}>£35</option>
              <option value={40}>£40</option>
            </select>
          </div>
          <div className="form-row">
            <label htmlFor="submitBtn"></label>
            <button
              id="submitBtn"
              className="btn-dark btn-lg w-100"
              type="submit"
            >
              Sign up!
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignUpForm;
