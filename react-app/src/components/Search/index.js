import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllPinsThunk } from "../../store/pin";
import "./Search.css";

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const pins = useSelector((state) => state.pins.allPins);
  const pinsArr = Object.values(pins);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (searchQuery.trim() !== "") {
        history.push(`/search?query=${encodeURIComponent(searchQuery)}`);
      }
    }
  };

  useEffect(() => {
    dispatch(getAllPinsThunk());
  }, [dispatch]);

  return (
    <div className="search-bar-container">
      <span className="material-symbols-outlined">search</span>
      <input
        type="text"
        placeholder="Search for pins..."
        value={searchQuery}
        onChange={handleSearchChange}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
}

export default SearchBar;
