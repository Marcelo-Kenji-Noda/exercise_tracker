import mongoose from "mongoose";

const exercisesetSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    exercises: [
        {type: mongoose.Schema.Types.ObjectId, ref: "Exercise"}
    ]
})

const ExerciseSet = mongoose.model('ExerciseSet', exercisesetSchema);
export default ExerciseSet;