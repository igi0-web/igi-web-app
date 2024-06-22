import express from 'express';
import { editCompanyProfile, getCompanyProfile } from '../controllers/cprofile.controller.js';
import { verifyToken } from '../utils/verifyToken.js';
const router = express.Router();

router.get("/", getCompanyProfile);
router.put("/edit/:adminId", verifyToken, editCompanyProfile);

export default router;