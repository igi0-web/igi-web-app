import express from 'express';
import { editCompanyProfile, getCompanyProfile } from '../controllers/cprofile.controller.js';
const router = express.Router();

router.get("/", getCompanyProfile);
router.put("/edit", editCompanyProfile);

export default router;