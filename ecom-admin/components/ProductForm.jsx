import React from "react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";

const ProductForm = ({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  buf: existingImage,
}) => {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [images, setImages] = useState({ myFile: existingImage || "" });
  const [goToProducts, setGoToProducts] = useState(false);
  const router = useRouter();

  // console.log(images);
  // console.log(title, description, price);

  async function saveProduct(ev) {
    ev.preventDefault();
    const buf = images.myFile;
    const data = { title, description, price, buf };
    // console.log(data);
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

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }
  const uploadImage2 = async (ev) => {
    const file = ev.target?.files[0];
    const base64 = await convertToBase64(file);
    // console.log(base64);
    setImages({ ...images, myFile: base64 });
  };
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
          {images.myFile ? (
            <Image src={images.myFile} alt="/" width="100" height="100" />
          ) : (
            <div>Upload</div>
          )}
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
