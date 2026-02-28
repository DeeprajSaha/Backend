import express, { Router } from 'express';
import { loginUser, logoutUser, registerUser } from '../controllers/auth.controllers.js';
import { isLoggedIn } from '../middlewares/auth.middleware.js';


const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);

router.get('/profile', isLoggedIn, (req, res) => {
    res.json({
        message: "This is your private profile data",
        user: req.user
    });
});


export default router;
