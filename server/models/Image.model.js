import mongoose from 'mongoose'

const imageSchema = new mongoose.Schema({
    url: String,
})

const Image = mongoose.model('Images', imageSchema)

export default Image