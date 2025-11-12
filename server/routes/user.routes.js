import express from "express";
import userCtrl from "../controllers/user.controller.js";
import authCtrl from "../controllers/auth.controller.js";


const router = express.Router();

router.route("/")
.get(authCtrl.requireSignin, authCtrl.isAdmin, userCtrl.list)
.post(userCtrl.create)
.delete(authCtrl.requireSignin, authCtrl.isAdmin, userCtrl.removeAll);

router.param("userId", userCtrl.userById);

router.route("/:userId")
.get(authCtrl.requireSignin, userCtrl.read)
.put(authCtrl.requireSignin, userCtrl.update)
.delete(authCtrl.requireSignin, authCtrl.isAdmin, userCtrl.remove);


export default router;
