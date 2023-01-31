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
      <h3>{cuisines.join(", ")}</h3>
      <h4>{avgRating} STARS</h4>
      <h4>{costForTwoString}</h4>
      <h4>{deliveryTime} MINS</h4>
    </div>
  );
};

export default RestaurantCard;
