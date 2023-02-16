import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <a href="/">
      <img className="w-28" src={logo} alt="logo"></img>
    </a>
  );
};

const Header = () => {
  return (
    <div className="flex justify-between items-center my-3 ">
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
            <Link to="/cart">Cart</Link>
          </li>
        </ul>
      </div>
      {/* <button>login</button> */}
    </div>
  );
};
export default Header;