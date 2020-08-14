const express = require("express")
const mongoose = require("mongoose")
const cookieSession = require("cookie-session")
const passport = require("passport")
const keys = require("./config/keys")
const bodyParser = require("body-parser")

//Loading Configurations
require("./models/User")
require("./models/Survey")
require("./services/passport")

mongoose.connect(keys.mongoURI)
const app = express()

//Parses every request and set into 'req.body' for data security purpose
app.use(bodyParser.json())

//Cookie configuration
//Middlewares
//cookie session middleware will extract cookie data from user req and stores it in 'req.session' variable after that route handlers are executed.
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, //validity of cookies - 30 days in miliseconds
        keys: [keys.cookieKey] //For encryption
    })
)
app.use(passport.initialize())
app.use(passport.session())

require("./routes/authRoutes")(app)
require("./routes/billingRoutes")(app)

if (process.env.NODE_ENV === "production") {
    /**
     * Express will serve up production assets 
     * like our main.js file or main.css file.
     */
    app.use(express.static("client/build"))

    //Express wil serve up index.html file if it doesn't recognize the route
    const path = require("path")
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
}

const PORT = process.env.PORT || 5000
app.listen(PORT)