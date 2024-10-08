import React, { useState, useEffect } from "react";
import WishListCard from "../CardsComponent/WishListCard";
import Header from "../HeaderFooter/Header";
import Footer from "../HeaderFooter/Footer";
import {
  getWishList,
  handleRemoveFromWishList,
} from "../LocalStorage/LocalStorage";
import { Link } from "react-router-dom";

const WishList = () => {
  const [wishList, setWishList] = useState(getWishList());

  const handleRemove = (productId) => {
    handleRemoveFromWishList(productId);
    setWishList(getWishList());
  };

  const wishListCart = wishList.map((product) => {
    return (
      <WishListCard
        key={product.id}
        itemName={product.name}
        price={product.price}
        product={product}
        id={product.id}
        handleRemoveFromWishList={handleRemove}
      />
    );
  });

  return (
    <>
      <Header />
      <div className="mx-4 my-6 flex flex-col md:mx-8 md:my-12 lg:mx-12">
        {wishList.length === 0 ? (
          <div className="flex h-full w-full items-center justify-center text-3xl">
            <span>WishList Cart is empty.</span>
          </div>
        ) : (
          wishListCart
        )}
      </div>
      <div className="mx-6 my-6 flex items-center justify-end md:mx-10 md:my-12 lg:mx-16">
        <Link
          to={`/shop`}
          className="flex h-auto w-auto items-center justify-center rounded border border-gray-600 px-4 py-2 text-base-4 font-medium text-gray-700 transition-colors duration-300 hover:border-hover-color hover:bg-hover-color hover:text-white md:h-10 md:px-6 md:py-4 lg:h-12 lg:px-8"
        >
          Continue Shopping
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default WishList;
