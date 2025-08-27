import mongoose from 'mongoose'

const imageSchema = new mongoose.Schema({
    url: String,
})

const image = mongoose.model('Images', imageSchema)

export default image