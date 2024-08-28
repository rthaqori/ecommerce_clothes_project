import React, { useState, useEffect } from "react";
import Header from "../HeaderFooter/Header";
import Footer from "../HeaderFooter/Footer";
import CartCard from "../CardsComponent/CartCard";
import { Link, useNavigate } from "react-router-dom";
import {
  getCart,
  handleRemoveFromCart,
  handleUpdateCart,
  getTotalCartQuantity,
  getCartSubtotal,
} from "../LocalStorage/LocalStorage";

const Cart = () => {
  const [cartItems, setCartItems] = useState(getCart());
  const [shippingCost, setShippingCost] = useState(30);
  const [subtotal, setSubtotal] = useState(getCartSubtotal());
  const navigate = useNavigate();

  const totalItems = getTotalCartQuantity();

  useEffect(() => {
    setSubtotal(getCartSubtotal());
  }, [cartItems]);

  const handleDelete = (id) => {
    handleRemoveFromCart(id);
    setCartItems(getCart()); // Refresh cart items after deletion
  };

  const handleUpdate = (id, newQuantity) => {
    handleUpdateCart(id, newQuantity);
    setCartItems(getCart()); // Refresh cart items after update
  };

  const handleShippingChange = (event) => {
    const value = event.target.value;
    setShippingCost(value === "free" ? 0 : 30);
  };

  const totalAmount = subtotal + shippingCost;

  const handleCheckout = () => {
    if (shippingCost === 0 && totalAmount < 300) {
      alert("Cannot proceed with free shipping. Total sum is less than $300.");
    } else if (cartItems.length == 0) {
      alert("Cart is empty. Cannot Proceed.");
    } else {
      navigate("/checkout"); // Redirect to checkout page
    }
  };

  const cartProducts = cartItems.map((item) => (
    <CartCard
      key={item.id}
      item={item}
      onDelete={handleDelete}
      onUpdate={handleUpdate}
      id={item.id}
    />
  ));

  return (
    <>
      <Header />
      <div className="px-5 py-10 md:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-3/5">
            <div className="md:px-4">
              <div className="flex w-full items-center justify-between border-b border-gray-500 pb-2 md:px-6 md:pb-4 lg:px-8 lg:pb-6">
                <span className="text-2xl font-medium md:text-3xl">
                  Your Cart
                </span>
                <p className="text-base-5 font-medium text-gray-700">
                  <span className="text-gray-800">{totalItems}</span> items
                </p>
              </div>
            </div>
            <div className="md:px-4">
              {totalItems === 0 ? (
                <div className="mt-10 flex h-full w-full items-center justify-center text-3xl">
                  <span>Cart is empty.</span>
                </div>
              ) : (
                cartProducts
              )}
            </div>
          </div>
          <div className="mt-5 w-full md:mt-0 md:w-2/5 md:pl-9 md:pr-4 lg:pl-11">
            <div className="mb-6">
              <span className="text-2xl font-medium md:text-3xl">
                Order Summary
              </span>
            </div>
            <div className="rounded border border-gray-400 bg-gray-200 p-8">
              <div className="flex justify-between border-b border-gray-500 pb-5 text-2xl font-medium">
                <p className="text-gray-600">Subtotal</p>
                <p>${subtotal.toFixed(2)}</p>
              </div>
              <div className="border-b border-gray-500 py-5 text-base-1">
                <p className="uppercase text-gray-700">Shipping</p>
                <div className="mt-5 flex flex-col">
                  <label className="mb-2" htmlFor="shippingFee">
                    <input
                      type="radio"
                      name="shipping"
                      id="shippingFee"
                      value="flat"
                      checked={shippingCost === 30}
                      onChange={handleShippingChange}
                    />
                    Flat rate: $30.00
                  </label>
                  <label className="mb-2" htmlFor="shippingFree">
                    <input
                      type="radio"
                      name="shipping"
                      id="shippingFree"
                      value="free"
                      checked={shippingCost === 0}
                      onChange={handleShippingChange}
                    />
                    Free Shipping
                  </label>
                </div>
              </div>
              <div className="flex justify-between pt-5 text-2xl font-semibold">
                <span className="text-gray-600">Total</span>
                <p>${totalAmount.toFixed(2)}</p>
              </div>
              <button
                onClick={handleCheckout}
                className="mb-6 mt-5 inline-block w-full cursor-pointer rounded bg-black py-3 text-center text-base-2 font-semibold text-white transition-colors duration-300 ease-in-out hover:bg-hover-color"
              >
                Proceed to Checkout
              </button>
              <div className="flex w-full flex-col items-center justify-center gap-3 text-base-1">
                <p className="text-green-600">
                  Free Shipping on orders over $300
                </p>
                <Link to="/shop" className="hover:text-hover-color">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
