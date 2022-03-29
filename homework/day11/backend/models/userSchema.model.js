import mongoose from 'mongoose'

const userToken = new mongoose.Schema({
    name: String,
    email: String,
    personal: String,
    prefer: String,
    pwd: String,
    phone: String,
    og: Object 
   
})

export const User = mongoose.model("User", userToken)
