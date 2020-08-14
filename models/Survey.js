/**
 * Mongoose Model Class - Collection
 */
const mongoose = require("mongoose")
const { Schema } = mongoose
const RecipientSchema = require("./Recipient")

const surveySchema = new Schema({
    title: String,
    body: String,
    subject: String,
    recipients: [RecipientSchema],
    yes: { type: Number,  default: 0 },
    no:  { type: Number,  default: 0 }
})

/**
 * Creation of Model Class (Collection in DB)
 * params: Collection Name, Schema
 */
mongoose.model("surveys", surveySchema)