import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'


export const protect = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (token && token.startsWith('Bearer ')) {
            token = token.split(' ')[1]; // Extract the token part
            const decode = jwt.verify(token, process.env.JWT_SECRET); // Use process.env
            req.user = await User.findById(decode.id).select('-password');
            next();
        } else {
            res.status(401).json({
                message: "Not authorized, no token found"
            });
        }
    } catch (error) {
        res.status(401).json({
            message: 'Token failed',
            error: error.message
        });
    }
}