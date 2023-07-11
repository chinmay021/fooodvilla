import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { IMG__MENU_ITEM_CDN_URL } from "../constants";
import { addItem, decreamentItem, clearCart } from "../utils/cartSlice";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);

  const disptach = useDispatch();

  const handleAddFoodItem = (item) => {
    disptach(addItem(item));
  };
  const handleDecreamentFoodItem = (item) => {
    disptach(decreamentItem(item));
  };

  const getItemCount = (item) => {
    const currentItem = cartItems.find((cartItem) => item.id === cartItem.id);
    return currentItem ? currentItem.quantity : 0;
  };

  const getTotal = () => {
    const total = cartItems.reduce(
      (sum, current) => sum + current.price * current.quantity,
      0.0
    );
    return total;
  };
  const handleClearCart = () => {
    disptach(clearCart());
  };

  const url = useLocation();

  return (
    <div
      className={` ${
        0 && !cartItems.length && "hidden"
      } w-fit h-fit m-8 p-8 bg-white shadow-md font-poppins text-sm flex flex-col`}
    >
      <div className="flex justify-between mb-5 border-b-2 ">
        <div className="flex w-full pb-2 justify-between items-center">
          <span className="font-bold ">cart items</span>
          <button
            className=" font-poppins bg-slate-900 px-2 py-1 text-white"
            onClick={handleClearCart}
          >
            {" "}
            Clear Cart
          </button>
        </div>
      </div>
      <div className="border-b-2">
        {cartItems.map((item) => {
          console.log(item);
          return (
            <div
              key={item.id}
              className="pl-2 pb-2 flex justify-between items-center gap-1 my-2 "
            >
              <img
                className="w-12"
                src={IMG__MENU_ITEM_CDN_URL + item?.imageId}
                alt=""
                onError={(event) => (event.target.style.display = "block")}
              />
              <div className="w-60 ">{item.name}</div>
              <div className="flex justify-between font-poppins w-20 h-7 border bg-slate-50 text-black py-[2px] px-2">
                <button onClick={() => handleDecreamentFoodItem(item)}>
                  -
                </button>
                <span>{getItemCount(item)}</span>
                <button onClick={() => handleAddFoodItem(item)}>+</button>
              </div>
              <div className="w-14 font-medium flex justify-center">
                <span>&#8377;{(item.price + 0.0) / 100}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between pt-2 font-bold">
        <span>Total</span>
        <span>&#8377;{(getTotal() + 0.0) / 100}</span>
      </div>
      {url.pathname !== "/checkout" && (
        <Link to={"/checkout"}>
          <button className="font-poppins bg-slate-900 mt-4 p-2 text-white w-full">
            Checkout
          </button>
        </Link>
      )}
    </div>
  );
};

export default Cart;
