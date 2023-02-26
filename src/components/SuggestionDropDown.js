import { TfiLocationPin } from "react-icons/tfi";
import { useContext, useState, useEffect, lazy } from "react";
import AddressContext from "../utils/AddressContext";
import LocationContext from "../utils/LocationContext";
import Map from "./Map";

const SuggestionDropDown = ({
  suggestions,
  searchText,
  loading,
  setToggle,
  setSearchText,
}) => {
  // const location = useContext(AddressContext);
  const { setAddressGlobal } = useContext(AddressContext);
  const { locationGlobal, setLocationGlobal } = useContext(LocationContext);
  const [location, setLocation] = useState({});
  const [address, setAddress] = useState("");

  const getLocation = async (searchParam) => {
    const response = await fetch(
      `https://geocode.search.hereapi.com/v1/geocode?q=${searchParam}&apiKey=${process.env.REACT_APP_HERE_API_KEY}`
    );
    const data = await response.json();
    // console.log(data?.items?.[0]);
    // setLocationGlobal({
    //   loaded: true,
    //   coordinates: {
    //     latitude: data?.items?.[0]?.position?.lat,
    //     longitude: data?.items?.[0]?.position?.lng,
    //   },
    // });
    setLocation({
      latitude: data?.items?.[0]?.position?.lat,
      longitude: data?.items?.[0]?.position?.lng,
    });
  };

  return (
    <div className="w-full font-poppins ">
      {/* {console.log("suggesiton re-render")} */}
      {searchText && !loading && (
        <div>
          <div className="" id="suggestion">
            {suggestions.map((suggestion) => {
              return (
                <div
                  className="border-b-2 w-full border-dotted flex items-center py-5 px-6 cursor-pointer"
                  key={suggestion?.id}
                  onClick={() => {
                    // setAddressGlobal(suggestion?.address?.label);
                    // {
                    //   console.log(suggestion);
                    // }
                    getLocation(suggestion?.title);
                    setAddress(suggestion?.title);
                    document.getElementById("suggestion").style.display =
                      "none";
                    // setSearchText("");
                    // setVisible(false);
                    // setToggle(false);
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
          {document.getElementById("suggestion")?.style?.display === "none" && (
            <Map location={location} address={address} setToggle={setToggle} />
          )}
        </div>
      )}
    </div>
  );
};

export default SuggestionDropDown;
