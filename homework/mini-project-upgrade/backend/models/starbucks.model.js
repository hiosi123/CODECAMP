import mongoose from 'mongoose'

const starbucksToken = new mongoose.Schema({
   name: String,
   img: String
})

export const Starbucks = mongoose.model("Starbucks", starbucksToken)
