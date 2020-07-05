//next - callback executed when middleware finishes running
module.exports = (req, res, next) => {
    if (!req.user) {
        return res.status(401).send({ error: "You must log in" })
    }
    
    //If user exists, code executes further
    next();
}