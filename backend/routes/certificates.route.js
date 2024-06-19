import express from 'express'
import { createCertificate, deleteCertificate, getCertificates } from '../controllers/certificates.controller.js';
const router = express.Router();

router.get("/", getCertificates);
router.delete("/delete/:id", deleteCertificate);
router.post("/create", createCertificate)

export default router;