const CORS_PROXY_URL = "/api/";


export const IMG_CDN_URL =
  "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/";

export const IMG__MENU_ITEM_CDN_URL =
  "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/";

export const API_URL4 =
  CORS_PROXY_URL +
  "/dapi/restaurants/list/v5?page_type=DESKTOP_WEB_LISTING&lat=22.814794130574803&lng=86.09871324151756";

export const API_URL3 =
  CORS_PROXY_URL +
  "/dapi/restaurants/list/v5?pageType=SEE_ALL&page_type=DESKTOP_SEE_ALL_LISTING&";
// export const API_URL3 =
//   CORS_PROXY_URL +
//   "/dapi/restaurants/list/v5?sortBy=RELEVANCE&pageType=SEE_ALL&page_type=DESKTOP_SEE_ALL_LISTING&";

export const API_URL =
  CORS_PROXY_URL + "/dapi/restaurants/list/v5?page_type=DESKTOP_WEB_LISTING&";

export const API_URL2 =
  CORS_PROXY_URL +
  "dapi/restaurants/list/v5?lat=20.351841&lng=85.805154&page_type=DESKTOP_WEB_LISTING";

// export const FETCH_MENU_URL =
//   CORS_PROXY_URL + "dapi/menu/v4/full?lat=20.351841&lng=85.805154&menuId=";
export const FETCH_MENU_URL =
  CORS_PROXY_URL + "/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=22.8235&lng=86.2304589&submitAction=ENTER&restaurantId=";

export const GITHUB_LINK = "https://github.com/chinmay021";

export const GMAIL_LINK = "mailto:chinmaykumar021@gmail.com";

export const LINKEDIN_LINK =
  "https://www.linkedin.com/in/chinmay-kumar-950754144/";

// export const HERE_MAP_API_KEY = "mPRL5FAIhx5miqZZYRUSUONrrYI5p1-6kt2oG_lTMx8";

/* Mock FAQ */
export const FAQ = [
  {
    id: 473,
    title: "Can I edit my order?",
    description:
      "Your order can be edited before it reaches the restaurant. You could contact customer support team via chat or call to do so. Once order is placed and restaurant starts preparing your food, you may not edit its contents",
  },
  {
    id: 474,
    title: "I want to cancel my order",
    description:
      "We will do our best to accommodate your request if the order is not placed to the restaurant (Customer service number:  080-67466729). Please note that we will have a right to charge a cancellation fee up to full order value to compensate our restaurant and delivery partners if your order has been confirmed.",
  },
  {
    id: 475,
    title: "Will Insta Food be accountable for quality/quantity? ",
    description:
      "Quantity and quality of the food is the restaurants' responsibility. However in case of issues with the quality or quantity, kindly submit your feedback and we will pass it on to the restaurant.",
  },
  {
    id: 476,
    title: "Is there a minimum order value?",
    description:
      "We have no minimum order value and you can order for any amount. ",
  },
  {
    id: 477,
    title: "Do you charge for delivery?",
    description:
      "Delivery fee varies from city to city and is applicable if order value is below a certain amount. Additionally, certain restaurants might have fixed delivery fees. Delivery fee (if any) is specified on the 'Review Order' page. ",
  },
  {
    id: 478,
    title: "How long do you take to deliver?",
    description:
      "Standard delivery times vary by the location selected and prevailing conditions. Once you select your location, an estimated delivery time is mentioned for each restaurant.",
  },
  {
    id: 479,
    title: "What are your delivery hours?",
    description:
      "Our delivery hours vary for different locations and depends on availability of supply from restaurant partners.",
  },
  {
    id: 481,
    title: "Is single order from many restaurants possible?",
    description:
      "We currently do not support this functionality. However, you can place orders for individual items from different restaurants.",
  },
];
