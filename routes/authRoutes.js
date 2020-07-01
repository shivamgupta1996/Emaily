const passport = require("passport")

module.exports = (app) => {
    //When user hits this route, it goes through passport auth flow.
    app.get(
        "/auth/google",
        passport.authenticate("google", {
            scope: ["profile", "email"] //Tells google what we want from user's profile
        })
    )
    app.get("/auth/google/callback", passport.authenticate("google"))

    app.get("/api/logout", (req, res) => {
        req.logout()
        res.send(req.user)
    })
    
    app.get("/api/current_user", (req, res) => {
        res.send(req.user)
    })
}
