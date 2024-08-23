import React, { useState, useEffect } from "react";
import ProductCard from "../CardsComponent/ProductCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import {
  handleAddToCart,
  handleAddToWishList,
} from "../LocalStorage/LocalStorage";

const BestSellerSection = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("mens");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
        // Initially filter products by "mens" category
        const initialFilteredProducts = productsData.filter((product) =>
          product.category.includes("mens"),
        );
        setFilteredProducts(initialFilteredProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const categoryFilteredProducts = products.filter((product) =>
      product.category.includes(activeCategory),
    );
    setFilteredProducts(categoryFilteredProducts);
  }, [activeCategory, products]);

  const filterByCategory = (category) => {
    setActiveCategory(category);
  };

  const displayProducts = filteredProducts
    .slice(0, 8)
    .map((product) => (
      <ProductCard
        key={product.id}
        id={product.id}
        price={product.price}
        itemName={product.name}
        src={product.mainImage}
        hoverImg={product.hoverImg}
        handleAddToCart={() => handleAddToCart(product, 1, product.sizes[0])}
        handleAddToWishList={() => handleAddToWishList(product)}
      />
    ));

  return (
    <section className="pt-15">
      <h2 className="mb-7 pb-4 text-center text-h2 font-semibold">
        Best Sellers
      </h2>
      <div>
        <ul className="flex justify-center gap-6 pb-15 text-base-3 font-semibold text-gray-text">
          <li
            onClick={() => filterByCategory("mens")}
            className={
              activeCategory === "mens"
                ? "activeList cursor-pointer"
                : "cursor-pointer"
            }
          >
            Men
          </li>
          <li
            onClick={() => filterByCategory("womens")}
            className={
              activeCategory === "womens"
                ? "activeList cursor-pointer"
                : "cursor-pointer"
            }
          >
            Womens
          </li>
          <li
            onClick={() => filterByCategory("kids")}
            className={
              activeCategory === "kids"
                ? "activeList cursor-pointer"
                : "cursor-pointer"
            }
          >
            Kids
          </li>
        </ul>
      </div>
      <div>
        {isLoading ? (
          <p>Loading products...</p>
        ) : (
          <ul className="grid grid-cols-4 gap-4">{displayProducts}</ul>
        )}
      </div>
      <div className="mt-4 flex h-12 items-center justify-center">
        <a
          className="group relative flex h-full items-center justify-center overflow-hidden rounded-md border border-gray-800 px-7 hover:text-white"
          href="#"
        >
          Explore More
          <div className="absolute inset-0 -z-10 translate-y-full transform bg-hover-color transition-transform duration-200 ease-in-out group-hover:translate-y-0"></div>
        </a>
      </div>
    </section>
  );
};

export default BestSellerSection;
