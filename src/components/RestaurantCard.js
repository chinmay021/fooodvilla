import { IMG_CDN_URL } from "../constants";

const RestaurantCard = ({
  name,
  cuisines,
  cloudinaryImageId,
  costForTwoString,
  avgRating,
  deliveryTime,
}) => {
  return (
    <div className="flex flex-col overflow-hidden m-3 p-3 w-72  rounded-sm hover:shadow-xl duration-300 font-poppins bg-white shadow-sm">
      <img
        className="w-full border rounded-sm"
        src={IMG_CDN_URL + cloudinaryImageId}
        alt="image of a dish from the restaurant"
      ></img>
      <span className="block font-bold text-lg mt-3 ">{name}</span>
      <span className="mt-3 text-gray-600">{cuisines?.join(", ")}</span>
      <span
        className="w-12 text-center mt-3 border rounded-md text-white"
        style={
          avgRating >= 4
            ? { backgroundColor: "#48c479" }
            : avgRating >= 3
            ? { backgroundColor: "#DB7C38" }
            : avgRating === "--"
            ? { backgroundColor: "#48c479" }
            : { backgroundColor: "#E31837" }
        }
      >
        {avgRating} &#9733;
      </span>
      <div className="flex gap-20  mt-5 ">
        <span className="font-medium">{costForTwoString}</span>
        <span className="font-medium">{deliveryTime} MINS</span>
      </div>
    </div>
  );
};

export default RestaurantCard;
