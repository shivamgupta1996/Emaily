/**
 * Mongoose Model Class - Collection
 */
const mongoose = require("mongoose")
const { Schema } = mongoose

const userSchema = new Schema({
    googleId: String
})

/**
 * Creation of Model Class (Collection in DB)
 * params: Collection Name, Schema
 */
mongoose.model("users", userSchema)