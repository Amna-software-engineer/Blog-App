const { check, validationResult } = require("express-validator");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
let nodemailer = require('nodemailer');//for reset link email
const dotenv = require("dotenv");

dotenv.config();
const JWT_ACCESS_SECRET = process.env.access_token_secret
const JWT_REFRESH_SECRET = process.env.refresh_token_secret
const JWT_RESET_PASSWORD_SECRET = process.env.Reset_password_Secret
const JWT_ADMIN_ACCESS_SECRET = process.env.admin_access_token_secret
const JWT_ADMIN_REFRESH_SECRET = process.env.admin_refresh_token_secret
const JWT_ADMIN_SECRET_key = process.env.admin_secret_key

// Login controller
exports.postLogin = [
    // validating email
    check("email").trim().notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email format"),
    // validating password
    check("password").notEmpty().withMessage("Password is required").isLength({ min: 4 }).withMessage("Password must be at least 4 character long")

    , async (req, res) => {

        const { email, password } = req.body;
        const errors = validationResult(req);
        console.log("errors", errors);

        if (!errors.isEmpty()) {

            res.status(404).json({ errs: errors.array().map(err => err.msg) })
        } else {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ errs: ["email or password does not found"] })
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                const accessToken = jwt.sign({ id: user._id, firstName: user.firstName, email: user.email,isAdmin: user.isAdmin }, JWT_ACCESS_SECRET, { expiresIn: "5m" });
                const refreshToken = jwt.sign({ id: user._id, firstName: user.firstName, email: user.email, isAdmin: user.isAdmin}, JWT_REFRESH_SECRET, { expiresIn: "7d" });
                res.status(200).json({ msg: "Login Successfully", accessToken, refreshToken })
            } else {
                return res.status(400).json({ errs: ["Invalid Credentials"] });
            }

        }

    }]
// Signup controller
exports.postSignup = [
    // validating firstName
    check("firstName").trim().notEmpty().withMessage("First name is required").isLength({ min: 4 }).withMessage("First name must be at least 4 character long").matches(/^[a-zA-z]+$/).withMessage("First name must be alphabet"),
    // validating lastname
    check("lastName").trim().matches(/^[a-zA-z]+$/).withMessage("Last name must be alphabet"),
    // validating email
    check("email").trim().notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email format"),
    // validating password
    check("password").notEmpty().withMessage("Password is required").isLength({ min: 4 }).withMessage("Password must be at least 4 character long"),
    // validating confirmpassword
    check("confirmPassword").custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Password does not matche")
        } else {

            return true
        }
    })
    , async (req, res) => {

        const { firstName, lastName, email, password, adminKey, userType } = req.body;

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(404).json({ errs: errors.array().map(err => err.msg) })
        } else {
            try {
                // check if user is admin, and admin key matches
                if (userType === "admin" && adminKey !== JWT_ADMIN_SECRET_key) {
                    console.log("insid admin signup", adminKey, JWT_ADMIN_SECRET_key);
                    console.log(`userType === "admin" && adminKey !== JWT_ADMIN_SECRET_key`, adminKey === JWT_ADMIN_SECRET_key);
                    return res.status(401).json({ errs: ["Invalid Admin Key"] });
                }

                console.log("outside admin signup");
                const hashedPassword = await bcrypt.hash(password, 10)
                const newUser = new User({ firstName, lastName, password: hashedPassword, email, isAdmin: userType === "admin" });
                const savedUser = await newUser.save();
                console.log("user Added successfully", savedUser);
                res.status(200).json({ msg: "User added successfully", savedUser: { id: savedUser._id, firstName: savedUser.firstName, email: savedUser.email, isAdmin: savedUser.isAdmin } })

            } catch (error) {
                console.error("Signup error:", error);
                res.status(500).json({ errs: ["Error creating user"] });
            }

        }


    }]

// foreget password controller
exports.postForgetPassword = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(404).json({ errs: ["Email is required"] })
    }
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ errs: ["User not found"] })
    } else {
        const token = jwt.sign({ id: user._id, firstName: user.firstName, email: user.email,isAdmin: user.isAdmin }, JWT_RESET_PASSWORD_SECRET, { expiresIn: '15m' });

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'amnahaqamna83@gmail.com',
                pass: 'jmgk nkmv jrsc gebw'
            }
        });

        let mailOptions = {
            from: 'amnahaqamna83@gmail.com',
            to: 'amnahaqwebdev@gmail.com', subject: 'Reset Password Link',
            text: `http://localhost:5173/reset-password/${user._id}/${token}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return res.status(404).json({ errs: ["Error While sending email"] })
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200).json({ msg: "Reset Password link sent to your email" })
            }

        })
    }
}
// reset password controller
exports.postResetPassword = [
    // validating password
    check("password").notEmpty().withMessage("Password is required").isLength({ min: 4 }).withMessage("Password must be at least 4 character long"),
    // validating confirmpassword
    check("confirmPassword").custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Password does not matche")
        } else {

            return true
        }
    }), async (req, res) => {
        const { password, confirmPassword, } = req.body;
        const { id, token } = req.params && req.params;
        console.log("req.params from resetPassword", req.params);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errs: errors.array().map(err => err.msg) })
        }
        try {
            const decoded = jwt.verify(token, JWT_RESET_PASSWORD_SECRET);
            console.log("decoded ", decoded);
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({ errs: ["User not found"] });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            await user.updateOne({ password: hashedPassword }, { new: true });
            res.status(200).json({ msg: "Password updated Successfully" })

        } catch (error) {
            console.log(error);

            return res.status(401).json({ errs: ["Invalid or expired token"] });
        }


    }]
// refresh token controller
exports.postRefreshToken = async (req, res) => {
    console.log("req.body", req.body);
    const refreshtoken = req.body?.refreshtoken;
console.log("refreshToken ",refreshtoken);

    if (!refreshtoken) {
        return res.status(401).json({ errs: ["No refresh token provided"] });
    }
    const decoded = jwt.verify(refreshtoken, JWT_REFRESH_SECRET);
    if (decoded.exp > Date.now() / 1000) {
        const user = await User.findOne({ _id: decoded.id });
        if (!user) {
            res.status(404).json({ errs: ["User does not found"] })
        } else {
            const accessToken = jwt.sign({ id: user._id, firstName: user.firstName, email: user.email,isAdmin: user.isAdmin }, "Access-token-Secret", { expiresIn: "5m" });
            res.status(200).json({ msg: "Access token extented successfully ", accessToken })
        }
    }

}