import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";

const DeleteProductPage = () => {
  const router = useRouter();
  const [productInfo, setProductInfo] = useState();
  const { id } = router.query;
  useEffect(() => {
    if (!id) return;
    axios.get("/api/products?id=" + id).then((response) => {
      setProductInfo(response.data);
    });
  }, [id]);

  const goBack = () => {
    router.push("/products");
  };

  const deleteProduct = async () => {
    //Delete product
    await axios.delete("/api/products?id=" + id);
    goBack();
  };

  return (
    <Layout>
      <h1>Do you really want to delete "{productInfo?.title}"?</h1>
      <button
        className="mr-4 border borer-2 border-dark px-4"
        onClick={deleteProduct}
      >
        Yes
      </button>
      <button className="border borer-2 border-dark px-4" onClick={goBack}>
        No
      </button>
    </Layout>
  );
};

export default DeleteProductPage;
