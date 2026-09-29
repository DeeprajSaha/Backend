import express from "express";
import { body, param } from "express-validator";

import authenticate from "../middlewares/auth.middleware.js";

import {
    createProductController,
    deleteProductController,
    getAllProductsController,
    getSingleProductsController,
    updateProductController
} from "../controllers/product.controller.js";

const router = express.Router();


router.get(
    "/",
    getAllProductsController
);


router.get(
    "/:id",
    [
        param("id")
            .isMongoId()
            .withMessage("Invalid product ID")
    ],
    getSingleProductsController
);


router.post(
    "/",
    authenticate,
    [
        body("name")
            .notEmpty()
            .withMessage("Product name is required"),

        body("description")
            .notEmpty()
            .withMessage("Description is required"),

        body("price")
            .isNumeric()
            .withMessage("Price must be a number"),

        body("stock")
            .isNumeric()
            .withMessage("Stock must be a number"),

        body("category")
            .notEmpty()
            .withMessage("Category is required")
    ],
    createProductController
);


router.put(
    "/:id",
    authenticate,
    [
        param("id")
            .isMongoId()
            .withMessage("Invalid product ID"),

        body("name")
            .notEmpty()
            .withMessage("Product name is required"),

        body("description")
            .notEmpty()
            .withMessage("Description is required"),

        body("price")
            .isNumeric()
            .withMessage("Price must be a number"),

        body("stock")
            .isNumeric()
            .withMessage("Stock must be a number"),

        body("category")
            .notEmpty()
            .withMessage("Category is required")
    ],
    updateProductController
);

router.delete(
    "/:id",
    authenticate,
    [
        param("id")
            .isMongoId()
            .withMessage("Invalid product ID")
    ],
    deleteProductController
);


export default router;