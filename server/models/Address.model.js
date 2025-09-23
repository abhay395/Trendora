import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    street: {           // House number, street, or locality
        type: String,
        required: true
    },
    landmark: {         // Optional nearby landmark
        type: String
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    selected: {
        type: Boolean,
        default: false
    }
});

const Address = mongoose.model("Address", addressSchema);
export default Address;
