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
      className="z-999"
      style={{
        backgroundColor: scrolling ? "white" : "transparent",
        boxShadow: scrolling ? "0px 4px 6px rgba(0, 0, 0, 0.1)" : "none",
      }}
    >
      <header className="w-full bg-transparent py-2">
        <div className="flex h-15 items-center justify-start px-4 md:mx-6 lg:mx-8">
          <div className="mr-6 pr-7 font-bold">
            <span className="text-2xl md:text-3xl lg:text-4xl">rthaqori</span>
          </div>
          <div>
            <ul className="flex items-center text-base-1 md:h-fit">
              <div
                className={`absolute top-0 z-[9999] flex h-full w-full items-center bg-white md:static md:bg-transparent ${isOpen ? "right-0" : "-right-full"} h-screen`}
              >
                <div className="md:hidden">
                  <button onClick={toggleMenu}>
                    <CloseIcon />
                  </button>
                </div>
                <li className="cursor-pointer px-3 py-5 hover:text-hover-color">
                  <Link to="/" className="underlineAnimation relative" href="">
                    Home
                  </Link>
                </li>
                <li className="cursor-pointer px-3 py-5 hover:text-hover-color">
                  <Link
                    to="/shop"
                    className="underlineAnimation relative"
                    href=""
                  >
                    Shop
                  </Link>
                </li>
                <li className="cursor-pointer px-3 py-5 hover:text-hover-color">
                  <Link className="underlineAnimation relative">Pages</Link>
                </li>
                <li className="cursor-pointer px-3 py-5 hover:text-hover-color">
                  <Link className="underlineAnimation relative">Blog</Link>
                </li>
                <li className="cursor-pointer px-3 py-5 hover:text-hover-color">
                  <Link className="underlineAnimation relative">Features</Link>
                </li>
              </div>
            </ul>
          </div>
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
