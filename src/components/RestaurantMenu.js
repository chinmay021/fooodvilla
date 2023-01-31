import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IMG_CDN_URL } from "../constants";
import { IMG__MENU_ITEM_CDN_URL } from "../constants";
import Shimmer from "./Shimmer";

const RestaurantMenu = () => {
  //how to read dynamic URL parameters
  const { resId } = useParams();
  //   console.log(resId);

  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    getRestaurantInfo();
  }, []);

  async function getRestaurantInfo() {
    const data = await fetch(
      "https://www.swiggy.com/dapi/menu/v4/full?lat=22.814794130574803&lng=86.09871324151756&menuId=" +
     resId 
    );
    const json = await data.json();
    // console.log(json.data);
    setRestaurant(json.data);
    console.log(restaurant);
  }

  return restaurant === null ? (
    <Shimmer />
  ) : (
    <>
      <div className="hero-section">
        <img src={IMG_CDN_URL + restaurant.cloudinaryImageId} alt="" />
        <div className="hero-section-details">
          <h1>{restaurant.name}</h1>
          <span>{restaurant.cuisines.join(", ")}</span>
          <div className="hero-section-extra-details ">
            <div className="hero-section-ratings item">
              <div className="rating">{restaurant.avgRatingString} stars </div>
              <br />
              <div className="rating-details item2">
                {restaurant.totalRatingsString}
              </div>
            </div>
            <div className="hero-section-deliveryTime item">
              <div className="deliveryTime">{restaurant.sla.slaString}</div>
              <br />
              <div className="deliveryDetail item2">Delivery Time</div>
            </div>
            <div className="hero-section-cost">
              <div className="cost">&#8377; {restaurant.costForTwo / 100}</div>
              <br />
              <div className="costDetail item2">Cost for Two</div>
            </div>
          </div>
        </div>
      </div>
      <div className="menu-section">
        <div className="menu-item-container">
          {Object.values(restaurant?.menu?.items).map((item) => {
            return (
              <div className="menu-item" key={item.id}>
                <div className="item-details">
                  <div className="item-name">{item.name}</div>
                  <div className="item-price">&#8377; {item.price / 100}</div>
                  <div className="item-desc">{item.description}</div>
                </div>
                <div className="item-img">
                  <img
                    src={IMG__MENU_ITEM_CDN_URL + item?.cloudinaryImageId}
                    alt=""
                    onError={(event) => (event.target.style.display = "none")}
                  />
                  <button className="add-to-cart-btn">Add to cart</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default RestaurantMenu;
