import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import { API_URL } from "../constants";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";

function filterData(searchText, allRestaurants) {
  const filteredData = allRestaurants.filter((restaurant) =>
    restaurant.data.name.toLowerCase().includes(searchText.toLowerCase())
  );
  console.log(filteredData);
  return filteredData;
}

const Body = () => {
  const [searchText, setSearchText] = useState("");
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setfilteredRestaurants] = useState([]);

  async function getRestaurants() {
    try {
      const data = await fetch(API_URL);
      const json = await data.json();
      console.log(json);
      setAllRestaurants(json?.data?.cards?.[2].data?.data?.cards);
      console.log(allRestaurants);
      setfilteredRestaurants(json?.data?.cards?.[2]?.data?.data?.cards);
    } catch (error) {
      console.log("There was an error", error);
    }
    // console.log(allRestaurants);
  }

  useEffect(() => {
    getRestaurants();
  }, []);

  return allRestaurants?.length === 0 ? (
    <Shimmer />
  ) : (
    <>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <button
          className="search-btn"
          onClick={() => {
            const filtedData = filterData(searchText, allRestaurants);
            setfilteredRestaurants(filtedData);
          }}
        >
          Search
        </button>
      </div>
      <div className="restaurant-list">
        {filteredRestaurants?.length === 0 ? (
          <h1>No results found</h1>
        ) : (
          filteredRestaurants.map((restaurant) => {
            return (
              <Link to={"/restaurant/" + restaurant.data.id}>
                <RestaurantCard {...restaurant.data} key={restaurant.data.id} />
              </Link>
            );
          })
        )}
      </div>
    </>
  );
};

export default Body;
