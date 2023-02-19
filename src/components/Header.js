import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Logo = () => {
  return (
    <a href="/">
      <img className="w-28" src={logo} alt="logo"></img>
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
        <ul className="flex list-none pr-14 font-fira-code">
          <li className="p-3">
            <Link to="/">Home</Link>
          </li>
          <li className="p-3">
            <Link to="/about">About</Link>
          </li>
          <li className="p-3">
            <Link to="/contact">Contact</Link>
          </li>
          <li className="p-3">
            <Link to="/cart">
              Cart-
              <span className=" font-bold text-orange-400 p-[1px]">
                {cartTotalCount}
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
