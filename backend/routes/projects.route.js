import express from 'express';
import { createProject, deleteProject, editProject, getProjects, getProjectById } from '../controllers/projects.controller.js';
const router = express.Router();

router.get("/", getProjects);
router.get("/three", getProjects);
router.post("/create", createProject);
router.get("/:id", getProjectById);
router.put("/edit/:id", editProject);
router.delete("/delete/:id", deleteProject);

export default router;