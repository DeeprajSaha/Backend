import productModel from "../models/product.model.js"
import { validationResult } from "express-validator";

const createProductController = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        let { name, description, price, stock, category } = req.body;

        let newProduct = await productModel.create({
            name, description, price, stock, category
        })

        return res.status(201).json({
            message: "New Product Created successfully",
            data: newProduct
        })

    } catch (error) {

        console.log("Create product error:", error)
        
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

const getAllProductsController = async (req, res) => {
    try {
        const allProduct = await productModel.find();

        return res.status(200).json({
            message: "All products fetched",
            data: allProduct
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error while fetching products",
            error: error.message
        })
    }
}

const getSingleProductsController = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        let productId = req.params.id;

        let singleProduct = await productModel.findById(productId);

        if (!singleProduct) {
            return res.status(404).json({
                message: "Product not found"
            })
        }

        return res.status(200).json({
            message: "Single product fetched successfully",
            data: singleProduct,
        })

    } catch (error) {
        return res.status(500).json({
            message: "Error while fetching single product",
            error: error.message
        })
    }
}

const updateProductController = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        let productId = req.params.id;
        let body = req.body;

        let updatedProduct = await productModel.findByIdAndUpdate(productId, body, {
            new: true, runValidators: true
        }
        )

        if (!updatedProduct) {
            return res.status(404).json({
                message: "Product not found"
            })
        }

        return res.status(200).json({
            message: "Product updated successfully",
            data: updatedProduct
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

const deleteProductController = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        let productId = req.params.id;

        let deleteproduct = await productModel.findOneAndDelete(productId);

        if (!deleteproduct) {
            return req.status(404).json({
                message: "Product not found"
            })
        }

        return res.status(200).json({
            message: "Product deleted successfully",
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error while deleting product",
            error: error.message
        })
    }
}

export { createProductController, getAllProductsController, getSingleProductsController, updateProductController, deleteProductController }