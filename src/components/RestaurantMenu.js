import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IMG_CDN_URL } from "../constants";
import { IMG__MENU_ITEM_CDN_URL,FETCH_MENU_URL1,
  MENU_ITEM_TYPE_KEY,
  RESTAURANT_TYPE_KEY, } from "../constants";
import Shimmer from "./Shimmer";
// import useRestaurantDetails from "../utils/useRestaurantDetails";
import { addItem, decreamentItem } from "../utils/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./Cart";


const RestaurantMenu = () => {
  const { resId } = useParams(); // call useParams and get value of restaurant id using object destructuring
  const [restaurant, setRestaurant] = useState(null); // call useState to store the api data in res
  const [menuItems, setMenuItems] = useState([]);
  useEffect(() => {
    getRestaurantInfo(); // call getRestaurantInfo function so it fetch api data and set data in restaurant state variable
  }, []);

  async function getRestaurantInfo() {
    try {
      const response = await fetch(FETCH_MENU_URL1 + resId);
      const json = await response.json();

      // Set restaurant data
      const restaurantData =
        json?.data?.cards
          ?.map((x) => x.card)
          ?.find((x) => x && x.card["@type"] === RESTAURANT_TYPE_KEY)?.card
          ?.info || null;
      setRestaurant(restaurantData);

      // Set menu item data
      const menuItemsData =
        json?.data?.cards
          .find((x) => x.groupedCard)
          ?.groupedCard?.cardGroupMap?.REGULAR?.cards?.map((x) => x.card?.card)
          ?.filter((x) => x["@type"] == MENU_ITEM_TYPE_KEY)
          ?.map((x) => x.itemCards)
          .flat()
          .map((x) => x.card?.info) || [];

      const uniqueMenuItems = [];
      menuItemsData.forEach((item) => {
        if (!uniqueMenuItems.find((x) => x.id === item.id)) {
          uniqueMenuItems.push(item);
        }
      });
      setMenuItems(uniqueMenuItems);
    } catch (error) {
      setMenuItems([]);
      setRestaurant(null);
      console.log(error);
    }
  }

  const disptach = useDispatch();

  const handleAddFoodItem = (item) => {
    disptach(addItem(item));
  };
  const handleDecreamentFoodItem = (item) => {
    disptach(decreamentItem(item));
  };


  return !restaurant ? (
    <Shimmer />
  ) : (
    <div className="bg-slate-50 w-full">
      <div className="font-poppins flex gap-10 flex-wrap justify-center bg-[#171a29] text-white my-8 p-4 ">
        {/* {console.log(restaurant?.data?.cards[0]?.card?.card?.info?.name)} */}
        <img
          className="w-80 h-52 rounded-lg"
          src={IMG_CDN_URL + restaurant?.cloudinaryImageId}
          alt={restaurant?.name}
        />
        <h2>
          {" "}
          <span className="block font-semibold text-2xl max-sm:mt-5 max-sm:ml-4 max-sm:text-sm font-poppins">
            {restaurant?.name}
          </span>
          <p className=" max-sm:ml-4 opacity-4 max-sm:text-sm font-thin">
            {restaurant?.cuisines?.join(", ")}
          </p>
        </h2>

        <div className="flex  justify-between gap-12 pt-5 font-semibold text-base mt-7">
          <div className="pr-9 border-r-[1px] border-white">
            <h3>{restaurant?.avgRating} stars</h3>
            <br />
            <div className="text-sm font-extralight">
              {restaurant?.totalRatingsString}
            </div>
          </div>
          <div className=" pr-9 border-r-[1px] border-white">
            <div>{restaurant?.sla.slaString}</div>
            <br />
            <div className="text-sm font-extralight"> Delivery Time </div>
          </div>
          <div>
            <div>&#8377; {restaurant?.costForTwo / 100}</div>
            <br />
            <div className="text-sm font-extralight"> Cost for Two </div>
          </div>
        </div>
      </div>

      <div className="flex">
        <div className="bg-white w-2/3 m-auto font-poppins flex p-3 justify-center">
          <h1 >
            <span className="text-2xl pt-4 font-bold">Recommended </span>
            <p className="text-xs font-thin ">{menuItems.length} ITEMS</p>
            <ul>
              {menuItems.map((item) => (
                <div
                  className="flex justify-between m-5 p-5 border-b"
                  key={item.id}
                >
                  <div className="flex gap-2 flex-col max-w-md pr-5">
                    <li className="font-poppins font-bold max-sm:text-sm">
                      {item.name}
                    </li>
                    <div className="text-sm">
                      {item?.price > 0
                        ? new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                        }).format(item?.price / 100)
                        : " "}{" "}
                    </div>
                    <div className="text-[#666666] max-sm:mb-2 text-sm max-sm:text-sm">
                      {item.description}
                    </div>
                  </div>
                  <div className=" w-28 flex flex-col justify-between items-center gap-3">
                    <img
                      className="w-40 h-auto max-sm:max-w-[100px]  max-sm:aspect-auto"
                      src={IMG__MENU_ITEM_CDN_URL + item?.imageId}
                      alt={item?.name}
                    />
                    <div className="flex justify-between font-poppins w-20 border bg-slate-50 text-black py-[2px] px-2 cursor-pointer ">
                      <button onClick={() => handleDecFoodItem(item)}>
                        {" "}
                        -{" "}
                      </button>
                      <button onClick={() => handleAddFoodItem(item)}>
                        {" "}
                        +{" "}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </ul>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;

