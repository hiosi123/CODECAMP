import mongoose from 'mongoose'

const phoneToken = new mongoose.Schema({
    token: String,
    phone: String,
    isAuth: Boolean
})

export const Phone = mongoose.model("Phone", phoneToken)
