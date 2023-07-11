import { useParams } from "react-router-dom";
import { IMG_CDN_URL } from "../constants";
import { IMG__MENU_ITEM_CDN_URL } from "../constants";
import Shimmer from "./Shimmer";
import useRestaurantDetails from "../utils/useRestaurantDetails";
import { addItem, decreamentItem } from "../utils/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./Cart";
import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const RestaurantMenu = () => {
  //how to read dynamic URL parameters
  const { resId } = useParams();

  const restaurant = useRestaurantDetails(resId);
  const restaurantDetails = restaurant && restaurant[0].card.card.info;
  const menuDetails =
    restaurant &&
    restaurant[restaurant.length - 1].groupedCard.cardGroupMap.REGULAR.cards;
  // menuDetails &&
  //   console.log(
  //     menuDetails
  //       .filter((el) => el.card.card["@type"].includes("ItemCategory"))
  //       .map((el) => el.card.card)
  //   );

  const [activeCategory, setActiveCategory] = useState("");

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

  //  console.log(menuPageHeight);
  const handleClick = (e) => {
    if (e.target.tagName != "LI") return;
    // console.log(e.target, e.target.innerText);
    let ele = e.target;
    let cartegoryLi = document.querySelectorAll(".category-name");
    // console.log(Array.from(li).map(el => el.innerText));
    if (activeCategory !== ele.innerText) {
      setActiveCategory(ele.innerText);
      cartegoryLi.forEach((category) => {
        category.classList.remove("bg-slate-800", "text-white", "font-medium");
      });
      ele.classList.add("bg-slate-800", "text-white", "font-medium");
    }
    //scroll category menu into view
    let menuList = document.querySelectorAll(
      ".NestedCategory-heading-name, .category-heading-name"
    );
    let targetElement = Array.from(menuList).filter(
      (category) =>
        category.innerText === ele.innerText.slice(0, category.innerText.length)
    )[0];
    let parentContainer = document.querySelector(".menu-wrapper");
    let topOffsetValue =
      window.innerWidth < 1090
        ? targetElement.offsetTop - "750"
        : targetElement.offsetTop - "530";
    parentContainer.scrollTo({
      top: topOffsetValue,
      behavior: "smooth",
    });
  };

  const handleCategoryToggle = (e) => {
    // console.log(e.target.tagName, e.target.parentNode);
    let element = e.target;
    if (
      e.target.tagName.toLowerCase() === "svg" ||
      e.target.tagName.toLowerCase() === "polyline"
    ) {
      element = e.target.closest(".category-heading");
      let svgTag = e.target.closest("svg");
      svgTag.classList.toggle("rotate-180");
      let parent = element.closest(".category-heading");
      let nextSibling = parent.nextElementSibling;
      // console.log(parent, nextSibling)
      if (nextSibling.classList.contains("items-wrapper")) {
        // console.log(nextSibling);
        nextSibling.classList.toggle("hidden");
      }
    }
  };

  return restaurant === null ? (
    <Shimmer />
  ) : (
    <>
      <div className="menu-page flex-1 caret-transparent ">
        <div className="bg-slate-50 w-full">
          {/* hero-section */}
          <div className="res-details font-poppins flex gap-10 flex-wrap justify-center bg-[#171a29] text-white my-10 p-10 ">
            <img
              loading="lazy"
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
          {/* new menu */}
          <div className=" new-menu  xl:pxx-[23rem] pl-10">
            {/* {console.log("rerender")} */}
            <div className="header text-[26px] font-semibold border-b-gray-800  text-gray-800 w-full border-b pb-2 pl-7 font-poppins">
              Menu
            </div>
            <div className="category-menu flex pt-2 max-h-fit">
              <div className="categories border-r border-r-gray-800  w-40 text-sm xl:w-56 xl:text-base">
                <ul
                  className="cursor-pointer font-poppins "
                  onClick={(e) => handleClick(e)}
                >
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
                              className="py-2 px-6 category-name"
                            >
                              {category.title +
                                " (" +
                                category.categories.length +
                                ")"}
                            </li>
                            {category.categories.map((subCategory) => (
                              <li
                                key={index + subCategory.title}
                                className="py-2 px-6 category-name"
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
                            className="py-2 px-6 category-name"
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
              <div className={`menu flex-1 flex max-h-[120vh] `}>
                <div
                  className="menu-wrapper flex-1 px-8 font-poppins bg-white overflow-y-auto  "
                  onClick={(e) => handleCategoryToggle(e)}
                >
                  {menuDetails.map((category, index) => {
                    if (
                      category.card.card["@type"].includes(
                        ".NestedItemCategory"
                      )
                    ) {
                      return (
                        <div className="nestedCategory" key={index}>
                          <div className="nestedCategory-heading font-bold text-[#a87d1f] text-2xl border-b-2 pb-2 border-slate-300 rounded py-4">
                            <span className="NestedCategory-heading-name">
                              {category.card.card.title}
                            </span>
                          </div>
                          {category.card.card.categories.map(
                            (subCategory, index) => {
                              return (
                                <div
                                  className="category pt-4 border-b-8 "
                                  key={index}
                                >
                                  <div className="category-heading flex items-center justify-between py-4 font-extrabold text-lg text-[#a87d1f] ">
                                    <span className="category-heading-name">
                                      {subCategory.title}
                                    </span>
                                    <span>
                                      <FiChevronDown className="category-toggle text-2xl cursor-pointer " />
                                    </span>
                                  </div>
                                  <div className="items-wrapper">
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
                                </div>
                              );
                            }
                          )}
                        </div>
                      );
                    } else if (
                      category.card.card["@type"].includes(".ItemCategory")
                    ) {
                      return (
                        <div className="category pt-4 border-b-8 " key={index}>
                          <div className="category-heading flex items-center justify-between py-4 font-extrabold text-lg text-[#a87d1f] ">
                            <span className="category-heading-name">
                              {category.card.card.title}
                            </span>
                            <span>
                              <FiChevronDown className="text-2xl cursor-pointer" />
                            </span>
                          </div>
                          <div className="items-wrapper">
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
                        </div>
                      );
                    }
                  })}
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
