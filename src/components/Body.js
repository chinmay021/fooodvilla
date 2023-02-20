import { useEffect, useRef, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import { API_URL, API_URL3 } from "../constants";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { filterData } from "../utils/helper";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  const [searchText, setSearchText] = useState("");
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setfilteredRestaurants] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const totalOpenRestaurants = useRef(0);

  async function getRestaurants(url = API_URL) {
    try {
      const data = await fetch(url);
      const json = await data.json();
      if (url === API_URL) {
        setAllRestaurants(json?.data?.cards?.[2].data?.data?.cards);
        setfilteredRestaurants(json?.data?.cards?.[2]?.data?.data?.cards);
        totalOpenRestaurants.current =
          json?.data?.cards?.[2]?.data?.data.totalOpenRestaurants;
      } else {
        const arr = json?.data?.cards;
        const restaurantList = arr.map((item) => {
          return item?.data;
        });
        setAllRestaurants([...allRestaurants, ...restaurantList]);
        setfilteredRestaurants([...filteredRestaurants, ...restaurantList]);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("There was an error", error);
    }
  }

  const handelInfiniteScroll = async () => {
    // console.log("scrollHeight" + document.documentElement.scrollHeight);
    // console.log("innerHeight" + window.innerHeight);
    // console.log("scrollTop" + document.documentElement.scrollTop);
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 10 >=
          document.documentElement.scrollHeight &&
        offset + 16 <= totalOpenRestaurants.current
      ) {
        setIsLoading(true);
        setOffset(offset + 16);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    offset ? getRestaurants(`${API_URL3}&offset=+${offset}`) : getRestaurants();
    window.addEventListener("scroll", handelInfiniteScroll);
    return () => window.removeEventListener("scroll", handelInfiniteScroll);
  }, [offset]);

  const onlineStatus = useOnlineStatus();

  //early return
  if (onlineStatus === false) {
    return <p className="font-bold text-center">You are offline ! 🔴</p>;
  }

  return allRestaurants?.length === 0 ? (
    <Shimmer />
  ) : (
    <>
      <div className="bg-slate-50 flex-grow">
        {/* {search bar} */}
        <div className="my-12 flex items-center justify-center">
          <div className="flex justify-between w-1/3 border border-slate-400 border-1 focus:w-2/3 ">
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
          {isLoading && <Shimmer />}
        </div>
      </div>
    </>
  );
};

export default Body;
