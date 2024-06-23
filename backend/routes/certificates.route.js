import express from 'express'
import { createCertificate, deleteCertificate, getCertificates } from '../controllers/certificates.controller.js';
import { verifyToken } from '../utils/verifyToken.js';
const router = express.Router();

router.get("/", getCertificates);
router.delete("/delete/:id/:adminId", verifyToken, deleteCertificate);
router.post("/create/:adminId", verifyToken, createCertificate)

export default router;