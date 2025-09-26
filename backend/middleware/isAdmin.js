export const isAdmin = (req, res, next) => {
console.log("req from iasAdmin ",req.user);
    try {
        if (!req.user.isAdmin || !req.user ) {
            return res.status(403).json({
                errs: ["Access denied. Admin rights required."]
            });
        }
        next();
    } catch (error) {
        console.log("error ",error);
        
        res.status(500).json({ errs: ["Server error"] ,error:error});

    }
}
