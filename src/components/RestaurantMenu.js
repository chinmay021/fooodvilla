import { useParams } from "react-router-dom";
import { IMG_CDN_URL } from "../constants";
import { IMG__MENU_ITEM_CDN_URL } from "../constants";
import Shimmer from "./Shimmer";
import useRestaurantDetails from "../utils/useRestaurantDetails";

const RestaurantMenu = () => {
  //how to read dynamic URL parameters
  const { resId } = useParams();

  const restaurant = useRestaurantDetails(resId);

  return restaurant === null ? (
    <Shimmer />
  ) : (
    <>
      <div className="font-fira-code flex flex-wrap justify-center bg-[#171a29] text-white m-3 p-10 rounded-md ">
        <img
          className="w-80 h-52 rounded-md"
          src={IMG_CDN_URL + restaurant.cloudinaryImageId}
          alt=""
        />
        <div className="ml-20 ">
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
      <div className="bg-[#f8fcfd] w-2/3 m-auto font-poppins flex p-3 justify-center">
        <div className="w-full">
          {Object.values(restaurant?.menu?.items).map((item) => {
            return (
              <div
                className="flex flex-wrap justify-between m-5 p-5 border-b-[1px] border-black"
                key={item.id}
              >
                <div className="flex gap-3 flex-col max-w-3xl">
                  <div className="font-poppins font-bold max-sm:text-sm">
                    {item.name}
                  </div>
                  <div>&#8377; {item.price / 100}</div>
                  <div className="text-[#666666] max-sm:mb-2 max-sm:text-sm">
                    {item.description}
                  </div>
                </div>
                <div className=" w-40 flex flex-col justify-between items-center gap-3">
                  <img
                    className="w-40 aspect-auto max-sm:max-w-[100px]  max-sm:aspect-auto"
                    src={IMG__MENU_ITEM_CDN_URL + item?.cloudinaryImageId}
                    alt=""
                    onError={(event) => (event.target.style.display = "none")}
                  />
                  <button className="font-poppins w-28 h-8 bg-white cursor-pointer border border-black p-1 max-sm:text-sm">
                    Add to cart
                  </button>
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
