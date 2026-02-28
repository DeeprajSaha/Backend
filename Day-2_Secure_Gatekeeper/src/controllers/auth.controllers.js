import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';


export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const hasedPasswrod = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            password: hasedPasswrod
        });

        res.status(201).json({
            message: "User registered successfully",
            user: { 
                id: newUser._id,
                username: newUser.username }
        })
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if(!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message: "Invalid credentials"});
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.cookie('token', token, { httpOnly: true } 
        ).status(200).json({
            message: "Login successfully",
            token,
            user: { id: user._id, username: user.username}
        });
    } catch (err){
        res.status(500).json({message: err.message});
    }
} 

export const logoutUser = async (req, res) => {

    try {
        res.clearCookie("token").status(200).json({
            message: "Logged out successfully!"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }

};