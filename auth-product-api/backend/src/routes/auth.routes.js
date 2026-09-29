import express from "express";
import {
    registerUser,
    loginUser,
    me,
    refreshTokenController,
    logout
} from "../controllers/auth.controller.js";

import authenticate from "../middlewares/auth.middleware.js";

import { body } from "express-validator";

const router = express.Router();

router.post(
    "/register",
    [
        body("name")
            .notEmpty()
            .withMessage("Name is required"),

        body("email")
            .isEmail()
            .withMessage("Valid email is required"),

        body("password")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters"),

        body("confirmPassword")
            .notEmpty()
            .withMessage("Confirm password is required")
    ],
    registerUser
);

router.post(
    "/login",
    [
        body("email")
            .isEmail()
            .withMessage("Valid email is required"),

        body("password")
            .notEmpty()
            .withMessage("Password is required")
    ],
    loginUser
);

router.get(
    "/me",
    authenticate,
    me
);


router.post(
    "/refresh",
    refreshTokenController
);

router.post(
    "/logout",
    authenticate,
    logout
);

export default router;