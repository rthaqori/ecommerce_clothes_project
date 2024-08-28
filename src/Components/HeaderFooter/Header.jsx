import React, { useState, useEffect } from "react";
import Headroom from "react-headroom";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import {
  getTotalCartQuantity,
  getTotalWishListItems,
} from "../LocalStorage/LocalStorage";
import { Link } from "react-router-dom";

const Header = () => {
  const [scrolling, setScrolling] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [wishListQuantity, setWishListQuantity] = useState(0);

  useEffect(() => {
    const cartQuantity = getTotalCartQuantity();
    const wishListQuantity = getTotalWishListItems();
    setCartQuantity(cartQuantity);
    setWishListQuantity(wishListQuantity);
  }, []);

  const handleScroll = () => {
    setScrolling(window.scrollY > 200);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("cartUpdated", (event) => {
      setCartQuantity(event.detail);
    });
    window.addEventListener("wishlistUpdated", (event) => {
      setWishListQuantity(event.detail);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("cartUpdated", (event) => {
        setCartQuantity(event.detail);
      });
      window.removeEventListener("wishlistUpdated", (event) => {
        setWishListQuantity(event.detail);
      });
    };
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Headroom
      className="relative z-999"
      style={{
        backgroundColor: scrolling ? "white" : "",
        boxShadow: scrolling ? "0px 4px 6px rgba(0, 0, 0, 0.1)" : "none",
      }}
    >
      <header className="w-full py-2">
        <div className="flex h-15 items-center justify-start px-4 md:mx-6 lg:mx-8">
          <div className="mr-6 pr-7 font-bold">
            <span className="text-2xl md:text-3xl lg:text-4xl">rthaqori</span>
          </div>
          <ul
            className={`absolute top-0 z-[99999] flex h-screen w-screen flex-col items-start bg-white py-6 pl-5 text-2xl transition-all duration-200 ease-in-out md:static md:h-fit md:flex-row md:items-center md:bg-transparent md:py-0 md:pl-0 md:text-base-1 ${isOpen ? "right-0" : "-right-[120vw]"}`}
          >
            <div className="flex w-full items-center justify-end pr-5 md:hidden">
              <button onClick={toggleMenu}>
                <CloseIcon fontSize="large" />
              </button>
            </div>
            <li className="cursor-pointer px-3 py-2 hover:text-hover-color md:py-4 lg:py-5">
              <Link to="/" className="underlineAnimation relative" href="">
                Home
              </Link>
            </li>
            <li className="cursor-pointer px-3 py-2 hover:text-hover-color md:py-4 lg:py-5">
              <Link to="/shop" className="underlineAnimation relative" href="">
                Shop
              </Link>
            </li>
            <li className="cursor-pointer px-3 py-2 hover:text-hover-color md:py-4 lg:py-5">
              <Link className="underlineAnimation relative">Pages</Link>
            </li>
            <li className="cursor-pointer px-3 py-2 hover:text-hover-color md:py-4 lg:py-5">
              <Link className="underlineAnimation relative">Blog</Link>
            </li>
            <li className="cursor-pointer px-3 py-2 hover:text-hover-color md:py-4 lg:py-5">
              <Link className="underlineAnimation relative">Features</Link>
            </li>
          </ul>
          <div className="ml-auto flex items-center gap-5">
            <a href="">
              <SearchOutlinedIcon className="hover:text-hover-color" />
            </a>
            <Link to="/login">
              <PersonOutlineOutlinedIcon className="hover:text-hover-color" />
            </Link>
            <Link to="/wishList" className="relative">
              <FavoriteBorderOutlinedIcon className="hover:text-hover-color" />
              {wishListQuantity > 0 && (
                <span className="absolute right-0 top-0 h-6 w-6 -translate-y-1/2 translate-x-1/2 items-center rounded-full bg-black11 text-center font-semibold text-white">
                  {wishListQuantity}
                </span>
              )}
            </Link>
            <Link to="/cartList" className="relative">
              <ShoppingBagOutlinedIcon className="hover:text-hover-color" />
              {cartQuantity > 0 && (
                <span className="absolute right-0 top-0 h-6 w-6 -translate-y-1/2 translate-x-1/2 items-center rounded-full bg-black11 text-center font-semibold text-white">
                  {cartQuantity}
                </span>
              )}
            </Link>
            <div className="md:hidden">
              <button onClick={toggleMenu}>
                <MenuIcon />
              </button>
            </div>
          </div>
        </div>
      </header>
    </Headroom>
  );
};

export default Header;
