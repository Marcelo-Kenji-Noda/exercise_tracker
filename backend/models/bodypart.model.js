import mongoose from "mongoose";

const bodypartSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    }
})

const BodyPart = mongoose.model('BodyPart', bodypartSchema);
export default BodyPart;