import express from "express";
import { userRegister,LoginUser,userLogout} from "../Controller/User.controller.js";


const router = express.Router();


router.post("/register", userRegister);
router.post("/login", LoginUser);
router.post("/logout", userLogout);


export default router;
