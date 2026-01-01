import express from "express";
import { searchItems } from "../Controller/Search.controller.js";



const router = express.Router();


router.get("/", searchItems);


export default router;
