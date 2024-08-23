import React, { useState, useEffect } from "react";
import Headroom from "react-headroom";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
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
    setScrolling(window.scrollY > 20);
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

  return (
    <Headroom
      className="z-999"
      style={{
        backgroundColor: scrolling ? "white" : "transparent",
        boxShadow: scrolling ? "0px 4px 6px rgba(0, 0, 0, 0.1)" : "none",
      }}
    >
      <header className="sticky w-full bg-transparent py-2">
        <div className="mx-8 flex h-15 items-center justify-start px-4">
          <div className="mr-6 pr-7 font-bold">
            <span className="text-4xl">rthaqori</span>
          </div>
          <div>
            <ul className="flex items-center text-base-1">
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
            </ul>
          </div>
          <div className="ml-auto flex items-center gap-5">
            <a href="">
              <SearchOutlinedIcon className="hover:text-hover-color" />
            </a>
            <Link to="/profile">
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
          </div>
        </div>
      </header>
    </Headroom>
  );
};

export default Header;
