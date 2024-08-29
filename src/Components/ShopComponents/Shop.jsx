import React, { useState, useEffect, useMemo } from "react";
import Header from "../HeaderFooter/Header";
import Footer from "../HeaderFooter/Footer";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TuneIcon from "@mui/icons-material/Tune";
import ProductCard from "../CardsComponent/ProductCard";
import Filter from "../../Functions/Filter";
import {
  handleAddToCart,
  handleAddToWishList,
} from "../LocalStorage/LocalStorage";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Shop = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOption, setSortOption] = useState("default");
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFilteredProducts(productsData);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleSortOptionChange = (option) => {
    setSortOption(option);
    setIsSortDropdownOpen(false);
  };

  const sortedProducts = useMemo(() => {
    let sorted = [...filteredProducts];
    switch (sortOption) {
      case "price-high-to-low":
        sorted.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case "price-low-to-high":
        sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case "latest":
        sorted.sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp));
        break;
      case "average-rating":
        sorted.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
        break;
      default:
        break;
    }
    return sorted;
  }, [sortOption, filteredProducts]);

  const { currentProducts, indexOfFirstProduct, indexOfLastProduct } =
    useMemo(() => {
      const indexOfFirstProduct = (currentPage - 1) * productsPerPage;
      const indexOfLastProduct = currentPage * productsPerPage;
      const currentProducts = sortedProducts.slice(
        indexOfFirstProduct,
        indexOfLastProduct,
      );
      return { currentProducts, indexOfFirstProduct, indexOfLastProduct };
    }, [currentPage, sortedProducts, productsPerPage]);

  const pageNumbers = useMemo(() => {
    return Array.from(
      { length: Math.ceil(sortedProducts.length / productsPerPage) },
      (_, i) => i + 1,
    );
  }, [sortedProducts.length]);

  const sortOptions = [
    { value: "default", label: "Default" },
    { value: "price-high-to-low", label: "Price High to Low" },
    { value: "price-low-to-high", label: "Price Low to High" },
    { value: "latest", label: "Latest" },
    { value: "average-rating", label: "Average Rating" },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className="mx-auto my-4 grid grid-cols-4 gap-4 md:mx-6 lg:mx-8">
        <div className="col-span-4 md:col-span-1">
          {/* Mobile Filter Toggle */}
          <div className="px-4 md:hidden">
            <button
              onClick={() => {
                setFilterOpen(!filterOpen);
              }}
              className={`flex items-center gap-1 text-base-5 font-bold ${filterOpen ? "mb-6" : ""}`}
            >
              <TuneIcon />
              <p>Filter</p>
            </button>
            <div className={`overflow-clip ${filterOpen ? "h-fit" : "h-0"}`}>
              <Filter setFilteredProducts={setFilteredProducts} />
            </div>
          </div>

          {/* Always-visible Filter for larger screens */}
          <div className="hidden md:block">
            <p className="mb-6 flex items-center gap-1 text-base-5 font-bold">
              <TuneIcon />
              <p>Filter</p>
            </p>
            <Filter setFilteredProducts={setFilteredProducts} />
          </div>
        </div>
        <div className="col-span-4 px-4 md:col-span-3 md:p-4">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-gray-700 md:text-lg">
                Showing{" "}
                <strong className="text-black">
                  {indexOfFirstProduct + 1} -{" "}
                  {Math.min(indexOfLastProduct, filteredProducts.length)}
                </strong>{" "}
                of{" "}
                <strong className="text-black">
                  {filteredProducts.length}
                </strong>{" "}
                products
              </p>
            </div>
            <div className="relative md:mr-4">
              <button
                onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2"
              >
                <span>
                  Sort by:{" "}
                  {
                    sortOptions.find((option) => option.value === sortOption)
                      ?.label
                  }
                </span>
                <KeyboardArrowDownIcon />
              </button>
              {isSortDropdownOpen && (
                <ul className="absolute z-20 mt-2 w-full rounded-md border border-gray-300 bg-white shadow-lg">
                  {sortOptions.map((option) => (
                    <li
                      key={option.value}
                      onClick={() => handleSortOptionChange(option.value)}
                      className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                    >
                      {option.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div>
            {currentProducts.length > 0 ? (
              <ul className="grid grid-cols-2 gap-2 md:gap-4 lg:grid-cols-3 2xl:grid-cols-4">
                {currentProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    src={product.mainImage}
                    hoverImg={product.hoverImg}
                    price={product.price}
                    itemName={product.name}
                    id={product.id}
                    handleAddToCart={() =>
                      handleAddToCart(product, 1, product.sizes[0])
                    }
                    handleAddToWishList={() => handleAddToWishList(product)}
                  />
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500">
                No products found matching your criteria.
              </p>
            )}
          </div>
          <div className="mt-4 flex justify-center">
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => setCurrentPage(number)}
                className={`mx-1 border px-3 py-1 ${
                  currentPage === number
                    ? "bg-gray-500 text-white"
                    : "bg-white text-gray-500"
                }`}
              >
                {number}
              </button>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Shop;
