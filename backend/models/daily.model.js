import mongoose from "mongoose";

const dailySchema = new mongoose.Schema({
    date:{
        type: Date,
        default: Date.now,
        required: true
    },
    exercise:{
        type: mongoose.Schema.Types.ObjectId, ref: "ExerciseUnit", default:[]
    },
    reps: [
        {
            type: Number,
            default: [0]
        }
    ]
})

const Daily = mongoose.model('Daily', dailySchema);
export default Daily;