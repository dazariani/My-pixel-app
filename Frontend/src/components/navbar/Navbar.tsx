import logo from "../../assets/Logo.png";
import { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/authContextTypes";
import {
  NavContainer,
  NavList,
  NavItem,
  NavAuth,
  AuthButtonsContainer,
  AuthLink,
  AuthButton,
} from "./navbar-styles";

const Navbar = () => {
  const [activeItem, setActiveItem] = useState<string>("");
  const { user, logoutUser } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path.includes("collections")) {
      setActiveItem("Collections");
    } else if (path === "/") {
      setActiveItem("Home");
    } else {
      setActiveItem("");
    }
  }, [location.pathname]);

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <NavContainer>
      <Link onClick={() => setActiveItem("Home")} to="/">
        <img style={{ width: "100px" }} src={logo} alt="logo" />
      </Link>

      <NavList>
        <Link to="/">
          <NavItem
            onClick={() => setActiveItem("Home")}
            $isActive={"Home" === activeItem}
          >
            Home
          </NavItem>
        </Link>
        <Link to="/collections">
          <NavItem
            onClick={() => setActiveItem("Collections")}
            $isActive={"Collections" === activeItem}
          >
            Collections
          </NavItem>
        </Link>
      </NavList>

      <NavAuth>
        {user ? (
          <>
            <span>
              Hello, {user.username.replace(/^./, (char) => char.toUpperCase())}
            </span>
            <AuthButton onClick={handleLogout}>Logout</AuthButton>
          </>
        ) : (
          <AuthButtonsContainer>
            <AuthLink to="/login">Login</AuthLink>
            <AuthLink to="/signup">Register</AuthLink>
          </AuthButtonsContainer>
        )}
      </NavAuth>
    </NavContainer>
  );
};

export default Navbar;
