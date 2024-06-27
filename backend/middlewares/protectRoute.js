import jwt from "jsonwebtoken"
import UserModel from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ error: "Unauthorised - No token provided - Login first!" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if(!decoded) {
            return res.status(401).json({ error: "Unauthorised - Invalid token provided!" });
        }

        const user = await UserModel.findById(decoded.userId).select('-password');
        if(!user) {
            return res.status(404).json({ error: "User not found!" });
        }

        req.user = user;
        next();
    }
    catch (err) {
        console.log(chalk.hex('#ff0000').bold("~ Error in protectRoute middleware!"));
        console.log(err.message);
        res.status(500).json({ error: 'Internal Server Error!' });
    }
}

export default protectRoute;