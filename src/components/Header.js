import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <a href="/">
      <img className="logo" src={logo} alt="logo"></img>
    </a>
  );
};

const Header = () => {
  return (
    <div className="header">
      <Logo />
      <div className="nav-items">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
        </ul>
      </div>
      <button>login</button>
    </div>
  );
};
export default Header;
