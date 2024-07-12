import { Router, raw, response } from "express";
import productsModel from "../../dao/models/products.model.js";
import productsController from "../../controlles/productsController.js";
import mongoose from "mongoose";

const router = Router();


router.get("/products", productsController.getProductsController);

router.get("/products/:pid", productsController.getProductId);

router.post("/products", productsController.newProduct);

router.put("/products/:pid", productsController.putProduct);

router.delete("/products/:pid", productsController.deleteProduct);

export default router;
