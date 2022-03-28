import mongoose from 'mongoose'

const oliveYoung = new mongoose.Schema({
   name: String,
   img: String
})

export const OliveYoung = mongoose.model("Starbucks", oliveYoung)
