import React from "react";
import { useNavigate } from "react-router";
import api from "../services/api";

const Navbar = () => {
    const navigate = useNavigate();

    const logout = async () => {
        try {
            const token = localStorage.getItem("accessToken");

            await api.post(
                "/auth/logout",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
        } catch (error) {
            console.log(error);
        } finally {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");

            navigate("/login");
        }
    };

    return (
        <nav className="border-b border-gray-200 bg-white shadow-sm">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

                {/* Logo */}
                <button
                    onClick={() => navigate("/products")}
                    className="text-2xl font-bold text-blue-600 transition hover:text-blue-700"
                >
                    ProductApp
                </button>

                {/* Navigation */}
                <div className="flex items-center gap-4">

                    <button
                        onClick={() => navigate("/products")}
                        className="rounded-lg px-4 py-2 font-medium text-gray-700 transition hover:bg-gray-100 hover:text-blue-600"
                    >
                        Products
                    </button>

                    <button
                        onClick={logout}
                        className="rounded-lg bg-red-500 px-4 py-2 font-medium text-white transition hover:bg-red-600"
                    >
                        Logout
                    </button>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;