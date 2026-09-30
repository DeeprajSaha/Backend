import User from "../models/user.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { validationResult } from "express-validator";

const registerUser = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        let { name, email, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({
                message: "Passwords do not match"
            });
        }

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(409).json({
                message: "Email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name, email, password: hashedPassword
        })

        const userWithoutPssword = await User.findById(user._id).select("-password")

        return res.status(201).json({
            message: "User registered successfully",
            user: userWithoutPssword
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

const loginUser = async (req, res) => {
    try {
        console.log("LOGIN REQUEST:", req.body);

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        let { email, password } = req.body;

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            })
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        )

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid email or password"
            })
        }

        const refreshToken = jwt.sign(
            { id: user._id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "7d" }
        );

        const accessToken = jwt.sign(
            { id: user._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
        );

        user.refreshToken = refreshToken;
        await user.save();

        return res.status(200).json({
            message: "Login successful",
            accessToken,
            refreshToken
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

const me = async (req, res) => {
    try {

        const user = await User.findById(req.user.id).select("-password -refreshToken")

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        return res.status(200).json({
            user
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

const refreshTokenController = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(401).json({
                message: "Refresh token required"
            });
        }

        const decoded = jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({
                message: "Invalid refresh token"
            })
        }

        if (user.refreshToken !== refreshToken) {
            return res.status(401).json({

                message: "Invalid refresh token"
            });
        }

        const accessToken = jwt.sign(
            { id: user._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
        )

        return res.status(201).json({
            accessToken
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal error",
            error: error.message
        })
    }
}

const logout = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        user.refreshToken = null;

        await user.save();

        return res.status(200).json({
            message: "Logout successfully done.."
        })


    } catch (error) {
        return res.status(500).json({
            message: "Interval server error",
            error: error.message
        })
    }
}

export { registerUser, loginUser, me, refreshTokenController, logout } 