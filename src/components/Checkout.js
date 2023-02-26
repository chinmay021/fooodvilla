import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AddressContext from "../utils/AddressContext";
import Cart from "./Cart";
import { TbDiscount2 } from "react-icons/tb";
import StripeCheckout from "react-stripe-checkout";
import { clearCart } from "../utils/cartSlice";

const Checkout = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.items);

  const navigate = useNavigate();

  const { addressGlobal } = useContext(AddressContext);

  const getTotal = () => {
    const total = cartItems.reduce(
      (sum, current) => sum + current.price * current.quantity,
      0.0
    );
    return total;
  };
  const tokenReciever = (token) => {
    dispatch(clearCart());
    navigate(`/success/${token?.created}`);

    // console.log(token);
  };
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
        <>
          <div className="flex  w-full font-poppins h-full border overflow-x-auto ">
            <div className="left flex-grow flex-auto w-[50%] min-w-[50%] flex flex-col  ml-16 mt-8 ">
              <div className="address bg-white mb-8 p-10">
                <p className="font-bold text-lg mb-4">Delivery address</p>

                <p className="text-sm"> {addressGlobal}</p>
              </div>
              <div className="flex gap-8 flex-col bg-white p-10 mb-8">
                <p className="font-bold text-lg">Choose payment method</p>
                {/* <button className="font-poppins bg-slate-900 mt-4 p-2 text-white w-full">
                  Pay Now
                </button> */}
                <p className="text-slate-400">
                  For dummy payment enter card number as 4242 4242 4242 4242
                </p>
                <StripeCheckout
                  name="Payment Details" // the pop-in header title
                  ComponentClass="div"
                  panelLabel="Pay" // prepended to the amount in the bottom pay button
                  amount={getTotal() + 6000 + 6095} // paise
                  currency="INR"
                  token={tokenReciever}
                  stripeKey="pk_test_51MffvlSAmyxEsHY9a0ZsER0nsSKM63lOF7MPdRZFd1Ke0iw6jaFRgV6wES7CyLdxKGYMFoTtF5e50opKRDpQAsFr00JukSmWXU"
                />
              </div>
            </div>
            <div className="right flex flex-col max-h-[100vh] w-fit box-border bg-white m-8 py-4 px-6">
              <div className="overflow-y-auto max-h-[calc(100vh-270px)]">
                <Cart />
                <div className="flex flex-col gap-5 max-w-[582px] min-w-[460px] px-5">
                  <input
                    className="bg-slate-100 w-full focus:outline-none p-4 text-xs"
                    placeholder="Any suggestions? We will pass it on..."
                  ></input>
                  <div className="border flex  text-sm gap-4 p-2">
                    <input type="checkbox" className="mx-4" />
                    <div>
                      <span className="font-bold block">
                        Opt in for No-contact Delivery
                      </span>
                      <span className=" text-xs text-slate-500">
                        Unwell, or avoiding contact? Please select no-contact
                        delivery. Partner will safely place the order outside
                        your door (not for COD)
                      </span>
                    </div>
                  </div>
                  <button className="border-2 flex items-center border-dashed text-sm p-4 gap-5">
                    <TbDiscount2 className="text-xl" />
                    <span>Apply Coupon</span>
                  </button>
                  <div className="text-xs">
                    <span className="block font-bold mb-3 border-b py-4">
                      Bill Detials
                    </span>
                    <div className="flex justify-between mb-1">
                      <span>Item Total</span>
                      <span>
                        &#8377;{" "}
                        <span id="cart-total">{(getTotal() + 0.0) / 100}</span>
                      </span>
                    </div>
                    <div className="flex justify-between mb-1 border-b py-4">
                      <span>Delivery partner fee</span>
                      <span>&#8377; 62</span>
                    </div>
                    <div className="flex justify-between mb-1  py-4 ">
                      <span>Govt Taxes & Other Charges</span>
                      <span>&#8377; 60.95</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between mb-1 py-4 font-bold border-t-4 border-black">
                <span>TO PAY</span>
                <span>&#8377; {(getTotal() + 0.0) / 100 + 60 + 60.95}</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Checkout;
