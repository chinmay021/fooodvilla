import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsCart4 } from "react-icons/bs";

const Logo = () => {
  return (
    <a href="/">
      <img className="w-24 p-2" src={logo} alt="logo"></img>
    </a>
  );
};

const Header = () => {
  // const cartItems = useSelector(store => store.cart.items);
  const cartTotalCount = useSelector((store) => store.cart.totalItemCount);

  return (
    <div className="flex justify-between items-center  shadow-md z-10">
      <Logo />
      <div>
        <ul className="flex list-none pr-14 font-poppins">
          <li className="p-3">
            <Link to="/">Home</Link>
          </li>
          <li className="p-3">
            <Link to="/about">About</Link>
          </li>
          <li className="p-3">
            <Link to="/help">Help</Link>
          </li>
          <li className="pt-3 px-3">
            <Link to="/cart" className="flex gap-1 items-center">
              <BsCart4 className="inline text-xl" />
              <span className=" font-bold text-orange-400 p-[1px]">
                {cartTotalCount ? (
                  <div>{cartTotalCount}</div>
                ) : (
                  ""
                )}
              </span>
            </Link>
          </li>
        </ul>
      </div>
      {/* <button>login</button> */}
    </div>
  );
};
export default Header;
