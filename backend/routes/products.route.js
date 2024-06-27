import express from 'express';
import { createCategory, createProduct, deleteCategory, deleteProduct, editCategory, editProduct, get6Products, getCategories, getCategoryById, getProductById, getProducts,  searchProducts } from '../controllers/products.controller.js';
import { verifyToken } from '../utils/verifyToken.js';
const router = express.Router();

router.get("/categories/", getCategories);
router.get("/categories/:id", getCategoryById);
router.patch("/categories/edit/:id/:adminId", verifyToken, editCategory);
router.post("/categories/create/:adminId", verifyToken, createCategory);
router.delete("/categories/delete/:id/:adminId", verifyToken, deleteCategory);

router.get("/", getProducts);
router.get("/six", get6Products);
router.get("/search", searchProducts);
router.get("/:id", getProductById);
router.post("/create/:adminId", verifyToken, createProduct);
router.patch("/edit/:id/:adminId", verifyToken, editProduct);
router.delete("/delete/:id/:adminId", verifyToken, deleteProduct);

export default router;