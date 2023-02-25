import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import AddressContext from "../utils/AddressContext";
import Cart from "./Cart";

const Checkout = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.items);

  const { addressGlobal } = useContext(AddressContext);

  return (
    <div className="flex-grow bg-slate-50">
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
        <div></div>
      )}
      <div className="flex w-full font-poppins h-full border ">
        <div className="left flex-grow flex-auto w-2/3 flex flex-col  ml-16 mt-8 ">
          <div className="address bg-white mb-8 p-10">
            <p className="font-bold text-lg mb-4">Delivery address</p>

            <p className="text-sm"> {addressGlobal}</p>
          </div>
          <div className="payment bg-white p-10 flex-grow mb-8">
            <p className="font-bold text-lg">Choose payment method</p>
          </div>
        </div>
        <div className="right flex flex-col w-fit max-h-[100vh] overflow-x-auto bg-white m-8 py-4 px-6">
          <Cart />
          <div className="mx-8 flex flex-col gap-6">
            <input
              className="bg-slate-100 w-full focus:outline-none p-4 text-xs"
              placeholder="Any suggestions? We will pass it on..."
            ></input>
            <div className="border flex w-full text-sm gap-4 p-2">
              <input type="checkbox" className="mx-4" />
              <p>
                <span className="font-bold block">
                  Opt in for No-contact Delivery
                </span>
                <span className="max-w-fit text-xs">
                  Unwell, or avoiding contact? Please select no-contact
                  delivery. Partner will safely place the order outside your
                  door (not for COD)
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
