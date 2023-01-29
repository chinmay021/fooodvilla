import logo from "../../assets/logo.png";

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
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
          <li>Cart</li>
        </ul>
      </div>
      <button>login</button>
    </div>
  );
};
export default Header;
