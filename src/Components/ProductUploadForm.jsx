import React, { useState } from "react";
import { v4 } from "uuid";
import CreatableSelect from "react-select/creatable";

const ProductForm = () => {
  const [formData, setFormData] = useState({
    id: v4(),
    name: "",
    price: "",
    mainImage: null,
    hoverImg: null,
    images: [],
    sku: "",
    sizes: [],
    colors: [],
    description: "",
    rating: "",
    category: [],
    logo: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (name === "images") {
      setFormData({
        ...formData,
        images: [...formData.images, ...Array.from(files)],
      });
    } else {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    }
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  const handleSelectChange = (name, selectedOptions) => {
    setFormData({
      ...formData,
      [name]: selectedOptions
        ? selectedOptions.map((option) => option.value)
        : [],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const renderImagePreview = (image) => {
    return URL.createObjectURL(image);
  };

  return (
    <div className="mx-auto my-20 max-w-5xl rounded-md bg-white p-6 shadow-md">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-2 space-y-4"
      >
        <div className="col-span-1 flex flex-col space-y-2 p-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Main Image
            </label>
            <input
              type="file"
              name="mainImage"
              onChange={handleImageChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
            {formData.mainImage && (
              <img
                src={renderImagePreview(formData.mainImage)}
                alt="Main Preview"
                className="mt-2 h-32 w-32 object-contain"
              />
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Hover Image
            </label>
            <input
              type="file"
              name="hoverImg"
              onChange={handleImageChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
            {formData.hoverImg && (
              <img
                src={renderImagePreview(formData.hoverImg)}
                alt="Hover Preview"
                className="mt-2 h-32 w-32 object-contain"
              />
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Images
            </label>
            <input
              type="file"
              name="images"
              onChange={handleImageChange}
              multiple
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
            <div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
              {formData.images.map((image, index) => (
                <div key={index} className="relative mt-2">
                  <img
                    src={renderImagePreview(image)}
                    alt={`Preview ${index}`}
                    className="h-32 w-32 object-contain"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute right-0 top-0 grid h-6 w-6 content-center rounded-full bg-red-500 p-1 text-white focus:outline-none"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-1 grid grid-flow-row space-y-2 p-4 pt-0">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              SKU
            </label>
            <input
              type="text"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Sizes
            </label>
            <CreatableSelect
              isClearable
              isMulti
              name="sizes"
              value={formData.sizes.map((size) => ({
                label: size,
                value: size,
              }))}
              onChange={(selectedOptions) =>
                handleSelectChange("sizes", selectedOptions)
              }
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Colors
            </label>
            <CreatableSelect
              isClearable
              isMulti
              name="colors"
              value={formData.colors.map((color) => ({
                label: color,
                value: color,
              }))}
              onChange={(selectedOptions) =>
                handleSelectChange("colors", selectedOptions)
              }
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Rating
            </label>
            <input
              type="number"
              step="0.1"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <CreatableSelect
              isClearable
              isMulti
              name="category"
              value={formData.category.map((cat) => ({
                label: cat,
                value: cat,
              }))}
              onChange={(selectedOptions) =>
                handleSelectChange("category", selectedOptions)
              }
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
