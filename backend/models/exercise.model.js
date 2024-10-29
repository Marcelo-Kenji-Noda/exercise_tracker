import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    tags: [
        {type: mongoose.Schema.Types.ObjectId, ref: "BodyPart"}
    ]
})

const Exercise = mongoose.model('Exercise', exerciseSchema);
export default Exercise;