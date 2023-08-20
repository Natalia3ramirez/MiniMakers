import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
import { getAllPinsThunk } from "../../store/pin";
import  "./Search.css"


function SearchBar({onSearch}) {
  // const [searchQuery, setSearchQuery] = useState('');
  // const dispatch = useDispatch();
  // const pins = useSelector(state => state.pins)

  // const handleSearchChange = (e) => {
  //   e.preventDefault();

  //   const filterdSearch = pins.filter(pin => pin.title.toLowerCase().includes(pin.toLowerCase()))

  //   setSearchQuery(e.target.value);
  //   onSearch(e.target.value);
  // };



  //   useEffect(() => {
  //   dispatch(getAllPinsThunk());
  // }, [dispatch]);

  return (
    <div className='search-bar-container'>
      <span class="material-symbols-outlined">search</span>
      <input
        type="text"
        placeholder="Feature coming soon..."
        // value={searchQuery}
        // onChange={handleSearchChange}
      />
    </div>
  );
}

export default SearchBar;
