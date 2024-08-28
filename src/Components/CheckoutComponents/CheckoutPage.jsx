import React, { useEffect, useState } from "react";
import { getCart, handleRemoveFromCart } from "../LocalStorage/LocalStorage";
import Header from "../HeaderFooter/Header";
import Footer from "../HeaderFooter/Footer";

const CheckoutPage = () => {
  const [cart, setCart] = useState(getCart());
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    region: "",
    postalCode: "",
    cardNum: "",
    expirationDate: "",
    cvc: "",
  });
  const [coupon, setCoupon] = useState("");

  const handleRemove = (productId) => {
    handleRemoveFromCart(productId);
    setCart(getCart());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNextStep = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, 3));
  };

  const handlePrevStep = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const handleCouponChange = (e) => {
    setCoupon(e.target.value);
  };

  const handleCouponApply = () => {
    // Apply coupon logic here
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form logic here
    if (formData.cardNum.length < 16) {
      alert("Please enter a valid card number.");
      return;
    }
  };

  const subTotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const [shipping, setShipping] = useState(0);

  useEffect(() => {
    if (subTotal < 300) {
      setShipping(30);
    } else {
      setShipping(0); // Reset shipping to 0 if subTotal >= 300
    }
  }, [subTotal]);

  return (
    <>
      <Header />
      <div className="my-4 px-2 md:my-10 md:px-12">
        <div className="mx-auto my-4 w-full md:my-6">
          <div className="overflow-hidden rounded-xl shadow">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="bg-gray-100 px-5 py-6 md:px-8">
                <div className="flow-root">
                  <ul className="-my-7 divide-y divide-gray-200">
                    {cart.map((item) => (
                      <li
                        key={item.id}
                        className="flex items-stretch justify-between space-x-5 py-7"
                      >
                        <div className="flex flex-1 items-stretch">
                          <div className="flex-shrink-0">
                            <img
                              className="h-20 w-20 rounded-lg border border-gray-200 bg-white object-contain"
                              src={item.mainImage}
                              alt={item.name}
                            />
                          </div>
                          <div className="ml-5 flex flex-col justify-between">
                            <div className="flex-1">
                              <p className="text-sm font-bold">{item.name}</p>
                              <p className="mt-1.5 text-sm font-medium text-gray-500">
                                {item.color}
                              </p>
                            </div>
                            <p className="mt-4 text-xs font-medium">
                              x {item.quantity}
                            </p>
                          </div>
                        </div>
                        <div className="ml-auto flex flex-col items-end justify-between">
                          <p className="text-right text-sm font-bold text-gray-900">
                            ${item.price * item.quantity}
                          </p>
                          <button
                            type="button"
                            onClick={() => handleRemove(item.id)}
                            className="-m-2 inline-flex rounded p-2 text-gray-400 transition-all duration-200 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                          >
                            <span className="sr-only">Remove</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-5 w-5"
                            >
                              <line x1="18" y1="6" x2="6" y2="18"></line>
                              <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <hr className="mt-6 border-gray-200" />
                <form action="#" className="mt-6">
                  <div className="sm:flex sm:space-x-2.5 md:flex-col md:space-x-0 lg:flex-row lg:space-x-2.5">
                    <div className="flex-grow">
                      <input
                        className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        placeholder="Enter coupon code"
                        value={coupon}
                        onChange={handleCouponChange}
                      />
                    </div>
                    <div className="mt-4 sm:mt-0 md:mt-4 lg:mt-0">
                      <button
                        type="button"
                        onClick={handleCouponApply}
                        className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                      >
                        Apply Coupon
                      </button>
                    </div>
                  </div>
                </form>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center justify-between text-gray-600">
                    <p className="text-sm font-medium">Sub total</p>
                    <p className="text-sm font-medium">${subTotal}</p>
                  </li>
                  <li className="flex items-center justify-between text-gray-600">
                    <p className="text-sm font-medium">Shipping Cost</p>
                    <p className="text-sm font-medium">${shipping}</p>
                  </li>
                  <li className="flex items-center justify-between text-gray-900">
                    <p className="text-sm font-medium">Total</p>
                    <p className="text-sm font-bold">${subTotal + shipping}</p>
                  </li>
                </ul>
              </div>
              <div className="px-5 py-6 text-gray-900 md:px-8">
                <div className="w-full">
                  <div className="flex flex-col space-y-2">
                    <div
                      className={`cursor-pointer ${
                        currentStep === 1 ? "text-black" : "text-gray-500"
                      }`}
                      onClick={() => setCurrentStep(1)}
                    >
                      <h2 className="text-base font-bold">
                        Contact Information
                      </h2>
                    </div>
                    <div>
                      {currentStep === 1 && (
                        <div className="py-3">
                          <form onSubmit={handleSubmit}>
                            <div className="space-y-5">
                              <div className="grid w-full items-center gap-1.5">
                                <label
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                  htmlFor="name"
                                >
                                  Full Name
                                </label>
                                <input
                                  className="flex w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                  type="text"
                                  id="name"
                                  name="name"
                                  placeholder="Full Name"
                                  value={formData.name}
                                  required
                                  onChange={handleChange}
                                />
                              </div>
                              <div className="grid w-full items-center gap-1.5">
                                <label
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                  htmlFor="email"
                                >
                                  Email
                                </label>
                                <input
                                  className="flex w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                  type="email"
                                  id="email"
                                  name="email"
                                  placeholder="Email"
                                  value={formData.email}
                                  required
                                  onChange={handleChange}
                                />
                              </div>
                              <div>
                                <button
                                  type="button"
                                  className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                  onClick={handleNextStep}
                                >
                                  Next
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      )}
                    </div>

                    <div className="py-2 text-black">
                      <hr className="w-full border-gray-300" />
                    </div>

                    <div
                      className={`cursor-pointer ${
                        currentStep === 2 ? "text-black" : "text-gray-500"
                      }`}
                      onClick={() => setCurrentStep(2)}
                    >
                      <h2 className="text- font-bold">Shipping Information</h2>
                    </div>
                    <div>
                      {currentStep === 2 && (
                        <div className="py-2">
                          <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
                            <div className="sm:col-span-3">
                              <label
                                htmlFor="address"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Address
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  id="address"
                                  name="address"
                                  autoComplete="street-address"
                                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                  value={formData.address}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                            <div className="sm:col-span-1">
                              <label
                                htmlFor="city"
                                className="block text-sm font-medium text-gray-700"
                              >
                                City
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  id="city"
                                  name="city"
                                  autoComplete="address-level2"
                                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                  value={formData.city}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                            <div className="sm:col-span-1">
                              <label
                                htmlFor="region"
                                className="block text-sm font-medium text-gray-700"
                              >
                                State/Province
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  id="region"
                                  name="region"
                                  autoComplete="address-level1"
                                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                  value={formData.region}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                            <div className="sm:col-span-1">
                              <label
                                htmlFor="postalCode"
                                className="block text-sm font-medium text-gray-700"
                              >
                                ZIP/Postal code
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  id="postalCode"
                                  name="postalCode"
                                  autoComplete="postal-code"
                                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                  value={formData.postalCode}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 flex justify-between">
                            <button
                              type="button"
                              className="rounded-md bg-gray-300 px-3 py-2 text-sm font-semibold text-gray-800 shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800"
                              onClick={handlePrevStep}
                            >
                              Back
                            </button>
                            <button
                              type="button"
                              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                              onClick={handleNextStep}
                            >
                              Next
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="py-2 text-black">
                      <hr className="w-full border-gray-300" />
                    </div>

                    <div
                      className={`cursor-pointer ${
                        currentStep === 3 ? "text-black" : "text-gray-500"
                      }`}
                      onClick={() => setCurrentStep(3)}
                    >
                      <h2 className="text-base font-bold">
                        Payment Information
                      </h2>
                    </div>
                    <div>
                      {currentStep === 3 && (
                        <div className="py-2">
                          <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
                            <div className="sm:col-span-3">
                              <label
                                htmlFor="cardNum"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Card Number
                              </label>
                              <div className="mt-1">
                                <input
                                  type="number"
                                  id="cardNum"
                                  name="cardNum"
                                  placeholder="4242 4242 4242 4242"
                                  autoComplete="cc-number"
                                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                  value={formData.cardNum}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                            <div className="sm:col-span-2">
                              <label
                                htmlFor="expirationDate"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Expiration Date
                              </label>
                              <div className="mt-1">
                                <input
                                  type="date"
                                  id="expirationDate"
                                  name="expirationDate"
                                  autoComplete="cc-exp"
                                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                  value={formData.expirationDate}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                            <div className="sm:col-span-1">
                              <label
                                htmlFor="cvc"
                                className="block text-sm font-medium text-gray-700"
                              >
                                CVC
                              </label>
                              <div className="mt-1">
                                <input
                                  type="number"
                                  id="cvc"
                                  name="cvc"
                                  autoComplete="cc-csc"
                                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                  value={formData.cvc}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 flex justify-between">
                            <button
                              type="button"
                              className="rounded-md bg-gray-300 px-3 py-2 text-sm font-semibold text-gray-800 shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800"
                              onClick={handlePrevStep}
                            >
                              Back
                            </button>
                            <button
                              type="submit"
                              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            >
                              Place Order
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flow-root">
                  <div className="-my-6 divide-y divide-gray-200"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPage;
