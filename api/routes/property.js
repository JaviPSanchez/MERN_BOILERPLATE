import express from "express";
import { getByProperty } from "../controllers/propertyController.js";

const router = express.Router();

//GET HOTELS

router.get("/getPropertiesByType", getByProperty);

export default router;
