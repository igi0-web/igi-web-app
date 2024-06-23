import express from 'express';
import { createNews, deleteNews, editNews, getNews, getNewsById } from '../controllers/news.controller.js';
const router = express.Router();

router.get("/", getNews);
router.post("/create/:adminId", createNews);
router.get("/:id", getNewsById);
router.patch("/edit/:id/:adminId", editNews);
router.delete("/delete/:id/:adminId", deleteNews);
export default router;