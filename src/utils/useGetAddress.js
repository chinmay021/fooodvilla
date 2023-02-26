import { useContext, useEffect, useState } from "react";
import LocationContext from "./LocationContext";

const useGetAddress = () => {
  const [address, setAddress] = useState("");
  // console.log(location);
  const location = useContext(LocationContext);
  // console.log(location?.coordinates?.latitude, location?.coordinates?.longitude);

  const getAddress = async (latitude, longitude) => {
    // console.log("get address api called");
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
    // console.log("useAddress->",latitude, longitude);
    const data = await response.json();
    setAddress(data?.results?.[0]?.address);
  };

  useEffect(() => {
    getAddress(location?.coordinates?.latitude, location?.coordinates?.longitude);
  }, [location?.coordinates?.latitude, location?.coordinates?.longitude]);

  return address;
};

export default useGetAddress;
