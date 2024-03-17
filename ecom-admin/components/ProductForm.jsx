import React from "react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const ProductForm = ({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images,
}) => {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  // const [img, setImg] = useState(null);
  const [goToProducts, setGoToProducts] = useState(false);
  const router = useRouter();

  // console.log(title, description, price);

  async function saveProduct(ev) {
    ev.preventDefault();
    const data = { title, description, price };
    if (_id) {
      //update
      await axios.put("/api/products", { ...data, _id });
    } else {
      //create

      await axios.post("/api/products", data);
    }
    setGoToProducts(true);
  }
  if (goToProducts) {
    router.push("/products");
  }
  const uploadImage = async (ev) => {
    const files = ev.target?.files;
    if (files?.length > 0) {
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      try {
        // console.log(data);
        await axios.post("/api/upload", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        // console.log(res);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const uploadImage2 = () => {};
  return (
    <form onSubmit={saveProduct}>
      {/* ..................................................................... */}
      <label>Product name</label>
      <input
        type="text"
        placeholder="product name"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      {/* ..................................................................... */}
      <label>Photos</label>
      <div className="mb-2">
        <label className="w-24 h-24 border border-primary bg-primary bg-opacity-20 text-center rounded-lg flex justify-center items-center">
          <div>Upload</div>
          <input onChange={uploadImage2} type="file" className="hidden" />
        </label>
        {!images?.length && <div>No photos in this product</div>}
      </div>
      {/* ..................................................................... */}
      <label>Description</label>
      <textarea
        placeholder="description"
        value={description}
        onChange={(ev) => setDescription(ev.target.value)}
      />
      {/* ..................................................................... */}
      <label>Price (in USD)</label>
      <input
        type="text"
        placeholder="price"
        value={price}
        onChange={(ev) => setPrice(ev.target.value)}
      />
      <button type="submit" className="btn-primary">
        Save
      </button>
    </form>
  );
};

export default ProductForm;
