// CartCard.js
import React, { useState, useEffect } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

const CartCard = ({ id, item, onDelete, onUpdate }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [originalQuantity, setOriginalQuantity] = useState(item.quantity);

  useEffect(() => {
    setOriginalQuantity(item.quantity);
  }, [item.quantity]);

  const incrementQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
    }
  };

  const handleUpdate = () => {
    if (quantity !== originalQuantity) {
      onUpdate(item.id, quantity);
      setOriginalQuantity(quantity); // Update originalQuantity to the new quantity
    }
  };

  const isUpdateDisabled = quantity === originalQuantity;

  return (
    <div className="flex h-[150px] w-full justify-start border-b border-gray-500 p-2 md:h-200 md:p-6">
      <div className="h-full min-w-[100px] md:w-[140px] md:pr-5">
        <img
          className="h-full object-contain"
          src={item.mainImage}
          alt={item.name}
        />
      </div>
      <div className="flex items-center">
        <div className="ml-4">
          <Link to={`/product/${id}`}>
            <h2 className="mb-2 text-sm font-semibold">{item.name}</h2>
          </Link>
          <p className="mb-2 text-base-1 text-gray-600">
            Size:{" "}
            <span className="uppercase text-black">{item.selectedSize}</span>
          </p>
          <div className="flex h-full gap-3">
            <div className="relative flex h-8 w-24 items-center justify-center border border-gray-300 md:h-10 md:w-28 lg:h-12 lg:w-32">
              <button
                type="button"
                onClick={decrementQuantity}
                className="absolute bottom-0 left-0 flex h-full items-center justify-center text-xl font-bold md:w-10"
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
                className="absolute bottom-0 right-0 flex h-full items-center justify-center text-2xl md:w-10"
              >
                <AddIcon />
              </button>
            </div>
            <button
              onClick={handleUpdate}
              disabled={isUpdateDisabled}
              className={`h-8 rounded px-2 font-semibold text-white md:h-10 md:px-4 lg:h-12 lg:px-6 ${isUpdateDisabled ? "cursor-not-allowed bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
            >
              Update
            </button>
          </div>
        </div>
      </div>
      <div className="ml-auto flex h-full items-center">
        <div className="flex h-32 flex-col items-end justify-between pb-5 md:pb-0">
          <button onClick={() => onDelete(item.id)} className="mb-2">
            <CloseIcon />
          </button>
          <p className="text-base-1 text-gray-600">
            ${item.price * item.quantity}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
