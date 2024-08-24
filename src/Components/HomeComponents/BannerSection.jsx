import React, { useState, useEffect, useRef } from "react";
import PosterOne from "../../assets/poster1.png";
import PosterTwo from "../../assets/poster2.png";
import Animate from "../Animations/Animate";

const BannerSection = () => {
  const [visible, setVisible] = useState(true);
  const [animateKey, setAnimateKey] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setVisible((prev) => !prev);
      setAnimateKey((prev) => prev + 1); // Force re-render to trigger animation
    }, 10000);
    return () => clearInterval(intervalRef.current);
  }, []);

  function intervalReset() {
    setAnimateKey((prev) => prev + 1); // Force re-render to trigger animation
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setVisible((prev) => !prev);
      setAnimateKey((prev) => prev + 1); // Force re-render to trigger animation
    }, 10000);
  }

  function slideBannerLeft(e) {
    e.preventDefault();
    setVisible(true);
    intervalReset();
  }

  function slideBannerRight(e) {
    e.preventDefault();
    setVisible(false);
    intervalReset();
  }

  return (
    <section className="bg-banner-bg">
      <div className="relative ml-4 grid h-screen pl-4 md:mx-8 md:grid-cols-2 md:px-4">
        <div className="z-[1] flex flex-col gap-5 py-24 md:gap-0 md:py-16">
          <Animate
            key={`animate-${animateKey}-1`}
            transition={{ duration: 0.75, delay: 0.15 }}
          >
            <div className="mb-6 text-base-2 font-semibold uppercase">
              {visible ? <p>Holiday 2022</p> : <p>New Collection</p>}
            </div>
          </Animate>
          <Animate
            key={`animate-${animateKey}-2`}
            transition={{ duration: 0.75, delay: 0.25 }}
          >
            <div className="text-h3 font-semibold">
              {visible ? (
                <h3>Men's New Arrivals</h3>
              ) : (
                <h3>Luxury Without Labels</h3>
              )}
            </div>
          </Animate>
          <Animate
            key={`animate-${animateKey}-3`}
            transition={{ duration: 0.75, delay: 0.35 }}
          >
            <div className="mt-6 text-base-3 font-normal">
              {visible ? (
                <p>New colors, now also avialable in men's sizing</p>
              ) : (
                <p>Explore new-in products and future bestsellers.</p>
              )}
            </div>
          </Animate>
          <Animate
            key={`animate-${animateKey}-4`}
            transition={{ duration: 0.75, delay: 0.4 }}
          >
            <div className="mb-10 mt-8">
              <a
                className="flex h-12 w-fit items-center justify-center rounded-md bg-black11 px-8 text-base-4 text-white"
                href=""
              >
                <span>View Collection</span>
              </a>
            </div>
          </Animate>
          <div className="relative flex gap-5">
            <a
              onClick={slideBannerLeft}
              className={`${visible ? "bg-black" : "bg-transparent"} dot relative`}
              href=""
            ></a>
            <a
              onClick={slideBannerRight}
              className={`${visible ? "bg-transparent" : "bg-black"} dot relative`}
              href=""
            ></a>
          </div>
        </div>
        <div className="absolute left-0 top-0 md:relative">
          <Animate
            key={`animate-${animateKey}-5`}
            variants={{
              from: { opacity: 0 },
              to: { opacity: 1 },
            }}
            transition={{ duration: 1 }}
          >
            <img
              className="h-screen object-cover object-left lg:scale-125"
              src={visible ? PosterOne : PosterTwo}
              alt=""
            />
          </Animate>
        </div>
      </div>
    </section>
  );
};

export default BannerSection;
