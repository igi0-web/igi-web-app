import express from 'express'
import { signIn, signOut } from '../controllers/auth.controller.js';
const router = express.Router();

router.post("/sign-in", signIn);
router.get('/sign-out', signOut);

export default router;