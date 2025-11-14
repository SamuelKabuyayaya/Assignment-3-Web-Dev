import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import config from "../../config/config.js";
import bcrypt from "bcryptjs";

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });

    await user.save();

    res.status(201).json({ message: "Signup successful!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Signup failed" });
  }
};


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
     const authHeader = req.headers.authorization;

     if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
     }

     const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({ error: "Invalid authorization format" });
  } 

  const token = parts[1];
  if (!token) {
    return res.status(401).json({ error: "Token missing" });
  }
    
  try{
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
            return res.status(403).json({error: "Access Denied, you are not Admin."});
        }
    };
   

export default {signup, signin, signout, requireSignin, isAdmin};