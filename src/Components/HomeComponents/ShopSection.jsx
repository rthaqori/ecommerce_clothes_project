import React, { useState, useRef, useEffect } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import products from "../../JSON/ProductList.json";

const ShopSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const itemRef = useRef(null);
  const gapWidth = 18;
  const categories = ["Mens", "Shirts", "Kids", "Women", "Skirts"];

  useEffect(() => {
    if (itemRef.current) {
      setItemWidth(itemRef.current.offsetWidth);
    }
  }, []);

  const slideLeft = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? categories.length - 1 : prevIndex - 1,
    );
  };

  const slideRight = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === categories.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const categoriesList = categories.map((item, index) => (
    <li
      key={index}
      ref={index === 0 ? itemRef : null} // Attach the ref to the first item
      className="group relative h-categoryCard w-categoryCard shrink-0 overflow-hidden"
      style={{
        transform: `translateX(-${currentIndex * (itemWidth + gapWidth)}px)`,
        transition: "transform 0.5s ease-in-out",
      }}
    >
      <img
        className="in-out w-full object-cover transition-all duration-1000 group-hover:scale-110"
        src="https://july.uxper.co/fashion01/wp-content/uploads/sites/2/2022/04/shirts-1-540x840.jpg"
        alt=""
      />
      <a
        className="absolute bottom-5 left-1/2 w-36 -translate-x-1/2 rounded-md bg-white py-2 text-center text-base-5 font-semibold"
        href=""
      >
        {item} {`(`}
        <span>1</span>
        {`)`}
      </a>
    </li>
  ));

  return (
    <section className="pt-15">
      <div className="relative py-4">
        <h2 className="mb-5 pb-4 text-2xl font-semibold md:text-3xl lg:text-h2">
          Shop by Categories
        </h2>
        <div className="absolute right-0 top-4 flex scale-75 gap-3 lg:right-8">
          <button
            className="h-10 w-10 rounded-full border border-black11 transition-all duration-300 ease-in hover:border-none hover:bg-hover-color"
            onClick={slideLeft}
          >
            <ChevronLeftIcon fontSize="large" />
          </button>
          <button
            className="h-10 w-10 rounded-full border border-black11 transition-all duration-300 ease-in hover:border-none hover:bg-hover-color"
            onClick={slideRight}
          >
            <ChevronRightIcon fontSize="large" />
          </button>
        </div>
        <div>
          <ul className="flex flex-nowrap gap-6 overflow-hidden">
            {categoriesList}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ShopSection;
