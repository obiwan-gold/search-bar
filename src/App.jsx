import { useState, useEffect } from "react";

import "./App.css";

function Animal({ type, name, age }) {
  return (
    <p>
      <strong>{type}</strong> {name} {age}
    </p>
  );
}

function App() {
  // Send data from input to the server so that it can return the query result
  const [animals, setAnimals] = useState([]);

  // Cache the last results so that on refresh it doesn't state "No results found"

  useEffect(() => {
    //  local storage API built-in browser to get last query to store arbitrary key-value pairs
    const lastQuery = localStorage.getItem("lastQuery");
    // automatically run search to update query
    search(lastQuery);
  }, []); // Component did mount

  const search = async (q) => {
    // q is the value of the input in the search bar
    const response = await fetch(
      "http://localhost:8080?" + new URLSearchParams({ q })
    );
    // URLSearchParams class is a built-in browser function
    const data = await response.json();
    // response into json, set data as state of component
    setAnimals(data);

    localStorage.setItem("lastQuery", q);
  };

  return (
    <div className="App">
      <h1>Animal Farm</h1>

      <input
        type="text"
        placeholder="Search"
        // How we get data from the user
        onChange={(e) => search(e.target.value)}
      />

      <ul>
        {animals.map((animal) => (
          <li key={animal.id}>
            {/* Extract UI to a component, keeping in mind is the component large enough that it's necessary? */}
            {/* <strong>{animal.type}</strong> {animal.name} {animal.age} */}
            <Animal key={animal.id} {...animal} />
          </li>
        ))}

        {animals.length === 0 && "No animals found"}
      </ul>
    </div>
  );
}

export default App;
