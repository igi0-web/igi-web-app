import express from 'express'
import { createCertificate, deleteCertificate, getCertificates, getCertificateById } from '../controllers/certificates.controller.js';
import { verifyToken } from '../utils/verifyToken.js';
const router = express.Router();

router.get("/", getCertificates);
router.get("/:id", getCertificateById);
router.delete("/delete/:id/:adminId", verifyToken, deleteCertificate);
router.post("/create/:adminId", verifyToken, createCertificate)

export default router;