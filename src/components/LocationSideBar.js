import React, { useState } from "react";
import { HERE_MAP_API_KEY } from "../constants";
import SuggestionDropDown from "./SuggestionDropDown";
import { GrFormClose } from "react-icons/gr";

const LocationSideBar = ({ isVisible, setToggle }) => {
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const getAutoCompletion = async (text) => {
    console.log(text);
    const suggestions = await fetch(
      `https://autocomplete.search.hereapi.com/v1/autocomplete?q=${text}&apiKey=${HERE_MAP_API_KEY}&in=countryCode%3AIND`
    );
    const data = await suggestions.json();
    console.log(data);
    setSuggestions(data?.items);
    setLoading(false);
  };
  return (
    <div
      className={`h-screen w-[30vw]  border-2 bg-white fixed top-0 right-0 flex flex-col p-2 ${
        isVisible ? "translate-x-0 " : "translate-x-full"
      } ease-in-out duration-300`}
    >
      <button
        className="w-full  p-7 flex  flex-col items-end"
        onClick={() => setToggle(false)}
      >
        <GrFormClose className=" text-3xl" />
      </button>
      <input
        className="border p-4 focus:outline-none shadow-sm"
        placeholder="Change Location..."
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
          setLoading(true);
          console.log(searchText);
          if (e.target.value.length > 2) getAutoCompletion(e.target.value);
        }}
      />
      <SuggestionDropDown
        suggestions={suggestions}
        searchText={searchText}
        loading={loading}
        setToggle={setToggle}
      />
    </div>
  );
};

export default LocationSideBar;
