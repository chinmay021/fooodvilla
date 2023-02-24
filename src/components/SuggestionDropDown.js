import React from "react";
import { TfiLocationPin } from "react-icons/tfi";
import { useContext } from "react";
import AddressContext from "../utils/AddressContext";
import LocationContext from "../utils/LocationContext";

const SuggestionDropDown = ({
  suggestions,
  searchText,
  loading,
  setToggle,
}) => {
  // const location = useContext(AddressContext);
  const { setAddressGlobal } = useContext(AddressContext);
  const { locationGlobal, setLocationGlobal } = useContext(LocationContext);

  const getLocation = async (searchParam) => {
    const response = await fetch(
      `https://geocode.search.hereapi.com/v1/geocode?q=${searchParam}&apiKey=mPRL5FAIhx5miqZZYRUSUONrrYI5p1-6kt2oG_lTMx8`
    );
    const data = await response.json();
    console.log(data?.items?.[0]);
    setLocationGlobal({
      loaded: true,
      coordinates: {
        latitude: data?.items?.[0]?.position?.lat,
        longitude: data?.items?.[0]?.position?.lng,
      },
    });
  };

  return (
    <div className="w-full font-poppins ">
      {searchText && !loading && (
        <div className="">
          {suggestions.map((suggestion) => {
            return (
              <div
                className="border-b-2 w-full border-dotted flex items-center py-5 px-6 cursor-pointer"
                key={suggestion?.id}
                onClick={() => {
                  setAddressGlobal(suggestion?.address?.label);
                  {
                    console.log(suggestion);
                  }
                  getLocation(suggestion?.title);
                  setToggle(false);
                }}
              >
                <TfiLocationPin className="w-[50px]  text-orange-500 " />
                <div className="">
                  <span className="font-bold text-sm block hover:text-orange-500 duration-100 ">
                    {suggestion?.address?.label.split(",", 1)}
                  </span>
                  <span className="text-xs">
                    {suggestion?.address?.label.substring(
                      suggestion?.address?.label.indexOf(",") + 1
                    )}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SuggestionDropDown;
