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
    <div className="card">
      <img src={IMG_CDN_URL + cloudinaryImageId}></img>
      <h2>{name}</h2>
      <span>{cuisines.join(", ")}</span>
      <h4
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
      </h4>
      <div className="hotel-extra-details">
        <span className="hotel-cost">{costForTwoString}</span>
        <span className="hotel-delivery-time">{deliveryTime} MINS</span>
      </div>
    </div>
  );
};

export default RestaurantCard;
