import { Router } from 'express';
import { sendOTP, verifyOTP, checkVerification } from '../controllers/otpController.js';

const router = Router();

router.post('/send', sendOTP);
router.post('/verify', verifyOTP);
router.get('/status', checkVerification);

export default router;
