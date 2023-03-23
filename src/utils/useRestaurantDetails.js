import { useState, useEffect } from "react";
import { FETCH_MENU_URL1,
  MENU_ITEM_TYPE_KEY,
  RESTAURANT_TYPE_KEY, } from "../constants";

const useRestaurantDetails = (resId) => {
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
    }
  }

  return restaurant;
};

export default useRestaurantDetails;
