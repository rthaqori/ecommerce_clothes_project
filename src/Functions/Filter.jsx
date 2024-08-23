import React, { useState, useEffect } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Components/firebase";

const Filter = ({ setFilteredProducts }) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsData = [];
        querySnapshot.forEach((doc) => {
          productsData.push({ id: doc.id, ...doc.data() });
        });
        setProducts(productsData);
        setFilteredProducts(productsData); // Initialize with all products
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [setFilteredProducts]);

  const filters = [
    { type: "categories", values: ["mens", "shirts", "kids"] },
    { type: "colors", values: ["red", "green"] },
    { type: "sizes", values: ["xxl", "xl", "xxxl"] },
    {
      type: "price",
      values: ["$0 - $49", "$50 - $99", "$100 - $199", "$200+"],
    },
  ];

  const [visibleFilters, setVisibleFilters] = useState({
    categories: true,
    colors: true,
    sizes: true,
    price: true,
  });

  const [selectedFilters, setSelectedFilters] = useState({
    categories: null,
    colors: null,
    sizes: null,
    price: null,
  });

  const toggleFilterVisibility = (filterType) => {
    setVisibleFilters((prevState) => ({
      ...prevState,
      [filterType]: !prevState[filterType],
    }));
  };

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters((prevState) => ({
      ...prevState,
      [filterType]: prevState[filterType] === value ? null : value,
    }));
  };

  const filterLists = filters.map((filter) => {
    const filterType = filter.type;
    const filterItems = filter.values;
    const isVisible = visibleFilters[filterType];

    return (
      <div
        key={filterType}
        className="border-t border-gray-500 py-5 text-gray-600"
      >
        <div>
          <button
            className="mb-4 flex w-full items-center justify-between"
            onClick={() => toggleFilterVisibility(filterType)}
          >
            <h2 className="text-lg font-bold text-black">
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </h2>
            <KeyboardArrowDownIcon
              className={`text-black transition-transform duration-300 ${
                isVisible ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
        <ul
          className={`flex flex-col gap-2 transition-all duration-300 ${
            isVisible ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          {filterItems.map((item, itemIndex) => {
            const isChecked = selectedFilters[filterType] === item;
            return (
              <li key={`${item}${itemIndex}`} className="flex items-center">
                <input
                  type="checkbox"
                  id={item}
                  checked={isChecked}
                  onChange={() => handleFilterChange(filterType, item)}
                  className="h-4 w-4 cursor-pointer"
                />
                <span className="ml-3 text-base-4">{item}</span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  });

  useEffect(() => {
    const filterProducts = () => {
      let updatedProducts = [...products];

      // Filter by category
      if (selectedFilters.categories) {
        updatedProducts = updatedProducts.filter((product) =>
          product.category.includes(selectedFilters.categories),
        );
      }

      // Filter by color
      if (selectedFilters.colors) {
        updatedProducts = updatedProducts.filter((product) =>
          product.colors.includes(selectedFilters.colors),
        );
      }

      // Filter by size
      if (selectedFilters.sizes) {
        updatedProducts = updatedProducts.filter((product) =>
          product.sizes.includes(selectedFilters.sizes),
        );
      }

      // Filter by price
      if (selectedFilters.price) {
        updatedProducts = updatedProducts.filter((product) => {
          const [min, max] = selectedFilters.price
            .replace("$", "")
            .split(" - ")
            .map((price) => parseFloat(price.replace(",", "")));

          if (max) {
            return (
              parseFloat(product.price) >= min &&
              parseFloat(product.price) <= max
            );
          }
          return parseFloat(product.price) >= min;
        });
      }

      setFilteredProducts(updatedProducts);
    };

    filterProducts();
  }, [selectedFilters, products, setFilteredProducts]);

  return <>{filterLists}</>;
};

export default Filter;
