import React, { useState, useEffect } from "react";
import WishListCard from "../CardsComponent/WishListCard";
import Header from "../HeaderFooter/Header";
import Footer from "../HeaderFooter/Footer";
import {
  getWishList,
  handleRemoveFromWishList,
} from "../LocalStorage/LocalStorage";

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
      <div className="mx-12 my-12 flex flex-col">
        {wishList.length === 0 ? (
          <div className="flex h-full w-full items-center justify-center text-3xl">
            <span>WishList Cart is empty.</span>
          </div>
        ) : (
          wishListCart
        )}
      </div>
      <Footer />
    </>
  );
};

export default WishList;
