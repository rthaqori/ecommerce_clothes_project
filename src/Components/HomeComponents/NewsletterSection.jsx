import React from "react";

const NewsletterSection = () => {
  return (
    <section>
      <div className="flex w-full items-center justify-center px-10">
        <div className="flex w-full max-w-lg flex-col items-center justify-center pb-15">
          <div className="mb-5">
            <h3 className="mb-4 text-center text-base-2 font-semibold uppercase tracking-wider">
              NEWSLETTER
            </h3>
            <h2 className="mb-2 text-center text-2xl font-bold md:text-2xl lg:text-h2">
              Sign up and get up to <span className="text-red-600">20%</span>{" "}
              off your first purchase
            </h2>
          </div>
          <form className="relative flex w-full items-center">
            <input
              className="w-full border-b-2 border-black bg-transparent pr-24 text-input-text focus:outline-none"
              type="email"
              name=""
              id=""
              placeholder="Enter Your Email"
            />
            <button className="absolute right-0 font-semibold">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
