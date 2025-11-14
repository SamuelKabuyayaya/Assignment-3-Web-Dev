import mongoose from "mongoose";
import config from "../config/config.js";
import User from "./models/user.model.js";
import bcrypt from "bcryptjs";

const seedAdmin = async () => {
    try{
        await mongoose.connect(config.mongoUri);
        const hashed = await bcrypt.hash ("AdminPass123", 10);

        const admin = {name: "Admin", email: "admin@gmail.com", password: hashed, role: "admin",};

        await User.deleteOne({email: admin.email});
        await User.create(admin);
        console.log("Congrats, you logged in as admin.");
        process.exit(0);
    }catch (err){
        console.error("Something went wrong. Check your data again.");
        process.exit(1);
    }
};

seedAdmin();