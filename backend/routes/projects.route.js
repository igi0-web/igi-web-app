import express from 'express';
import { createProject, deleteProject, editProject, getProjects, getProjectById } from '../controllers/projects.controller.js';
import { verifyToken } from '../utils/verifyToken.js';
const router = express.Router();

router.get("/", getProjects);
router.get("/three", getProjects);
router.post("/create/:adminId", verifyToken, createProject);
router.get("/:id", getProjectById);
router.patch("/edit/:id/:adminId", verifyToken, editProject);
router.delete("/delete/:id/:adminId", verifyToken, deleteProject);

export default router;