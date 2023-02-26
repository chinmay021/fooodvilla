import { useEffect, useState } from "react";

const useGetLocation = () => {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: {
      latitude: "",
      longitude: "",
    },
  });

  async function ipLookUp() {
    const response = await fetch("https://ipapi.co/json");
    const data = await response.json();
    setLocation({
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
    setLocation({
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

  return location;
};

export default useGetLocation;
