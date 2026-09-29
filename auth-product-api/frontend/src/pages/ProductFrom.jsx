import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import api from "../services/api";

const ProductForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
    });

    const [error, setError] = useState("");

    useEffect(() => {
        if (!id) return;

        const getProduct = async () => {
            try {
                const response = await api.get(`/products/${id}`);

                setFormData(response.data.data);
            } catch (error) {
                setError("Failed to fetch product");
            }
        };

        getProduct();
    }, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const token = localStorage.getItem("accessToken");

            if (id) {
                await api.put(`/products/${id}`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            } else {
                await api.post("/products", formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            }

            navigate("/products");
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to save product"
            );
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 px-4 py-10">

            <div className="mx-auto max-w-2xl">

                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate("/products")}
                        className="mb-4 text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                        ← Back to Products
                    </button>

                    <h1 className="text-3xl font-bold text-gray-900">
                        {id ? "Edit Product" : "Add Product"}
                    </h1>

                    <p className="mt-2 text-gray-500">
                        {id
                            ? "Update your product information"
                            : "Create a new product"}
                    </p>
                </div>

                {/* Form Card */}
                <div className="rounded-2xl bg-white p-8 shadow-sm">

                    {/* Error */}
                    {error && (
                        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >

                        {/* Name */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Product Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                placeholder="Enter product name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Description
                            </label>

                            <textarea
                                name="description"
                                placeholder="Enter product description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="4"
                                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        {/* Price + Stock */}
                        <div className="grid gap-6 sm:grid-cols-2">

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Price
                                </label>

                                <input
                                    type="number"
                                    name="price"
                                    placeholder="Enter price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    min="0"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Stock
                                </label>

                                <input
                                    type="number"
                                    name="stock"
                                    placeholder="Enter stock"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    min="0"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                        </div>

                        {/* Category */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Category
                            </label>

                            <input
                                type="text"
                                name="category"
                                placeholder="Enter product category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3 border-t border-gray-100 pt-6">

                            <button
                                type="button"
                                onClick={() => navigate("/products")}
                                className="flex-1 rounded-lg border border-gray-300 px-5 py-3 font-medium text-gray-700 transition hover:bg-gray-50"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="flex-1 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                            >
                                {id ? "Update Product" : "Add Product"}
                            </button>

                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProductForm;