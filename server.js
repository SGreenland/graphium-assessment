const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const port = process.env.PORT || 5000;

app.listen(port);

app.use(express.json());
app.use(cors());

// sign-up route

app.post("/signup", async (req, res) => {
  try {
    const { name, email, location, inst, price } = req.body;

    const newTeacher = await pool.query(
      "INSERT INTO teachers(name, email, location, instrument, price) VALUES($1, $2, $3, $4, $5) RETURNING * ",
      [name, email, location, inst, price]
    );

    res.status(200).send("Thanks for joining!");
  } catch (error) {
    res.status(500).send();
    console.log(error.message);
  }
});

//search route

app.post("/search", async (req, res) => {
  try {
    const { location, inst } = req.body;
    const matchedTeachers = await pool.query(
      "SELECT * FROM teachers WHERE location = $1 AND instrument = $2",
      [location, inst]
    );
    res.json(matchedTeachers.rows);
  } catch (error) {
    res.status(500).send();
    console.log(error.message);
  }
});

//get number of each instrument

app.get("/instrument_count", async (req, res) => {
  try {
    const gtrCount = await pool.query(
      "SELECT COUNT(*) FROM teachers WHERE instrument = $1",
      ["guitar"]
    );
    const drumCount = await pool.query(
      "SELECT COUNT(*) FROM teachers WHERE instrument = $1",
      ["drums"]
    );
    const bassCount = await pool.query(
      "SELECT COUNT(*) FROM teachers WHERE instrument = $1",
      ["bass"]
    );
    const keysCount = await pool.query(
      "SELECT COUNT(*) FROM teachers WHERE instrument = $1",
      ["keyboard"]
    );
    const voxCount = await pool.query(
      "SELECT COUNT(*) FROM teachers WHERE instrument = $1",
      ["vocals"]
    );
    res.json([
      { inst: "guitar", ...gtrCount.rows[0] },
      { inst: "drums", ...drumCount.rows[0] },
      { inst: "bass", ...bassCount.rows[0] },
      { inst: "keys", ...keysCount.rows[0] },
      { inst: "vox", ...voxCount.rows[0] },
    ]);
  } catch (error) {
    res.status(500).send();
    console.log(error.message);
  }
});

//get location popularity

app.get("/location_count", async (req, res) => {
  try {
    const bstCount = await pool.query(
      "SELECT COUNT(*) FROM teachers WHERE location = $1",
      ["Bristol"]
    );
    const ldnCount = await pool.query(
      "SELECT COUNT(*) FROM teachers WHERE location = $1",
      ["London"]
    );
    const manCount = await pool.query(
      "SELECT COUNT(*) FROM teachers WHERE location = $1",
      ["Manchester"]
    );
    const cdfCount = await pool.query(
      "SELECT COUNT(*) FROM teachers WHERE location = $1",
      ["Cardiff"]
    );
    const ednCount = await pool.query(
      "SELECT COUNT(*) FROM teachers WHERE location = $1",
      ["Edinburgh"]
    );
    res.json([
      { loc: "Bristol", ...bstCount.rows[0] },
      { loc: "London", ...ldnCount.rows[0] },
      { loc: "Manchester", ...manCount.rows[0] },
      { loc: "Cardiff", ...cdfCount.rows[0] },
      { loc: "Edinburgh", ...ednCount.rows[0] },
    ]);
  } catch (error) {
    res.status(500).send();
    console.log(error.message);
  }
});

//get average cost for each location

app.get("/av_price", async (req, res) => {
  try {
    const avCostperLoc = await pool.query(
      "SELECT AVG(price), location FROM teachers GROUP BY location ORDER BY location;"
    );
    res.json({ children: avCostperLoc.rows });
  } catch (error) {
    res.status(500).send();
    console.log(error.message);
  }
});
