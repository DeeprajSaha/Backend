import jwt from 'jsonwebtoken';

export const isLoggedIn = (req, res) => {
    try{
        const token = req.cookie.body;

        if(!token){
            return res.status(401).json({
                message: "No token , authorization denied"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        res.user = decoded;

        next();
    } catch(err){
        res.status(401).json({
            message: "Token is not valid"
        });
    };
}