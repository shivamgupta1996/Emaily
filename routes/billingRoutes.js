const keys = require("../config/keys")
const stripe = require("stripe")(keys.stripeSecretKey)
const requireLogin = require("../middlewares/requireLogin")

module.exports = (app) => {

    /**
     * requireLogin - a middleware which checks whether user is logged in or not.
     * Gets executed before executing logic in incoming request
     */
    app.post("/api/stripe", requireLogin, async (req, res) => {
        //Create charge after getting the token signifying the finalization of a transaction.
        const charge = await stripe.charges.create({
            shipping: {
                name: 'Jenny Rosen',
                address: {
                line1: '510 Townsend St',
                postal_code: '98140',
                city: 'San Francisco',
                state: 'CA',
                country: 'US',
                },
            },
            amount: 500,
            currency: "usd",
            description: "$5 for 5 credits",
            source: req.body.id
        })
        req.user.credits += 5
        const user = await req.user.save() //Saving updated credits to DB

        res.send(user)
    })
}