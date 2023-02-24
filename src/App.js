import React, {
  lazy,
  Suspense,
  useState,
  useMemo,
  useRef,
  useEffect,
} from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import Error from "./components/Error";
import Help from "./components/Help";
import RestaurantMenu from "./components/RestaurantMenu";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./utils/store";
import CartPage from "./components/CartPage";
import LocationContext from "./utils/LocationContext";
import useGetLocation from "./utils/useGetLocation";
import AddressContext from "./utils/AddressContext";
import useGetAddress from "./utils/useGetAddress";

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

const About = lazy(() => import("./components/About"));
const AppLayout = () => {
  const [locationGlobal, setLocationGlobal] = useState(null);
  const [addressGlobal, setAddressGlobal] = useState(null);

  //get address code
  const getAddress = async (latitude, longitude) => {
    console.log("get address api called", latitude, longitude);
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "c0ac3ed3c5msh912f807c2948756p1f14e9jsn8b9e8a4bb0be",
        "X-RapidAPI-Host": "trueway-geocoding.p.rapidapi.com",
      },
    };
    const response = await fetch(
      `https://trueway-geocoding.p.rapidapi.com/ReverseGeocode?location=${latitude}%20%2C${longitude}&language=en`,
      options
    );
    console.log(latitude, longitude);
    const data = await response.json();
    console.log(data);
    setAddressGlobal(data?.results?.[0]?.address);
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
    getAddress(
      locationGlobal?.coordinates?.latitude,
      locationGlobal?.coordinates?.longitude
    );
  }, [locationGlobal]);

  return (
    <Provider store={store}>
      {console.log("rendered app")}
      <div
        className={`m-auto w-fit min-w-[80vw] min-h-screen flex flex-col box-border border`}
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
            <Outlet />
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
        element: (
          <Suspense>
            <About />
          </Suspense>
        ),
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
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);
