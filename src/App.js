import React, { lazy, Suspense, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import Error from "./components/Error";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./utils/store";
import CartPage from "./components/CartPage";
import LocationContext from "./utils/LocationContext";
import useGetLocation from "./utils/useGetLocation";
import AddressContext from "./utils/AddressContext";
import useGetAddress from "./utils/useGetAddress";
// import RestaurantMenu from "./components/RestaurantMenu";
// import Help from "./components/Help";
// import Checkout from "./components/Checkout";
// import Success from "./components/Success";

// App Layout
/**
 * Header
 *  - Logo
 *  - Nav Items(Right side)
 *  - Cart
 * Body
 *  - Search bar
 *  - Restaurant List
 *    - RestaurantCard
 *      - Image
 *      - Name
 *      - Rating
 *      - Cusines
 * Footer
 *  - Links
 *  - CopyRights
 */
const RestaurantMenu = lazy(() => import("./components/RestaurantMenu"));
const Checkout = lazy(() => import("./components/Checkout"));
const Success = lazy(() => import("./components/Success"));
const Help = lazy(() => import("./components/Help"));

const About = lazy(() => import("./components/About"));

const AppLayout = () => {
  const [locationGlobal, setLocationGlobal] = useState(null);
  const [addressGlobal, setAddressGlobal] = useState(null);

  const getAddress = async (latitude, longitude) => {
    const response = await fetch(
      `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${latitude}%2C${longitude}&lang=en-US&apiKey=${process.env.REACT_APP_HERE_API_KEY}`
    );
    const data = await response.json();
    // console.log("getAddress", data);
    // console.log(data?.items?.[0]?.address?.label);
    setAddressGlobal(data?.items?.[0]?.address?.label);
  };

  //get location code
  async function ipLookUp() {
    const response = await fetch("https://ipapi.co/json");
    const data = await response.json();
    setLocationGlobal({
      loaded: true,
      coordinates: {
        latitude: data.latitude,
        longitude: data.longitude,
      },
    });
  }

  function showError(error) {
    console.error("An error has occured while retrieving location", error);
    ipLookUp();
  }

  function showPosition(position) {
    setLocationGlobal({
      loaded: true,
      coordinates: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
    });
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
      // console.log("here");
    } else {
      console.log("Geolocation API not supported.");
      ipLookUp();
    }
  }, []);

  useEffect(() => {
    if (locationGlobal?.coordinates?.latitude) {
      getAddress(
        locationGlobal?.coordinates?.latitude,
        locationGlobal?.coordinates?.longitude
      );
    }
  }, [locationGlobal]);

  return (
    <Provider store={store}>
      {/* {console.log("rendered app")} */}
      <div
        className={`m-auto w-[80vw] min-w-[80vw] min-h-screen flex flex-col box-border border`}
      >
        <AddressContext.Provider
          value={{
            addressGlobal: addressGlobal,
            setAddressGlobal: setAddressGlobal,
          }}
        >
          <LocationContext.Provider
            value={{
              locationGlobal: locationGlobal,
              setLocationGlobal: setLocationGlobal,
            }}
          >
            <Header />
            <Suspense fallback={<div>loading...</div>}>
              <Outlet />
            </Suspense>
            <Footer />
          </LocationContext.Provider>
        </AddressContext.Provider>
      </div>
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/help",
        element: <Help />,
      },
      {
        path: "/restaurant/:resId",
        element: <RestaurantMenu />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/success/:orderId",
        element: <Success />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);
