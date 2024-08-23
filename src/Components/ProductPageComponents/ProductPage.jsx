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
} from "../LocalStorage/LocalStorage"; // Adjust the path as necessary

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
        setImageUrl(product.mainImage); // Set initial image
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
      <div className="mb-10 px-11 pt-10">
        <div className="border-b border-gray-400 pb-10">
          <div className="grid grid-cols-12">
            <div className="col-span-6 grid h-[600px] grid-cols-12 overflow-clip px-4">
              <div className="imgScroll col-span-3 flex h-full snap-y snap-mandatory flex-col gap-2 overflow-y-scroll p-2">
                {product.images.map((image, index) => (
                  <div key={index} className="w-full snap-start">
                    <img
                      onMouseEnter={() => handleImageUrl(image)}
                      loading="lazy"
                      className="h-40 w-full object-contain"
                      src={image}
                      alt={`Product Image ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
              <div className="col-span-9 h-full p-2">
                <img
                  loading="lazy"
                  className="h-full w-full object-contain"
                  src={imageUrl}
                  alt={`Main view of ${product.name}`}
                />
              </div>
            </div>
            <div className="col-span-6 px-4">
              <div className="pl-4 pt-5">
                <h2 className="mb-1 text-h2 font-medium">{product.name}</h2>
                <p className="mb-5 text-priceText font-medium">
                  ${product.price}
                </p>
                <form className="pb-4">
                  <div className="mb-6">
                    <p className="mb-2 text-base text-gray-600">
                      Size: <span>{selectedSize}</span>
                    </p>
                    <ul className="flex gap-3">
                      {product.sizes.map((size, index) => (
                        <li
                          key={index}
                          onClick={() => handleSizeSelect(size)}
                          className={`mr-2 flex h-12 w-12 cursor-pointer items-center justify-center rounded-sm border p-1 text-base font-medium uppercase ${
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
                      <div className="relative flex h-12 w-32 items-center justify-center border border-gray-300">
                        <button
                          type="button"
                          onClick={decrementQuantity}
                          className="absolute bottom-0 left-0 flex h-full w-10 items-center justify-center text-xl font-bold"
                        >
                          <RemoveIcon />
                        </button>
                        <input
                          className="h-full w-full px-10 text-center text-base-4"
                          type="number"
                          value={quantity}
                          readOnly
                        />
                        <button
                          type="button"
                          onClick={incrementQuantity}
                          className="absolute bottom-0 right-0 flex h-full w-10 items-center justify-center text-2xl"
                        >
                          <AddIcon />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={handleAddToCartClick}
                        disabled={loadingButton}
                        className="h-12 w-fit rounded bg-black px-4 py-2 text-center text-white transition-opacity duration-150 hover:opacity-75"
                      >
                        Add to Cart
                      </button>
                      <button
                        type="button"
                        onClick={handleBuyNowClick}
                        disabled={loadingButton}
                        className="h-12 w-fit rounded bg-hover-color px-4 py-2 text-center text-white transition-opacity duration-150 hover:opacity-75"
                      >
                        Buy Now
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAddToWishList(product)}
                        className="flex h-12 w-auto items-center justify-center p-2"
                      >
                        <FavoriteBorderIcon
                          fontSize="medium"
                          className="hover:text-hover-color"
                        />
                      </button>
                    </div>
                  </div>
                </form>
                <div className="mb-5 mt-2 flex h-15 items-center gap-10 rounded-md bg-gray-200 px-6 py-4">
                  <span className="">Secure checkout with</span>
                  <img
                    className="h-full"
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
                        <span
                          key={index}
                          className="mr-2 font-medium uppercase"
                        >
                          {category}
                        </span>
                      ))}
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-3 text-base-2">
                  <p>Share</p>
                  <div>
                    <a href="https://www.facebook.com/sharer/sharer.php?u=yourproducturl">
                      <FacebookOutlinedIcon fontSize="large" />
                    </a>
                  </div>
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
