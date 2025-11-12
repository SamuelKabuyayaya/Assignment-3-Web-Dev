import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import config from "../../config/config.js";
import bcrypt from "bcryptjs";

const signin = async (req, res) => {
    try {
    const user = await User.findOne({email: req.body.email});
    if(!user)
        return res.status(401).json({error: "User not found"});

    const match = await bcrypt.compare(req.body.password, user.password);
    if(!match)
        return res.status(401).json({error: "Email and password do not match"});

    const token = jwt.sign({_id: user._id, role: user.role}, config.jwtSecret,{
        expiresIn: "1h",
    });

    res.json({
        token,
        user: {_id: user._id, name: user.name, email: user.email},
    });
    } catch (err){
    console.error(err);
    res.status(401).json({error: "Could not sign in"});
   }
};
   const signout = (req, res) => {
    res.status(200).json({message: "Signed out successfully"});
   };

   const requireSignin = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) 
            return res.status(401).json({error: "Access denied"});

        const decoded = jwt.verify(token, config.jwtSecret);
        req.auth = decoded;
        next();
      } catch (err){
        return res.status(401).json({error: "Invalid or expired token"});
      }
    };

    const isAdmin = (req, res, next) => {
        if (req.auth && req.auth.role == "admin"){
            next();
        } else{
            return res.status(403).json({error: "Access Denied, You are not Admin."});
        }
    };
   

export default {signin, signout, requireSignin, isAdmin};