import express from 'express';
import { createCategory, createProduct, deleteCategory, deleteProduct, editProduct, get6Products, getCategories, getProductById, getProducts, searchProducts } from '../controllers/products.controller.js';
const router = express.Router();

router.get("/categories/", getCategories);
router.post("/categories/create", createCategory);
router.delete("/categories/delete/:id", deleteCategory);

router.get("/", getProducts);
router.get("/six", get6Products);
router.get("/search", searchProducts);
router.get("/:id", getProductById);
router.post("/create", createProduct);
router.put("/edit/:id", editProduct);
router.delete("/delete/:id", deleteProduct);

export default router;