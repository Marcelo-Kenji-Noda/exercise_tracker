import mongoose from "mongoose";

const dailySchema = new mongoose.Schema({
    date:{
        type: Date,
        default: Date.now,
        required: true
    },
    exercises: [
        {type: mongoose.Schema.Types.ObjectId, ref: "ExerciseUnit", default:[]}
    ]
})

const Daily = mongoose.model('Daily', dailySchema);
export default Daily;