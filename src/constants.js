export const IMG_CDN_URL =
  "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/";

export const IMG__MENU_ITEM_CDN_URL =
  "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/";

// const CORS_PROXY_URL = "https://cors-anywhere.herokuapp.com/"
const CORS_PROXY_URL = "/api/";

export const API_URL =
  CORS_PROXY_URL +
  "https://www.swiggy.com/dapi/restaurants/list/v5?lat=22.814794130574803&lng=86.09871324151756&page_type=DESKTOP_WEB_LISTING";

export const API_URL2 =
  CORS_PROXY_URL +
  "dapi/restaurants/list/v5?lat=20.351841&lng=85.805154&page_type=DESKTOP_WEB_LISTING";

export const FETCH_MENU_URL =
  CORS_PROXY_URL + "dapi/menu/v4/full?lat=20.351841&lng=85.805154&menuId=";
