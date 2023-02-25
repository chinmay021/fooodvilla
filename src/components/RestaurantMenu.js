import { useParams } from "react-router-dom";
import { IMG_CDN_URL } from "../constants";
import { IMG__MENU_ITEM_CDN_URL } from "../constants";
import Shimmer from "./Shimmer";
import useRestaurantDetails from "../utils/useRestaurantDetails";
import { addItem, decreamentItem } from "../utils/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./Cart";
const RestaurantMenu = () => {
  //how to read dynamic URL parameters
  const { resId } = useParams();

  const restaurant = useRestaurantDetails(resId);

  const disptach = useDispatch();

  const handleAddFoodItem = (item) => {
    disptach(addItem(item));
  };
  const handleDecreamentFoodItem = (item) => {
    disptach(decreamentItem(item));
  };

  const cartItems = useSelector((store) => store.cart.items);

  const getItemCount = (item) => {
    const currentItem = cartItems.find((cartItem) => item.id === cartItem.id);
    return currentItem ? currentItem.quantity : 0;
  };

  return restaurant === null ? (
    <Shimmer />
  ) : (
    <>
      <div className="bg-slate-50 w-fit">
        <div className="font-poppins flex gap-10 flex-wrap justify-center bg-[#171a29] text-white my-10 p-10 ">
          <img
            className="w-80 h-52 rounded-sm"
            src={IMG_CDN_URL + restaurant?.cloudinaryImageId}
            alt="restaurant dish image"
          />
          <div className="">
            <span
              className="block font-semibold text-2xl mb-4 max-sm:mt-5 max-sm:ml-4 max-sm:text-sm
          "
            >
              {restaurant.name}
            </span>
            <span className="max-sm:ml-4 max-sm:text-sm">
              {restaurant.cuisines.join(", ")}
            </span>
            <div className="flex  justify-between gap-12 pt-5 font-semibold text-base mt-7">
              <div className="pr-9 border-r-[1px] border-white">
                <div>{restaurant.avgRatingString} stars </div>
                <br />
                <div className="text-sm font-extralight">
                  {restaurant.totalRatingsString}
                </div>
              </div>
              <div className=" pr-9 border-r-[1px] border-white">
                <div>{restaurant.sla.slaString}</div>
                <br />
                <div className="text-sm font-extralight">Delivery Time</div>
              </div>
              <div>
                <div>&#8377; {restaurant.costForTwo / 100}</div>
                <br />
                <div className="text-sm font-extralight">Cost for Two</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex ">
          <div className="bg-white w-2/3 m-auto font-poppins flex p-3 justify-center">
            <div className="w-full">
              {Object.values(restaurant?.menu?.items).map((item) => {
                return (
                  <div
                    className="flex  justify-between m-5 p-5 border-b"
                    key={item.id}
                  >
                    <div className="flex gap-3 flex-col max-w-md">
                      <div className="font-poppins font-bold max-sm:text-sm">
                        {item.name}
                      </div>
                      <div>&#8377; {item.price / 100}</div>
                      <div className="text-[#666666] max-sm:mb-2 text-sm max-sm:text-sm">
                        {item.description}
                      </div>
                    </div>
                    <div className=" w-40 flex flex-col justify-between items-center gap-3">
                      <img
                        className="w-40 h-auto max-sm:max-w-[100px]  max-sm:aspect-auto"
                        src={IMG__MENU_ITEM_CDN_URL + item?.cloudinaryImageId}
                        alt="dish image"
                        onError={(event) =>
                          (event.target.style.display = "none")
                        }
                      />
                      <div className="flex justify-between font-poppins w-20 border bg-slate-50 text-black py-[2px] px-2">
                        <button onClick={() => handleDecreamentFoodItem(item)}>
                          -
                        </button>
                        <span>{getItemCount(item)}</span>
                        <button onClick={() => handleAddFoodItem(item)}>
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {cartItems.length === 0 ? (
            <div>
              <div className="flex w-[508px] flex-col gap-4 justify-center items-center  m-8 p-8 bg-white shadow-md">
                <img
                  className="w-96"
                  src={
                    "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0"
                  }
                  alt="empty cart"
                />
                <span className="font-poppins font-bold">
                  Your cart is empty
                </span>
              </div>
            </div>
          ) : (
            <Cart />
          )}
        </div>
      </div>
    </>
  );
};

export default RestaurantMenu;
