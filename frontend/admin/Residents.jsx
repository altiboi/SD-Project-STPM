import React, { useState, useEffect } from "react";
import "./Residents.css";

function Residents({ filterLetters }) {
  const [residents, setResidents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://showresidents.azurewebsites.net/api/ShowResidents_?"
        );
        const data = await response.json();
        console.log("Fetched Residents Data:", data);
        setResidents(data);
      } catch (error) {
        console.error("Error fetching residents:", error);
      }
    };
    fetchData();
  }, []);

  const filterResidents = (residents, filterLetters) => {
    if (!filterLetters) {
      return residents;
    }
    const filteredResidents = residents.filter((person) => {
      const residentName = person.Name?.toLowerCase() || "";
      return residentName.includes(filterLetters.toLowerCase());
    });
    return filteredResidents;
  };

  const filteredResidents = filterResidents(residents, filterLetters);
  console.log("Filtered Residents:", filteredResidents);

  return (
    <>
      {filteredResidents.map((person, index) => (
        <div key={index} className="comp">
          <article className="insComp">
            <section className="profile">
              <img src="pp.png" alt="" />
              <p className="name">{person.Name}</p>
            </section>
            <ul className="vC">
              <li className="variables">{person.UnitID}</li>
              <li className="variables">{person.PropertyName}</li>
            </ul>
          </article>
        </div>
      ))}
    </>
  );
}

function ResidentsValue() {
  const [numResidents, setNumResidents] = useState("Loading...");

  useEffect(() => {
    fetchResidentCount();
  }, []);

  const fetchResidentCount = async () => {
    try {
      const response = await fetch(
        "https://showresidents.azurewebsites.net/api/ShowResidents_?"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch resident data");
      }
      const data = await response.json();
      setNumResidents(data.length);
    } catch (error) {
      console.error("Error fetching resident data:", error);
    }
  };

  return <p id="Num_res">{numResidents}</p>;
}

export { ResidentsValue }; // Export Value as a named export
export default Residents; // Export Residents as the default export
