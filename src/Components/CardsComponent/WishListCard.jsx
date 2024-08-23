import React from "react";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

const WishListCard = (props) => {
  return (
    <div
      className="wish_list_card flex h-WishList rounded-sm border border-gray-200 hover:bg-gray-200"
      style={{}}
    >
      <div className="flex w-10-per border-r border-gray-200">
        <div className="flex w-1/4 items-center justify-center border-r border-gray-200 p-WishList">
          <button
            onClick={() => props.handleRemoveFromWishList(props.product.id)}
            className="text-center"
          >
            <CloseIcon className="text-gray-600" />
          </button>
        </div>
        <div className="h-full w-3/4 object-cover p-WishList">
          <Link to={`/product/${props.id}`}>
            <img
              className="h-full object-contain"
              src={props.product.mainImage}
              alt=""
            />
          </Link>
        </div>
      </div>
      <div className="flex h-full w-90-per">
        <div className="h-full w-1/2 border-r border-gray-200 p-WishList">
          <Link to={`/product/${props.id}`}>
            <h2 className="mb-1 text-base-2 font-semibold transition-colors duration-150 hover:text-hover-color">
              {props.itemName}
            </h2>
          </Link>
          <p className="mb-1 text-base-5 text-gray-500">${props.price}</p>
          <div className="flex gap-3">
            <input
              className="w-20 max-w-60 border-b border-black bg-transparent text-black focus:outline-none"
              type="text"
              placeholder="Add Note"
            />
            <button>Add</button>
          </div>
        </div>
        <div className="flex w-1/2 items-center justify-end p-WishList">
          <Link
            to={`/${props.id}`}
            className="flex h-12 w-auto items-center justify-center rounded border border-hover-color bg-hover-color px-8 text-base-4 font-medium text-white transition-colors duration-300 hover:bg-white hover:text-hover-color"
          >
            Select Options
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WishListCard;
