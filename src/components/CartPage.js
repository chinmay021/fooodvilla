
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { clearCart } from "../utils/cartSlice";
import Cart from "./Cart";

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.items);
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="flex justify-center flex-1 bg-slate-50">
      {!cartItems.length ? (
        <div className="flex flex-col gap-2 justify-center items-center">
          <img
            className="w-96"
            src={
              "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0"
            }
            alt="empty cart"
          />

          <span className="font-poppins">Your cart is empty</span>
          {/* <p className="font-fira-code text-xs">
            You can go to home page to view more restaurants
          </p> */}
          <div className="">
            <Link to="/">
              <button className="font-poppins bg-slate-900 p-2 text-white mt-2">
                see restaurants near you
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <Cart />
      )}
    </div>
  );
};

export default CartPage;
