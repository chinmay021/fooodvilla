import { createContext } from "react";

const LocationContext = createContext({
  loaded: false,
  coordinates: {
    latitude: "",
    longitude: "",
  },
});
LocationContext.displayName = "LocationContext";

export default LocationContext;
