import { Navigate } from "react-router-dom";

// LocalStorage.js
export const getCart = () => JSON.parse(localStorage.getItem("cart")) || [];
export const getWishList = () =>
  JSON.parse(localStorage.getItem("wishList")) || [];

export const handleAddToCart = (product, quantity, selectedSize) => {
  const cart = getCart();
  const existingProductIndex = cart.findIndex(
    (item) => item.id === product.id && item.selectedSize === selectedSize,
  );

  if (existingProductIndex !== -1) {
    cart[existingProductIndex].quantity += quantity;
  } else {
    cart.push({ ...product, quantity, selectedSize });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  window.dispatchEvent(
    new CustomEvent("cartUpdated", { detail: getTotalCartQuantity() }),
  );
};

export const handleBuyNow = (product, quantity, selectedSize) => {
  handleAddToCart(product, quantity, selectedSize);
};

export const handleAddToWishList = (product) => {
  const wishList = getWishList();
  if (!wishList.some((item) => item.id === product.id)) {
    wishList.push(product);
    localStorage.setItem("wishList", JSON.stringify(wishList));
    window.dispatchEvent(
      new CustomEvent("wishlistUpdated", { detail: getTotalWishListItems() }),
    );
  }
};

export const handleRemoveFromCart = (productId) => {
  const cart = getCart();
  const updatedCart = cart.filter((item) => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
  window.dispatchEvent(
    new CustomEvent("cartUpdated", { detail: getTotalCartQuantity() }),
  );
};

export const handleRemoveFromWishList = (productId) => {
  const wishList = getWishList();
  const updatedWishList = wishList.filter((item) => item.id !== productId);
  localStorage.setItem("wishList", JSON.stringify(updatedWishList));
  window.dispatchEvent(
    new CustomEvent("wishlistUpdated", { detail: getTotalWishListItems() }),
  );
};

export const handleUpdateCart = (productId, quantity) => {
  const cart = getCart();
  const updatedCart = cart.map((item) =>
    item.id === productId ? { ...item, quantity } : item,
  );
  localStorage.setItem("cart", JSON.stringify(updatedCart));
  window.dispatchEvent(
    new CustomEvent("cartUpdated", { detail: getTotalCartQuantity() }),
  );
};

export const getTotalCartQuantity = () => {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
};

export const getTotalWishListItems = () => {
  const wishList = getWishList();
  return wishList.length;
};

export const getCartSubtotal = () => {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};
