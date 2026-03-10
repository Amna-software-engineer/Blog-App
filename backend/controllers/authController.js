import { check, validationResult } from "express-validator";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer';
import dotenv from "dotenv";

dotenv.config();

const JWT_ACCESS_SECRET = process.env.access_token_secret;
const JWT_REFRESH_SECRET = process.env.refresh_token_secret;
const JWT_RESET_PASSWORD_SECRET = process.env.Reset_password_Secret;
const JWT_ADMIN_SECRET_key = process.env.admin_secret_key;

// 1. Login controller
export const postLogin = [
    check("email").trim().notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email format"),
    check("password").notEmpty().withMessage("Password is required").isLength({ min: 4 }).withMessage("Password must be at least 4 characters long"),
    
    async (req, res) => {
        const { email, password } = req.body;
        const errors = validationResult(req);
console.log(req.body);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errs: errors.array().map(err => err.msg) });
        }

        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ errs: ["Email or password not found"] });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                const payload = { id: user._id, firstName: user.firstName, email: user.email, isAdmin: user.isAdmin };
                const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: "15m" });
                const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: "7d" });
                
                res.status(200).json({ msg: "Login Successfully", accessToken, refreshToken });
            } else {
                return res.status(400).json({ errs: ["Invalid Credentials"] });
            }
        } catch (error) {
            console.log("error",error);
            
            res.status(500).json({ errs: ["Internal Server Error"] });
        }
    }
];

// 2. Signup controller
export const postSignup = [
    check("firstName").trim().notEmpty().withMessage("First name is required").isLength({ min: 4 }).withMessage("First name must be at least 4 characters long").matches(/^[a-zA-Z]+$/).withMessage("First name must be alphabets"),
    check("lastName").trim().matches(/^[a-zA-Z]+$/).withMessage("Last name must be alphabets"),
    check("email").trim().notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email format"),
    check("password").notEmpty().withMessage("Password is required").isLength({ min: 4 }).withMessage("Password must be at least 4 characters long"),
    check("confirmPassword").custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Passwords do not match");
        }
        return true;
    }),
    
    async (req, res) => {
        const { firstName, lastName, email, password, adminKey, userType } = req.body;
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errs: errors.array().map(err => err.msg) });
        }

        try {
            if (userType === "admin" && adminKey !== JWT_ADMIN_SECRET_key) {
                return res.status(401).json({ errs: ["Invalid Admin Key"] });
            }

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ errs: ["Email already exists"] });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({ 
                firstName, 
                lastName, 
                password: hashedPassword, 
                email, 
                isAdmin: userType === "admin" 
            });

            const savedUser = await newUser.save();
            res.status(201).json({ 
                msg: "User added successfully", 
                savedUser: { id: savedUser._id, firstName: savedUser.firstName, email: savedUser.email, isAdmin: savedUser.isAdmin } 
            });
        } catch (error) {
            console.error("Signup error:", error);
            res.status(500).json({ errs: ["Error creating user"] });
        }
    }
];

// 3. Forget password controller
export const postForgetPassword = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ errs: ["Email is required"] });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ errs: ["User not found"] });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email }, 
            JWT_RESET_PASSWORD_SECRET, 
            { expiresIn: '15m' }
        );

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'amnahaqamna83@gmail.com',
                pass: 'jmgk nkmv jrsc gebw' // Isay environment variable mein rakhna behtar hai
            }
        });

        // Vercel deployment ke liye localhost ko production URL se replace karein
        const resetLink = `https://your-frontend-domain.vercel.app/reset-password/${user._id}/${token}`;

        let mailOptions = {
            from: 'amnahaqamna83@gmail.com',
            to: email, // User ki email par bhejein
            subject: 'Reset Password Link',
            text: `Click the link to reset your password: ${resetLink}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ errs: ["Error while sending email"] });
            }
            res.status(200).json({ msg: "Reset Password link sent to your email" });
        });
    } catch (error) {
        res.status(500).json({ errs: ["Internal Server Error"] });
    }
};

// 4. Reset password controller
export const postResetPassword = [
    check("password").notEmpty().withMessage("Password is required").isLength({ min: 4 }).withMessage("Password must be at least 4 characters long"),
    check("confirmPassword").custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Passwords do not match");
        }
        return true;
    }),
    
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errs: errors.array().map(err => err.msg) });
        }

        const { password } = req.body;
        const { id, token } = req.params;

        try {
            jwt.verify(token, JWT_RESET_PASSWORD_SECRET);
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({ errs: ["User not found"] });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
            await user.save();

            res.status(200).json({ msg: "Password updated Successfully" });
        } catch (error) {
            return res.status(401).json({ errs: ["Invalid or expired token"] });
        }
    }
];

// 5. Refresh token controller
export const postRefreshToken = async (req, res) => {
    const { refreshtoken } = req.body;

    if (!refreshtoken) {
        return res.status(401).json({ errs: ["No refresh token provided"] });
    }

    try {
        const decoded = jwt.verify(refreshtoken, JWT_REFRESH_SECRET);
        const user = await User.findById(decoded.id);
        
        if (!user) {
            return res.status(404).json({ errs: ["User not found"] });
        }

        const accessToken = jwt.sign(
            { id: user._id, firstName: user.firstName, email: user.email, isAdmin: user.isAdmin }, 
            JWT_ACCESS_SECRET, 
            { expiresIn: "15m" }
        );
        
        res.status(200).json({ msg: "Access token extended successfully", accessToken });
    } catch (error) {
        res.status(403).json({ errs: ["Invalid refresh token"] });
    }
};