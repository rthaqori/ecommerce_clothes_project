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
    <div className="flex h-200 w-full justify-start border-b border-gray-500 p-6">
      <div className="h-full" style={{ width: "140px", paddingRight: "20px" }}>
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
              onClick={handleUpdate}
              disabled={isUpdateDisabled}
              className={`h-full rounded px-6 py-3 font-semibold text-white ${isUpdateDisabled ? "cursor-not-allowed bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
            >
              Update
            </button>
          </div>
        </div>
      </div>
      <div className="ml-auto flex h-full items-center">
        <div className="flex h-32 flex-col items-end justify-between">
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
