import { useParams } from "react-router-dom";
import { IMG_CDN_URL } from "../constants";
import { IMG__MENU_ITEM_CDN_URL } from "../constants";
import Shimmer from "./Shimmer";
import useRestaurantDetails from "../utils/useRestaurantDetails";
import { addItem, decreamentItem } from "../utils/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./Cart";
import React from "react";
import { FiChevronDown } from "react-icons/fi";

const RestaurantMenu = () => {
  //how to read dynamic URL parameters
  const { resId } = useParams();

  const restaurant = useRestaurantDetails(resId);
  const restaurantDetails = restaurant && restaurant[0].card.card.info;
  const menuDetails =
    restaurant &&
    restaurant[restaurant.length - 1].groupedCard.cardGroupMap.REGULAR.cards;
  menuDetails &&
    console.log(
      menuDetails
        .filter((el) => el.card.card["@type"].includes("ItemCategory"))
        .map((el) => el.card.card)
    );

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
      <div className="flex-1 caret-transparent">
        <div className="bg-slate-50 w-full">
          {/* hero-section */}
          <div className="font-poppins flex gap-10 flex-wrap justify-center bg-[#171a29] text-white my-10 p-10 ">
            <img loading="lazy"
              className="w-80 h-52 rounded-sm"
              src={IMG_CDN_URL + restaurantDetails?.cloudinaryImageId}
              alt="restaurant dish image"
            />
            <div className="">
              <span
                className="block font-semibold text-2xl mb-4 max-sm:mt-5 max-sm:ml-4 max-sm:text-sm
          "
              >
                {restaurantDetails.name}
              </span>
              <span className="max-sm:ml-4 max-sm:text-sm">
                {restaurantDetails.cuisines.join(", ")}
              </span>
              <div className="flex  justify-between gap-12 pt-5 font-semibold text-base mt-7">
                <div className="pr-9 border-r-[1px] border-white">
                  <div>{restaurantDetails.avgRatingString} stars </div>
                  <br />
                  <div className="text-sm font-extralight">
                    {restaurantDetails.totalRatingsString}
                  </div>
                </div>
                <div className=" pr-9 border-r-[1px] border-white">
                  <div>{restaurantDetails.sla.slaString}</div>
                  <br />
                  <div className="text-sm font-extralight">Delivery Time</div>
                </div>
                <div>
                  <div>&#8377; {restaurantDetails.costForTwo / 100}</div>
                  <br />
                  <div className="text-sm font-extralight">Cost for Two</div>
                </div>
              </div>
            </div>
          </div>
          {/* menu */}
          {/* <div className="flex ">
            <div className="bg-white w-2/3 m-auto font-poppins flex p-3 justify-center">
              <div className="w-full" data-testid="menu">
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
                          <button
                            onClick={() => handleDecreamentFoodItem(item)}
                          >
                            -
                          </button>
                          <span>{getItemCount(item)}</span>
                          <button
                            data-testid="addBtn"
                            onClick={() => handleAddFoodItem(item)}
                          >
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
          </div> */}
          {/* new menu */}
          <div className=" new-menu  xl:pxx-[23rem] pl-10">
            <div className="header text-[26px] font-semibold border-b-gray-800  text-gray-800 w-full border-b pb-2 pl-7 font-poppins">
              Menu
            </div>
            <div className="category-menu flex pt-2">
              <div className="categories border-r border-r-gray-800  w-40 text-sm xl:w-56 xl:text-base">
                <ul className="cursor-pointer font-poppins ">
                  {/* TODO need to fix the key here */}
                  {menuDetails
                    .filter((el) =>
                      el.card.card["@type"].includes("ItemCategory")
                    )
                    .map((el) => el.card.card)
                    .map((category, index) => {
                      if ("categories" in category) {
                        return (
                          <React.Fragment key={index}>
                            <li
                              key={index + category.title}
                              className={
                                index === 2
                                  ? "bg-slate-800 text-white font-medium py-2 px-6"
                                  : "py-2 px-6"
                              }
                            >
                              {category.title +
                                " (" +
                                category.categories.length +
                                ")"}
                            </li>
                            {category.categories.map((subCategory) => (
                              <li
                                key={index + subCategory.title}
                                className={
                                  index === 2
                                    ? "bg-slate-800 text-white font-medium py-2 px-6"
                                    : "py-2 px-6"
                                }
                              >
                                {subCategory.title +
                                  " (" +
                                  subCategory.itemCards.length +
                                  ")"}
                              </li>
                            ))}
                          </React.Fragment>
                        );
                      } else {
                        return (
                          <li
                            key={index + category.title}
                            className={
                              index === 2
                                ? "bg-slate-800 text-white font-medium py-2 px-6"
                                : "py-2 px-6"
                            }
                          >
                            {category.title +
                              " (" +
                              category.itemCards?.length +
                              ")"}
                          </li>
                        );
                      }
                    })}
                </ul>
              </div>
              <div className="menu flex-1 flex">
                <div className="">
                  {/* <div className="bg-white w-2/3 m-auto font-poppins flex p-3 justify-center"> */}
                  {/* OLD MENU */}
                  {/* <div className="w-full" data-testid="menu">
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
                                src={
                                  IMG__MENU_ITEM_CDN_URL +
                                  item?.cloudinaryImageId
                                }
                                alt="dish image"
                                onError={(event) =>
                                  (event.target.style.display = "none")
                                }
                              />
                              <div className="flex justify-between font-poppins w-20 border bg-slate-50 text-black py-[2px] px-2">
                                <button
                                  onClick={() => handleDecreamentFoodItem(item)}
                                >
                                  -
                                </button>
                                <span>{getItemCount(item)}</span>
                                <button
                                  data-testid="addBtn"
                                  onClick={() => handleAddFoodItem(item)}
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div> */}
                  {/* NEW MENU*/}
                  {/* <div className="">
                      {menuDetails.map(category => {
                        if(category["@type"].includes(".ItemCategory")){

                        }else if (category["@type"].includes(".NestedItemCategory")){

                        }
                      })}
                    </div> */}
                  <div className="menu-wrapper px-8 font-poppins">
                    {console.log(menuDetails, "menuDetails")}
                    {menuDetails.map((category, index) => {
                      if (
                        category.card.card["@type"].includes(
                          ".NestedItemCategory"
                        )
                      ) {
                        return (
                          <div className="nestedCategory" key={index}>
                            <div className="nestedCategory-heading font-bold text-[#a87d1f] text-2xl border-b-2 pb-2 border-slate-300 rounded py-4">
                              <span>{category.card.card.title}</span>
                            </div>
                            {category.card.card.categories.map(
                              (subCategory, index) => {
                                return (
                                  <div
                                    className="category pt-4 border-b-8 "
                                    key={index}
                                  >
                                    <div className="category-heading flex items-center justify-between py-4 font-extrabold text-lg text-[#a87d1f] ">
                                      <span>{subCategory.title}</span>
                                      <span>
                                        <FiChevronDown className="text-2xl cursor-pointer" />
                                      </span>
                                    </div>
                                    {subCategory.itemCards.map((item) => {
                                      return (
                                        <div
                                          className={`items flex justify-between py-4 pl-4 border-b gap-2 text-[#3e4152]`}
                                          key={item.card.info.id}
                                        >
                                          <div className="item-details  flex gap-3 flex-col max-w-md">
                                            <div className="font-poppins  max-sm:text-sm font-semibold">
                                              {item.card.info.name}
                                            </div>
                                            <div>
                                              &#8377;{" "}
                                              {item.card.info.price / 100}
                                            </div>
                                            <div className="text-[#666666] max-sm:mb-2 text-sm max-sm:text-sm ">
                                              {item.card.info?.description}
                                            </div>
                                          </div>
                                          <div className="item-image-cart min-w-[10rem] flex flex-col justify-between items-center gap-3">
                                            <img
                                              loading="lazy"
                                              className="w-40 h-auto max-sm:max-w-[100px]  max-sm:aspect-auto"
                                              src={
                                                IMG_CDN_URL +
                                                item.card.info.imageId
                                              }
                                              alt="dish image"
                                              onError={(event) =>
                                                (event.target.style.display =
                                                  "none")
                                              }
                                            />
                                            <div className="flex justify-between font-poppins w-20 border bg-slate-50 text-black py-[2px] px-2">
                                              <button
                                                onClick={() =>
                                                  handleDecreamentFoodItem(
                                                    item.card.info
                                                  )
                                                }
                                              >
                                                -
                                              </button>
                                              <span>
                                                {getItemCount(item.card.info)}
                                              </span>
                                              <button
                                                data-testid="addBtn"
                                                onClick={() =>
                                                  handleAddFoodItem(
                                                    item.card.info
                                                  )
                                                }
                                              >
                                                +
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                );
                              }
                            )}
                            {/* <div
                              className="category pt-4 border-b-8  2xl:pr-44"
                              key={index}
                            >
                              <div className="category-heading flex items-center justify-between py-4 font-extrabold text-lg text-black ">
                                <span>{category.card.card.title}</span>
                                <span>
                                  <FiChevronDown className="text-2xl cursor-pointer" />
                                </span>
                              </div>
                              {category.card.card.itemCards.map((item) => {
                                return (
                                  <div
                                    className={`items flex justify-between py-4 pl-4 border-b gap-2 text-[#3e4152]`}
                                    key={item.card.info.id}
                                  >
                                    <div className="item-details  flex gap-3 flex-col max-w-md">
                                      <div className="font-poppins  max-sm:text-sm font-semibold">
                                        {item.card.info.name}
                                      </div>
                                      <div>
                                        &#8377; {item.card.info.price / 100}
                                      </div>
                                      <div className="text-[#666666] max-sm:mb-2 text-sm max-sm:text-sm ">
                                        {item.card.info?.description}
                                      </div>
                                    </div>
                                    <div className="item-image-cart min-w-[10rem] flex flex-col justify-between items-center gap-3">
                                      <img
                                        loading="lazy"
                                        className="w-40 h-auto max-sm:max-w-[100px]  max-sm:aspect-auto"
                                        src={
                                          IMG_CDN_URL + item.card.info.imageId
                                        }
                                        alt="dish image"
                                        onError={(event) =>
                                          (event.target.style.display = "none")
                                        }
                                      />
                                      <div className="flex justify-between font-poppins w-20 border bg-slate-50 text-black py-[2px] px-2">
                                        <button
                                          onClick={() =>
                                            handleDecreamentFoodItem(
                                              item.card.info
                                            )
                                          }
                                        >
                                          -
                                        </button>
                                        <span>
                                          {getItemCount(item.card.info)}
                                        </span>
                                        <button
                                          data-testid="addBtn"
                                          onClick={() =>
                                            handleAddFoodItem(item.card.info)
                                          }
                                        >
                                          +
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div> */}
                          </div>
                        );
                      } else if (
                        category.card.card["@type"].includes(".ItemCategory")
                      ) {
                        return (
                          <div
                            className="category pt-4 border-b-8 "
                            key={index}
                          >
                            <div className="category-heading flex items-center justify-between py-4 font-extrabold text-lg text-[#a87d1f] ">
                              <span>{category.card.card.title}</span>
                              <span>
                                <FiChevronDown className="text-2xl cursor-pointer" />
                              </span>
                            </div>
                            {category.card.card.itemCards.map((item) => {
                              return (
                                <div
                                  className={`items flex justify-between py-4 pl-4 border-b gap-2 text-[#3e4152]`}
                                  key={item.card.info.id}
                                >
                                  <div className="item-details  flex gap-3 flex-col max-w-md">
                                    <div className="font-poppins  max-sm:text-sm font-semibold">
                                      {item.card.info.name}
                                    </div>
                                    <div>
                                      &#8377; {item.card.info.price / 100}
                                    </div>
                                    <div className="text-[#666666] max-sm:mb-2 text-sm max-sm:text-sm ">
                                      {item.card.info?.description}
                                    </div>
                                  </div>
                                  <div className="item-image-cart min-w-[10rem] flex flex-col justify-between items-center gap-3">
                                    <img
                                      loading="lazy"
                                      className="w-40 h-auto max-sm:max-w-[100px]  max-sm:aspect-auto"
                                      src={IMG_CDN_URL + item.card.info.imageId}
                                      alt="dish image"
                                      onError={(event) =>
                                        (event.target.style.display = "none")
                                      }
                                    />
                                    <div className="flex justify-between font-poppins w-20 border bg-slate-50 text-black py-[2px] px-2">
                                      <button
                                        onClick={() =>
                                          handleDecreamentFoodItem(
                                            item.card.info
                                          )
                                        }
                                      >
                                        -
                                      </button>
                                      <span>
                                        {getItemCount(item.card.info)}
                                      </span>
                                      <button
                                        data-testid="addBtn"
                                        onClick={() =>
                                          handleAddFoodItem(item.card.info)
                                        }
                                      >
                                        +
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
                {/* CART RIGHT SIDE */}
                {cartItems.length === 0 ? (
                  <div className="hidden 2xl:block">
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
                  <Cart className="hidden 2xl:block" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default RestaurantMenu;
