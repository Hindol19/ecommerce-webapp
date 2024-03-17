import Layout from "@/components/Layout";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("/api/products").then((response) => {
      setProducts(response.data);
    });
  }, []);

  return (
    <Layout>
      <Link
        href="/products/new"
        className="bg-primary text-light py-1 px-2 rounded-md"
      >
        Add new product
      </Link>
      <table className="basic mt-2">
        <thead>
          <tr>
            <td>Product name</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            return (
              <tr>
                <td>{product.title}</td>
                <td className="flex flex-row justify-evenly">
                  <Link href={"/products/edit/" + product._id}>Edit</Link>
                  <Link href={"/products/delete/" + product._id}>Delete</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Layout>
  );
};

export default Products;
