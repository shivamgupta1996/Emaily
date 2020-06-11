const express = require("express")
const mongoose = require("mongoose")
const cookieSession = require("cookie-session")
const passport = require("passport")
const keys = require("./config/keys")

//Loading Configurations
require("./models/User")
require("./services/passport")

mongoose.connect(keys.mongoURI)
const app = express()

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

const PORT = process.env.PORT || 5000
app.listen(PORT)