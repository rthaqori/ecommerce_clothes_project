import React, { useEffect, useState, useRef } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase";
import { v4 } from "uuid";
import { CircularProgress } from "@mui/material";
import CreatableSelect from "react-select/creatable";
import Sidebar from "./Sidebar";

const Products = () => {
  const [data, setData] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [loading, setLoading] = useState(false);
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
    timeStamp: new Date().toISOString(),
  });
  const [imagePreviews, setImagePreviews] = useState({
    mainImage: null,
    hoverImg: null,
    images: [],
  });
  const [editingProductId, setEditingProductId] = useState(null);

  const imgRef = useRef();

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
      setImagePreviews({
        ...imagePreviews,
        images: [
          ...imagePreviews.images,
          ...Array.from(files).map(URL.createObjectURL),
        ],
      });
    } else {
      setFormData({
        ...formData,
        [name]: files[0],
      });
      setImagePreviews({
        ...imagePreviews,
        [name]: URL.createObjectURL(files[0]),
      });
    }
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
    setImagePreviews({
      ...imagePreviews,
      images: imagePreviews.images.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading spinner

    try {
      let mainImageUrl = null;
      if (formData.mainImage) {
        const mainImageRef = ref(storage, `images/${formData.mainImage.name}`);
        await uploadBytes(mainImageRef, formData.mainImage);
        mainImageUrl = await getDownloadURL(mainImageRef);
      }

      let hoverImgUrl = null;
      if (formData.hoverImg) {
        const hoverImgRef = ref(storage, `images/${formData.hoverImg.name}`);
        await uploadBytes(hoverImgRef, formData.hoverImg);
        hoverImgUrl = await getDownloadURL(hoverImgRef);
      }

      const imageUrls = await Promise.all(
        formData.images.map(async (img) => {
          const imgRef = ref(storage, `images/${img.name}`);
          await uploadBytes(imgRef, img);
          return await getDownloadURL(imgRef);
        }),
      );

      // Create or update product in Firestore
      const newProduct = {
        ...formData,
        mainImage: mainImageUrl,
        hoverImg: hoverImgUrl,
        images: imageUrls,
      };

      if (editingProductId) {
        // Update existing product
        await setDoc(doc(db, "products", editingProductId), newProduct);
      } else {
        // Create new product
        const newDocRef = doc(collection(db, "products"));
        newProduct.id = newDocRef.id;
        await setDoc(newDocRef, newProduct);
        setData((prevData) => [...prevData, newProduct]);
      }

      // Reset the form and hide the form
      toggleFormVisibility();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  const editProduct = async (id) => {
    try {
      const docSnap = await getDoc(doc(db, "products", id));
      if (docSnap.exists()) {
        setFormData(docSnap.data());
        setEditingProductId(id);
        setImagePreviews({
          mainImage: docSnap.data().mainImage,
          hoverImg: docSnap.data().hoverImg,
          images: docSnap.data().images,
        });
        setIsFormVisible(true);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await deleteDoc(doc(db, "products", id));
      setData((prevData) => prevData.filter((product) => product.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const toggleFormVisibility = () => {
    setIsFormVisible((prev) => !prev);
    if (isFormVisible) {
      // Reset the form state when closing the form
      setFormData({
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
        timeStamp: new Date().toISOString(),
      });
      setImagePreviews({
        mainImage: null,
        hoverImg: null,
        images: [],
      });
      setEditingProductId(null);
      imgRef.current.value = null;
    }
  };

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
      }
    };
    fetchData();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "mainImage",
      headerName: "Main Image",
      width: 100,
      renderCell: (params) =>
        params.value ? (
          <div className="flex h-full items-center">
            <img
              className="aspect-square max-w-10 rounded-full object-cover"
              src={params.value}
              alt={params.row.name}
              style={{ width: "100%" }}
            />
          </div>
        ) : null,
    },
    { field: "name", headerName: "Product Name", width: 130 },
    { field: "price", headerName: "Price", width: 130 },
    { field: "description", headerName: "Description", width: 250 },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => (
        <div className="flex h-full items-center">
          <button
            className="flex h-8 w-fit items-center justify-center rounded-md border bg-blue-400 px-3 font-medium text-white"
            onClick={() => editProduct(params.row.id)}
          >
            Edit
          </button>
          <button
            className="ml-2 flex h-8 w-fit items-center justify-center rounded-md border bg-red-400 px-3 font-medium text-white"
            onClick={() => deleteProduct(params.row.id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex">
      <Sidebar />
      <section className="w-10/12 p-10">
        <div>
          <h1 className="text-4xl font-bold">Products</h1>
        </div>
        <div>
          <div className="flex h-12 items-center justify-end px-2">
            <button
              onClick={toggleFormVisibility}
              className="rounded-xl border bg-green-600 px-3 py-2 text-xs font-semibold text-white"
            >
              Add Product
            </button>
          </div>
          {isFormVisible && (
            <div className="absolute left-0 top-0 z-999 w-full rounded-md bg-white px-6 py-10 shadow-md">
              <form onSubmit={handleSubmit}>
                <div className="flex h-12 items-center justify-end px-28">
                  <button
                    onClick={toggleFormVisibility}
                    className="rounded-xl border bg-red-500 px-3 py-2 text-xs font-semibold text-white"
                  >
                    Cancle
                  </button>
                </div>
                <div className="mx-auto grid max-w-5xl grid-cols-2 gap-2 space-y-4 pt-4 shadow-2xl">
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
                      {imagePreviews.mainImage && (
                        <img
                          src={imagePreviews.mainImage}
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
                      {imagePreviews.hoverImg && (
                        <img
                          src={imagePreviews.hoverImg}
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
                        {imagePreviews.images.map((image, index) => (
                          <div key={index} className="relative mt-2">
                            <img
                              src={image}
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
                          setFormData({
                            ...formData,
                            sizes: selectedOptions
                              ? selectedOptions.map((opt) => opt.value)
                              : [],
                          })
                        }
                      />
                      <small className="text-gray-500">
                        Comma separated sizes
                      </small>
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
                          setFormData({
                            ...formData,
                            colors: selectedOptions
                              ? selectedOptions.map((opt) => opt.value)
                              : [],
                          })
                        }
                      />
                      <small className="text-gray-500">
                        Comma separated colors
                      </small>
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
                          setFormData({
                            ...formData,
                            category: selectedOptions
                              ? selectedOptions.map((opt) => opt.value)
                              : [],
                          })
                        }
                      />
                      <small className="text-gray-500">
                        Comma separated category
                      </small>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        {loading ? (
                          <CircularProgress size={24} color="inherit" />
                        ) : editingProductId ? (
                          "Update"
                        ) : (
                          "Add"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          )}
          <div className="w-full">
            <DataGrid
              rows={data}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              disableSelectionOnClick
              autoHeight
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
