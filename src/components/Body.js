import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import { API_URL2 } from "../constants";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { filterData } from "../utils/helper";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  const [searchText, setSearchText] = useState("");
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setfilteredRestaurants] = useState([]);

  async function getRestaurants() {
    try {
      const data = await fetch(API_URL2);
      const json = await data.json();
      setAllRestaurants(json?.data?.cards?.[2].data?.data?.cards);
      setfilteredRestaurants(json?.data?.cards?.[2]?.data?.data?.cards);
    } catch (error) {
      console.log("There was an error", error);
    }
  }

  useEffect(() => {
    getRestaurants();
  }, []);

  const onlineStatus = useOnlineStatus();

  //early return
  if (onlineStatus === false) {
    return <p className="font-bold text-center">You are offline ! 🔴</p>;
  }

  return allRestaurants?.length === 0 ? (
    <Shimmer />
  ) : (
    <>
      <div className="my-12 flex items-center justify-center">
        <div className="flex justify-between w-1/3 border border-slate-400 border-1 ">
          <input
            type="text"
            className="p-3 grow h-12 w-[90%] focus:outline-none"
            placeholder="Search for restaurants"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            className="p-3"
            onClick={() => {
              const filtedData = filterData(searchText, allRestaurants);
              setfilteredRestaurants(filtedData);
            }}
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div className="flex flex-wrap">
        {filteredRestaurants?.length === 0 ? (
          <p className="w-full font-bold text-center">No Restaurants Found</p>
        ) : (
          filteredRestaurants.map((restaurant) => {
            return (
              <Link
                to={"/restaurant/" + restaurant.data.id}
                key={restaurant.data.id}
              >
                <RestaurantCard {...restaurant.data} />
              </Link>
            );
          })
        )}
      </div>
    </>
  );
};

export default Body;
