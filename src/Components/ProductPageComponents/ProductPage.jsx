import React, { useState, useEffect } from "react";
import Header from "../HeaderFooter/Header";
import Footer from "../HeaderFooter/Footer";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import { useParams, useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import {
  handleAddToCart,
  handleBuyNow,
  handleAddToWishList,
} from "../LocalStorage/LocalStorage";

const ProductPage = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [data, setData] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsData = [];
        querySnapshot.forEach((doc) => {
          productsData.push({ id: doc.id, ...doc.data() });
        });
        setData(productsData);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const product = data.find((p) => p.id === id);
      if (product && product.sizes.length > 0) {
        setSelectedSize(product.sizes[0]);
        setImageUrl(product.mainImage);
      }
    }
  }, [data, id]);

  const product = data.find((p) => p.id === id);

  if (loading) return <div>Loading...</div>;

  if (product == null) {
    navigate("/shop", { replace: true });
    return null;
  }

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleImageUrl = (img) => {
    setImageUrl(img);
  };

  const handleAddToCartClick = () => {
    setLoadingButton(true);
    handleAddToCart(product, quantity, selectedSize);
    setLoadingButton(false);
  };

  const handleBuyNowClick = () => {
    setLoadingButton(true);
    handleBuyNow(product, quantity, selectedSize);
    navigate("/cartList");
  };

  return (
    <>
      <Header />
      <div className="mb-10 px-4 pt-5 md:mb-10 md:px-11 md:pt-10">
        <div className="border-b border-gray-400 pb-10">
          <div className="grid grid-cols-12 gap-4 md:gap-0">
            <div className="col-span-12 grid grid-cols-12 overflow-clip px-4 md:col-span-6 md:h-[555px]">
              <div className="imgScroll order-2 col-span-12 flex h-full snap-y snap-mandatory flex-row gap-2 overflow-x-scroll p-2 md:order-1 md:col-span-3 md:flex-col md:overflow-y-scroll">
                {product.images.map((image, index) => (
                  <div key={index} className="w-full snap-start">
                    <img
                      onMouseEnter={() => handleImageUrl(image)}
                      loading="lazy"
                      className="w-full object-contain lg:h-40"
                      src={image}
                      alt={`Product Image ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
              <div className="order-1 col-span-12 h-full p-2 md:order-2 md:col-span-9">
                <img
                  loading="lazy"
                  className="h-full w-full object-contain"
                  src={imageUrl}
                  alt={`Main view of ${product.name}`}
                />
              </div>
            </div>
            <div className="col-span-12 px-4 md:col-span-6">
              <div className="pl-0 pt-5 md:pl-4">
                <h2 className="mb-1 text-2xl font-medium md:text-3xl lg:text-h2">
                  {product.name}
                </h2>
                <p className="mb-5 text-priceText font-medium">
                  ${product.price}
                </p>
                <form className="pb-4">
                  <div className="mb-6">
                    <p className="mb-2 text-base text-gray-600">
                      Size: <span>{selectedSize}</span>
                    </p>
                    <ul className="flex flex-wrap gap-2 md:gap-3">
                      {product.sizes.map((size, index) => (
                        <li
                          key={index}
                          onClick={() => handleSizeSelect(size)}
                          className={`mr-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-sm border p-1 text-sm font-medium uppercase md:h-12 md:w-12 md:text-base ${
                            size === selectedSize
                              ? "border-hover-color text-hover-color"
                              : "border-gray-500"
                          }`}
                        >
                          {size}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="mb-2 text-base-4">Quantity</p>
                    <div className="flex gap-2">
                      <div className="relative flex h-10 w-28 items-center justify-center border border-gray-300 md:h-12 md:w-32">
                        <button
                          type="button"
                          onClick={decrementQuantity}
                          className="absolute bottom-0 left-0 flex h-full w-8 items-center justify-center text-lg font-bold md:w-10 md:text-xl"
                        >
                          <RemoveIcon />
                        </button>
                        <input
                          className="h-full w-full px-8 text-center text-base-4 md:px-10"
                          type="number"
                          value={quantity}
                          readOnly
                        />
                        <button
                          type="button"
                          onClick={incrementQuantity}
                          className="absolute bottom-0 right-0 flex h-full w-8 items-center justify-center text-xl md:w-10 md:text-2xl"
                        >
                          <AddIcon />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={handleAddToCartClick}
                        disabled={loadingButton}
                        className="h-10 w-fit rounded bg-black px-4 py-2 text-center text-white transition-opacity duration-150 hover:opacity-75 md:h-12"
                      >
                        Add to Cart
                      </button>
                      <button
                        type="button"
                        onClick={handleBuyNowClick}
                        disabled={loadingButton}
                        className="h-10 w-fit rounded bg-hover-color px-4 py-2 text-center text-white transition-opacity duration-150 hover:opacity-75 md:h-12"
                      >
                        Buy Now
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAddToWishList(product)}
                        className="flex h-10 w-auto items-center justify-center p-2 md:h-12"
                      >
                        <FavoriteBorderIcon
                          fontSize="medium"
                          className="hover:text-hover-color"
                        />
                      </button>
                    </div>
                  </div>
                </form>
                <div className="mb-5 mt-2 flex h-15 items-center justify-between gap-10 rounded-md bg-gray-200 px-6 py-4">
                  <span className="">Secure checkout with</span>
                  <img
                    className="h-5 md:h-full"
                    src="https://july.uxper.co/fashion01/wp-content/uploads/sites/2/2022/04/payment-logo_e0eb93d9-1f43-41d8-9810-09ed5b649156.webp"
                    alt="payments"
                  />
                </div>
                <div className="text-base-5 text-gray-800">
                  <div className="flex gap-3">
                    <LocalShippingOutlinedIcon />
                    <p className="mb-3">Delivers in: 3-7 Working Days</p>
                  </div>
                  <p className="mb-3">Free shipping over $300</p>
                </div>
                <hr className="my-5 border border-gray-400" />
                <div className="mb-6 text-base-5">
                  <p className="mb-2">SKU: {product.sku}</p>
                  <p className="mb-2 flex gap-2">
                    Category:{" "}
                    <span>
                      {product.category.map((category, index) => (
                        <span key={index} className="text-hover-color">
                          {category}
                          {index < product.category.length - 1 && ", "}
                        </span>
                      ))}
                    </span>
                  </p>
                  <div className="flex gap-3">
                    <span>Share:</span>
                    <FacebookOutlinedIcon
                      fontSize="medium"
                      className="hover:text-hover-color"
                    />
                  </div>
                </div>
                <hr className="my-5 border border-gray-400" />
                <div className="mb-6">
                  <h4 className="mb-3 text-base-5">Description</h4>
                  <p className="text-base-5 text-gray-800">
                    {product.description}
                  </p>
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

export default ProductPage;
