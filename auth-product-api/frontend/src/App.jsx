import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Products from "./pages/Products";

import ProtectedRoute from "./components/ProtectedRoute";
import ProductForm from "./pages/ProductFrom";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<Register />} />

                <Route path="/login" element={<Login />} />

                <Route element={<ProtectedRoute />}>
                    <Route path="/products" element={<Products />} />

                    <Route path="/products/add" element={<ProductForm />} />

                    <Route
                        path="/products/edit/:id"
                        element={<ProductForm/>}
                    />
                </Route>

                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
