import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

export const authMiddleware = async (req, res, next) => {
    try {
        // 1. Get token from HTTP-only cookie
        const token = req.cookies.userToken;

        // 2. Check whether token exists
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required. Please login.'
            });
        }

        // 3. Verify JWT token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // 4. Check whether user still exists in database
        const user = await pool.query(
            `SELECT id, name, email, phone_number, location
             FROM users
             WHERE id = $1`,
            [decoded.id]
        );

        // 5. User doesn't exist
        if (user.rows.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'User not found. Please login again.'
            });
        }

        // 6. Store user information in req.user
        req.user = user.rows[0];

        // 7. Continue to the protected route
        next();

    } catch (error) {
        console.error('Auth middleware error:', error);

        // JWT expired
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token expired. Please login again.'
            });
        }

        // Invalid JWT
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: 'Invalid token. Please login again.'
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};