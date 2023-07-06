import { useContext, useEffect, useRef, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import { API_URL, API_URL3 } from "../constants";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { filterData } from "../utils/helper";
import useOnlineStatus from "../utils/useOnlineStatus";
import LocationContext from "../utils/LocationContext";
// import heroImg from "../../assets/hero-img.jpg";
import heroImg from "../../assets/hero-img.jpg";
import BodyShimmer from "./bodyShimmer";

const Body = () => {
  const [searchText, setSearchText] = useState("");
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setfilteredRestaurants] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const totalOpenRestaurants = useRef(0);

  // const location = useGetAddress();
  // console.log(location);

  const { locationGlobal } = useContext(LocationContext);
  const latitude = locationGlobal?.coordinates?.latitude;
  // console.log("latitude: " + latitude);
  const longitude = locationGlobal?.coordinates?.longitude;
  // console.log(location.coordinates.latitude, location.coordinates.longitude);

  async function getRestaurants(url) {
    try {
      // console.log(url, latitude, longitude);
      //lat=22.814794130574803&lng=86.09871324151756
      const data = await fetch(`${url}lat=${latitude}&lng=${longitude}`);
      const json = await data.json();
      // console.log(json.data.cards);
      if (url === API_URL) {
        json?.data?.cards.forEach((card) => {
          // console.log(card);
          if (card.cardType === "seeAllRestaurants") {
            // console.log(card);
            setAllRestaurants(card?.data?.data?.cards);
            setfilteredRestaurants(card?.data?.data?.cards);
            totalOpenRestaurants.current =
              card?.data?.data?.totalOpenRestaurants;
          }
        });
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
    // console.log("useEffect called latitude", latitude);
    if (latitude && longitude) {
      // offset ? getRestaurants(API_URL3) : getRestaurants();
      getRestaurants(API_URL);
    }
    setOffset(0);
    // window.addEventListener("scroll", handelInfiniteScroll);
    // return () => window.removeEventListener("scroll", handelInfiniteScroll);
  }, [latitude, longitude]);

  useEffect(() => {
    // console.log("useEffect called offset", offset, latitude);
    if (offset) {
      getRestaurants(`${API_URL3}offset=${offset}&`);
    }
    window.addEventListener("scroll", handelInfiniteScroll);
    return () => window.removeEventListener("scroll", handelInfiniteScroll);
  }, [offset]);

  const onlineStatus = useOnlineStatus();

  //early return
  if (onlineStatus === false) {
    return <p className="font-bold text-center">You are offline ! 🔴</p>;
  }

  return allRestaurants?.length === 0 ? (
    <BodyShimmer />
  ) : (
    <>
      <div className="w-[80vw] flex flex-col justify-center">
        <div className="bg-slate-50 flex  flex-col items-center justify-center ">
          <div className="hero-section  relative h-[30rem] flex  items-center w-full">
            <img
              src="https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png"
              className="h-full w-full absolute object-cover "
            ></img>

            {/* {search bar} */}
            <div className="my-12 flex flex-grow items-center justify-center  z-10 ">
              <div className="flex justify-between w-1/3 border border-slate-400 border-1 focus:w-2/3  ">
                <input
                  data-testid="search-input"
                  type="text"
                  className="p-3 grow h-12 w-[90%] focus:outline-none"
                  placeholder="Search for restaurants"
                  value={searchText}
                  onChange={(e) => {
                    setSearchText(e.target.value);
                  }}
                />
                <button
                  data-testid="search-btn"
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
          </div>
          {/* restaurants */}
          <div className=" ">
            <div className="filterHeader border-b-2 flex justify-between px-16 my-8 items-center">
              <span className="text-[26px] font-semibold text-gray-800">460 restaurants</span>
              <div className="filterList flex gap-4 px-2 font-medium text-slate-600"> 
                <button>Relevance</button>
                <button>Delivery Time</button>
                <button>Rating</button>
                <button>Cost: Low To High</button>
                <button>Cost: High To Low</button>
              </div>
            </div>
            <div
              className="restaurant flex flex-wrap justify-center "
              data-testid="res-list"
            >
              {filteredRestaurants?.length === 0 ? (
                <p className="w-full font-bold text-center">
                  No Restaurants Found
                </p>
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
        </div>
      </div>
    </>
  );
};

export default Body;
