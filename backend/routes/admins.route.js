import express from "express"
import { createAdmin, deleteAdmin, editAdmin, getAdminById, getAdmins } from "../controllers/admins.controller.js";
import { verifyToken } from "../utils/verifyToken.js";
const router = express.Router();


router.post("/create/:adminId", verifyToken, createAdmin);
router.patch("/edit/:adminId", verifyToken, editAdmin);
router.get("/:adminId", verifyToken, getAdmins);
router.get("/profile/:adminId", verifyToken, getAdminById);
router.delete("/delete/:id/:adminId", verifyToken, deleteAdmin)

export default router