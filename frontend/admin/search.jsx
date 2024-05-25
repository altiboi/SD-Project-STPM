import React, { useState } from "react";
import "./search.css";

function Search({ setSearchText, isOpen }) {
  const [searchInput, setSearchInput] = useState("");

  const handleInputChange = (e) => {
    const input = e.target.value;
    setSearchInput(input);
    setSearchText(input);
  };

  return (
    <article className={isOpen ? "SearchBar" : "SearchBar_close"}>
      <input
        type="text"
        value={searchInput}
        onChange={handleInputChange}
        placeholder="Type to search...."
      />
    </article>
  );
}

export default Search;
