// const jwt = require("jsonwebtoken");
import jwt, { decode } from "jsonwebtoken";
const JWT_ADMIN_ACCESS_SECRET = process.env.admin_access_token_secret
const JWT_ACCESS_SECRET = process.env.access_token_secret

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    console.log("auth headers ", authHeader);

    const token = authHeader && authHeader.split(" ")[1];
    console.log("token ", token);

    if (!token) { return res.status(401).json({ errs: ["No token provided"] }) }
    try {
        const decoded = jwt.verify(token, JWT_ACCESS_SECRET);
        if (!decoded) {
            return res.status(403).json({ msg: "Invalid token" });
        }
        req.user = decoded;
        console.log("decoded from verifyToken ", decoded, req.user);
    } catch (error) {
        console.log("error", error);
        return res.status(401).json({ errs: ["Invalid or expired token"] });
    }


    next()
}