import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await axios.get(
      "https://be-multi-role.vercel.app/api/v1/products"
    );
    setProducts(response.data);
  };

  const deleteProduct = async (productId) => {
    await axios.delete(
      `https://be-multi-role.vercel.app/api/v1/products/${productId}`
    );
    getProducts();
  };

  return (
    <div>
      <h1 class="text-2xl font-bold">Products</h1>
      <h2 class="text-lg font-semibold">List of Products</h2>
      <Link
        to="/products/add"
        class="button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-2 inline-block"
      >
        Add New
      </Link>
      <table class="table-auto w-full mt-4">
        <thead>
          <tr>
            <th class="px-4 py-2">No</th>
            <th class="px-4 py-2">Product Name</th>
            <th class="px-4 py-2">Price</th>
            <th class="px-4 py-2">Created By</th>
            <th class="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.uuid} class="border-b">
              <td class="px-4 py-2">{index + 1}</td>
              <td class="px-4 py-2">{product.name}</td>
              <td class="px-4 py-2">{product.price}</td>
              <td class="px-4 py-2">{product.user.name}</td>
              <td class="px-4 py-2">
                <Link
                  to={`/products/edit/${product.uuid}`}
                  class="button bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 mr-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteProduct(product.uuid)}
                  class="button bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
