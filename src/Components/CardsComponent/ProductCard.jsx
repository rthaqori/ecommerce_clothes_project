import React from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Link } from "react-router-dom";

const ProductCard = (props) => {
  return (
    <li className="mb-8 h-fit w-fit">
      <div className="group relative mb-5 h-itemCardImage w-itemCardImage cursor-pointer overflow-hidden bg-card-bg">
        <Link to={`/product/${props.id}`}>
          <div className="group relative">
            <img
              className="h-full w-full object-contain mix-blend-multiply transition-all duration-300 group-hover:opacity-0"
              src={props.src}
              alt={`Product image of ${props.itemName}`}
              loading="lazy"
            />
            <div className="absolute left-0 top-20 h-full w-full text-white opacity-0 transition-all duration-300 ease-in-out group-hover:top-0 group-hover:opacity-100">
              <img
                className="object-contain mix-blend-multiply"
                src={props.hoverImg}
                alt={`Hover image of ${props.itemName}`}
                loading="lazy"
              />
            </div>
          </div>
        </Link>
        <div className="absolute -right-20 top-0 flex h-fit w-fit flex-col gap-3 px-4 py-5 text-white transition-all duration-200 ease-in group-hover:bottom-0 group-hover:right-0">
          <button
            aria-label="Add to Cart"
            className="h-10 w-10 rounded-full bg-white"
          >
            <SearchOutlinedIcon className="text-black" />
          </button>
          <button
            onClick={props.handleAddToWishList}
            aria-label="Add to Wishlist"
            className="h-10 w-10 rounded-full bg-white"
          >
            <FavoriteBorderOutlinedIcon className="text-black" />
          </button>
        </div>
        <button
          onClick={props.handleAddToCart}
          aria-label="Add to Cart"
          className="absolute -bottom-10 left-0 w-full bg-black11 py-2 text-white transition-all duration-200 ease-in hover:bg-hover-color group-hover:bottom-0"
        >
          Add to Cart
        </button>
      </div>
      <div className="flex flex-col">
        <h3 className="mb-1 text-itemName font-semibold transition-colors duration-150 ease-in hover:text-hover-color">
          {props.itemName}
        </h3>
        <span className="text-price">${props.price}</span>
      </div>
    </li>
  );
};

export default ProductCard;
