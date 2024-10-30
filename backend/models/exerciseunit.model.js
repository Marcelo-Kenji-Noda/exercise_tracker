import mongoose from "mongoose";

const exerciseunitSchema = new mongoose.Schema({
    exercise:{
        type: mongoose.Schema.Types.ObjectId, ref: "Exercise",
        required: true
    },
    weightload:{
        type: [Number],
        default:[]
    },
    reps: {
        type: Number,
        default: 0, // Valor padrão: zero
        validate: {
          validator: function (value) {
            // Garante que reps seja igual ao tamanho de weightload
            return value === this.weightload.length;
          },
          message: "O valor de 'reps' deve ser igual ao tamanho de 'weightload'."
        }
    }
})

const ExerciseUnit = mongoose.model('ExerciseUnit', exerciseunitSchema);
export default ExerciseUnit;