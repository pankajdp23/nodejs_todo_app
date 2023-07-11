import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const isAuthenticatedUser = async(req, res, next) => {
    const {token} = req.cookies;
    
    if(!token) 
    return res.json({
        success:false,
        message: "Login first"
    })

    const decode =  jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decode._id);

    next();
};