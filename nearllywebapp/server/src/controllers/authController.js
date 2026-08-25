import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import pool from '../config/db.js'

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000 // cookies expries upto 30days 
}

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "30d"
    })
}

//REGISTER
export const userregister = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            phone_number,
            location,
            role } = req.body;


        // Check required fields
        if (!name || !email || !password || !phone_number || !location || !role) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }

        // Only allow these roles from public registration
        const allowedRoles = ["user", "owner"];

        if (!allowedRoles.includes(role)) {
            return res.status(403).json({
                success: false,
                message: "Invalid role"
            });
        }

        //register already exists
        const reguserExists = await pool.query("SELECT * FROM users WHERE email=$1", [email])

        if (reguserExists.rows.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }

        //bcrypt
        const hashPassword = await bcrypt.hash(password, 10); //10 is saltround

        //query for postgresSQL to insert the user data

        const registerQuery = await pool.query(`INSERT INTO users 
        (name, email, password, phone_number, location, role) VALUES ($1, $2, $3, $4, $5, $6) 
        RETURNING id, name, email, phone_number, location, role, created_at`, [
            name, email, hashPassword, phone_number, location, role]);

        //generating token
        const token = generateToken({
            id: registerQuery.rows[0].id,
            email: registerQuery.rows[0].email,
            role: registerQuery.rows[0].role
        });

        res.cookie("userToken", token, cookieOptions);
        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: registerQuery.rows[0].id,
                email: registerQuery.rows[0].email,
                role: registerQuery.rows[0].role,
            }
        });
    }
    catch (error) {
        console.error('Register error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

// LOGIN

export const userlogin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({
                message: 'Email and password are required'
            })
        }

        const userlogexit = await pool.query(
            `SELECT * FROM users WHERE email=$1`, [email])

        // User does not exist
        if (userlogexit.rows.length === 0) {
            return res.status(401).json({
                message: "invalid credentials"
            })
        }
        // Get user data
        const userLogdata = userlogexit.rows[0]
        const isPasswordMatch = await bcrypt.compare(password, userLogdata.password)

        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: "invalid credentials"
            })
        }

        const token = generateToken({
            id: userLogdata.id,
            email: userLogdata.email,
            role: userLogdata.role
        })
        // Store JWT in HTTP-only cookie
        res.cookie("userToken", token, cookieOptions);
        // Send successful response 
        return res.status(200).json({
            success: true,
            message: 'Login successful',
            user: {
                id: userLogdata.id,
                name: userLogdata.name,
                email: userLogdata.email,
                phone_number: userLogdata.phone_number,
                location: userLogdata.location,
                role: userLogdata.role
            }
        });

    } catch (error) {
        console.error('login error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
}

// LOGOUT

export const userlogout = async (req, res) => {
    try {
        res.cookie("userToken", "",
            { ...cookieOptions, maxAge: 1 });
        return res.status(200).json({
            success: true, message: "Logged out successfully"
        });
    } catch (error) {
        console.error("Logout error:", error);
        return res.status(500).json({
            success: false, message: "Internal server error"
        });
    }
};

