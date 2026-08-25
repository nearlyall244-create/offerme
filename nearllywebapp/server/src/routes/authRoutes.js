import express from 'express';
import { userlogin, userlogout, userregister } from '../controllers/authController.js'
import { authMiddleware } from '../middleware/authMiddleware.js';
const router = express.Router()

// ============================================================
// POST http://localhost:5000/api/auth/userregister
// ============================================================
router.post('/userregister', userregister);

// ============================================================
// POST http://localhost:5000/api/auth/userlogin
// ============================================================
router.post('/userlogin', userlogin);

// ============================================================
// POST http://localhost:5000/api/auth/userlogout
// ============================================================
router.post('/userlogout', userlogout);


// ============================================================
// PROTECTED ROUTE
// GET /api/auth/me
router.get('/me', authMiddleware, (req, res) => {

    return res.status(200).json({
        success: true,
        user: req.user
    });

});


export default router;
