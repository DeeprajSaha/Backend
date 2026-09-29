import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import api from "../services/api";
import Navbar from "../components/Navbar";

const Products = () => {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");

const getProducts = async () => {
    try {
        const response = await api.get("/products");

        console.log("GET PRODUCTS RESPONSE:", response.data);

        setProducts(response.data.data || []);

    } catch (error) {
        console.log("GET PRODUCTS ERROR:", error.response?.data);

        setError(
            error.response?.data?.message ||
            "Failed to fetch products"
        );
    }
};

    useEffect(() => {
        getProducts();
    }, []);

    const deleteProduct = async (id) => {
        try {
            const token = localStorage.getItem("accessToken");

            await api.delete(`/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            getProducts();
        } catch (error) {
            setError(
                error.response?.data?.message || "Failed to delete product",
            );
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            <div className="mx-auto max-w-7xl px-6 py-8">
                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Products
                        </h1>

                        <p className="mt-1 text-gray-500">
                            Manage your products
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/products/add")}
                        className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
                    >
                        + Add Product
                    </button>
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-600">
                        {error}
                    </div>
                )}

                {/* Products */}
                {products.length === 0 ? (
                    <div className="rounded-xl bg-white p-10 text-center shadow-sm">
                        <h2 className="text-xl font-semibold text-gray-800">
                            No products found
                        </h2>

                        <p className="mt-2 text-gray-500">
                            Add your first product to get started.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {products.map((product) => (
                            <div
                                key={product._id}
                                className="rounded-xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                            >
                                {/* Product information */}
                                <div className="mb-5">
                                    <h2 className="text-xl font-semibold text-gray-900">
                                        {product.name}
                                    </h2>

                                    <p className="mt-2 line-clamp-2 text-sm text-gray-500">
                                        {product.description}
                                    </p>
                                </div>

                                {/* Product details */}
                                <div className="space-y-2 border-t border-gray-100 pt-4">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">
                                            Price
                                        </span>

                                        <span className="font-semibold text-gray-900">
                                            ₹{product.price}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-gray-500">
                                            Stock
                                        </span>

                                        <span className="font-medium text-gray-900">
                                            {product.stock}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-gray-500">
                                            Category
                                        </span>

                                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
                                            {product.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="mt-6 flex gap-3">
                                    <button
                                        onClick={() =>
                                            navigate(
                                                `/products/edit/${product._id}`,
                                            )
                                        }
                                        className="flex-1 rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 transition hover:bg-gray-100"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() =>
                                            deleteProduct(product._id)
                                        }
                                        className="flex-1 rounded-lg bg-red-500 px-4 py-2 font-medium text-white transition hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;
