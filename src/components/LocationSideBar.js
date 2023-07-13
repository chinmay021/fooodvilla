import { useState, lazy, Suspense, useEffect } from "react";
// import SuggestionDropDown from "./SuggestionDropDown";
import { GrFormClose } from "react-icons/gr";
import useDebounce from "../utils/useDebounce";

const SuggestionDropDown = lazy(() => import("./SuggestionDropDown"));

const LocationSideBar = ({ isVisible, setToggle }) => {
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAutoCompletion = async (text) => {
    // console.log("text", text);
    const suggestions = await fetch(
      `https://autocomplete.search.hereapi.com/v1/autocomplete?q=${text}&apiKey=${process.env.REACT_APP_HERE_API_KEY}&in=countryCode%3AIND`
    );
    const data = await suggestions.json();
    setSuggestions(data?.items);
    setLoading(false);
  };

  // const debounce = (callback, delay) => {
  //   let timer;
  //   console.log("clled");
  //   return function (...args) {
  //     console.log("inside");
  //     clearTimeout(timer);
  //     let context = this;
  //     timer = setTimeout(() => callback.apply(context, args), delay);
  //   };
  // };
  // const debounceSuggestion = useCallback(debounce(getAutoCompletion, 300), []);

  const debounceSearchText = useDebounce(searchText, 200);

  useEffect(() => {
    debounceSearchText?.length > 2 && getAutoCompletion(debounceSearchText);
  }, [debounceSearchText]);

  return (
    <div className="w-full h-full bg-black/40 absolute top-0 left-0">
      <div
        className={`overflow-auto h-screen w-[40vw] min-w-[300px] border-2 bg-white fixed top-0 right-0 flex flex-col p-2 ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }  transition-all duration-300 z-10`}
      >
        <button
          className="w-fit  p-7 flex  flex-col items-end"
          onClick={() => setToggle(false)}
        >
          <GrFormClose className=" text-3xl" />
        </button>
        <input
          className="border p-4 focus:outline-none shadow-sm"
          placeholder="Change Location..."
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            setLoading(true);
            // if (e.target.value.length > 2) debounceSuggestion(e.target.value);
          }}
        />
        {!loading && (
          <Suspense>
            <SuggestionDropDown
              suggestions={suggestions}
              searchText={searchText}
              setSearchText={setSearchText}
              loading={loading}
              setToggle={setToggle}
            />
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default LocationSideBar;
