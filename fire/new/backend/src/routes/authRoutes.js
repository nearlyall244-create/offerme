import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { registerProfile, getMe } from '../controllers/authController.js';

const router = Router();

router.post('/register-profile', authenticate, registerProfile);
router.get('/me', authenticate, getMe);

export default router;
