import express from 'express';
import { createNews, deleteNews, editNews, getNews, getNewsById } from '../controllers/news.controller.js';
const router = express.Router();

router.get("/", getNews);
router.post("/create", createNews);
router.get("/:id", getNewsById);
router.put("/edit/:id", editNews);
router.delete("/delete/:id", deleteNews);
export default router;