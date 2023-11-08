import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/freshcart-logo.svg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { UserToken } from "../../Context/UserToken";
import { CartContext } from "../../Context/CartContext";
export default function Navbar() {
  let { cartItems } = useContext(CartContext);
  let { login, setLogin } = useContext(UserToken);
  const navigate = useNavigate();
  function logOut() {
    localStorage.removeItem("userToken");
    setLogin(null);
    navigate("/");
  }
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <Link to={"/"} className="navbar-brand">
          <LazyLoadImage src={logo} alt="logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to={"/"} className="nav-link " aria-current="page">
                Home
              </NavLink>
            </li>
            {login ? (
              <li className="nav-item">
                <NavLink to={"cart"} className="nav-link">
                  Cart
                </NavLink>
              </li>
            ) : (
              ""
            )}

            <li className="nav-item">
              <NavLink to={"products"} className="nav-link">
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={"brands"} className="nav-link">
                Brands
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={"categories"} className="nav-link">
                Categories
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item d-flex align-items-center ">
              <i className="fa-brands fa-facebook mx-2"></i>
              <i className="fa-brands fa-youtube mx-2"></i>
              <i className="fa-brands fa-instagram mx-2"></i>
              <i className="fa-brands fa-google mx-2"></i>
            </li>
            {!login ? (
              <>
                <li className="nav-item">
                  <NavLink
                    to={"register"}
                    className="nav-link "
                    aria-current="page"
                  >
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={"login"} className="nav-link">
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <span className="nav-link cursor-pointer" onClick={logOut}>
                    SignOut
                  </span>
                </li>
                <li className="nav-item">
                  <div className="cart-box d-inline-block position-relative">
                    <i className="fa-solid fa-cart-shopping fa-2x"></i>
                    <span className="position-absolute start-50 cart text-white fw-bolder">
                      {cartItems}
                    </span>
                  </div>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
