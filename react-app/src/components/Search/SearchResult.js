import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getAllPinsThunk } from "../../store/pin";
import "./Search.css";
import PinCard from "../LandingPage/PinCard";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

function SearchResultPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("query");
  const pins = useSelector((state) => state.pins.allPins);
  const pinsArr = Object.values(pins);
  const [filteredPins, setFilteredPins] = useState([]);

  useEffect(() => {
    dispatch(getAllPinsThunk());
  }, [dispatch]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = pinsArr.filter((pin) =>
        pin.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPins(filtered); // Update filteredPins with search results
    } else {
      setFilteredPins([]); // Reset filteredPins if searchQuery is empty
    }
  }, [searchQuery, pinsArr]);

  return (
    <div className="masonry-container">
      {filteredPins.length === 0 ? (
        <div>No search results found.</div>
      ) : (
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 1020: 5 }}>
          <Masonry>
            {filteredPins.map((pin) => (
              <PinCard key={pin.id} pin={pin} />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      )}
    </div>
  );
}

export default SearchResultPage;
