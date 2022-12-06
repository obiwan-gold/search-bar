import express from "express";
import cors from "cors";

const app = express(); //initialize express app
app.use(cors()); // middleware to make requests from a different URL
app.use(express.json()); //parse any json sent to the server

//Make some fake data using Chance
import Chance from "chance";
const chance = new Chance();

// Create an array of 250 items
// Convert Array into an array of integers form 0, 1, 2, ... n by wrapping in brackets and using spread syntax on its keys
// create a new array based on the index of the original
const animals = [...Array(250).keys()].map((id) => {
  return {
    id,
    type: chance.animal(),
    age: chance.age(),
    name: chance.name(),
  };
});

// Endpoints for search
app.get("", (req, res) => {
  // Run this function on each request
  // Filter results by query
  const q = req.query.q?.toLowerCase() || ""; // Lower case so it's case insensitive and OR to provide an empty string as a default value
  const results = animals.filter((animal) =>
    animal.type.toLowerCase().includes(q)
  ); // Filter out array of animals to those that have the text and if it passes test

  res.send(results);
});

app.listen(8080, () => console.log("Listening on port http://localhost:8080"));
