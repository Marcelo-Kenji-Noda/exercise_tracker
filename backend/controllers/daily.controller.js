import Daily from "../models/daily.model.js";
import Exercise from "../models/exercise.model.js";
import ExerciseSet from '../models/exerciseset.model.js';
import mongoose from "mongoose";

export const getSingleDaily = async (req, res) => {
  const {id} = req.params;
  try {
      const daily = await Daily.findById(id);
      res.status(200).json({success:true, data:daily});
  } catch (error) {
      console.error("error in fetching daily:", error.message);
      res.status(500).json({success:false, message: "Server Error"})
  }
}

export const getDaily = async (req, res) => {
    try {
        const daily = await Daily.find({});
        res.status(200).json({success:true, data:daily});
    } catch (error) {
        console.error("error in fetching daily:", error.message);
        res.status(500).json({success:false, message: "Server Error"})
    }
}

export const createDaily = async (req, res) => {
    try {
      const { date, exercise, reps } = req.body;
      // Criar o exercício caso todas as tags sejam válidas
      const daily = new Daily({ date, exercise, reps });
      await daily.save();
      res.status(201).json({success:true, data:daily});
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};

export const deleteDaily = async (req, res) =>{
    const {id} = req.params;
    try {
        await Daily.findByIdAndDelete(id);
        res.status(200).json({success:true, message: "Daily Deleted"})
    } catch (error) {
        res.status(404).json({success:false, message: "Daily not found"})
    }
}

export const updateDaily = async (req, res) => {
  const { id } = req.params;
  const { exercise, ...exerciseData } = req.body;

  try {
    // Verifica se o exercício fornecido é válido
    if (exercise) {
      const exerciseUnitExists = await Exercise.findById(exercise);

      if (!exerciseUnitExists) {
        return res.status(400).json({ success: false, message: "O exercício não existe." });
      }
    }

    // Atualiza o exercício no registro Daily
    const updatedDaily = await Daily.findByIdAndUpdate(
      id,
      { ...exerciseData, exercise },
      { new: true }
    );

    res.status(200).json({ success: true, data: updatedDaily });
  } catch (error) {
    res.status(500).json({ success: false, message: "Erro no servidor." });
  }
};

export const getDailiesByDate = async (req, res) => {
  const { date } = req.body;

  try {
      // Parse da data para garantir que está no formato certo
      const parsedDate = new Date(date);
      
      // Busca todos os documentos Daily com a data especificada
      const dailies = await Daily.find({
          date: {
              $gte: new Date(parsedDate.setHours(0, 0, 0, 0)),
              $lt: new Date(parsedDate.setHours(23, 59, 59, 999))
          }
      });

      res.status(200).json({ success: true, data: dailies });
  } catch (error) {
      console.error("Erro ao buscar por data:", error);
      res.status(500).json({ success: false, message: "Erro interno do servidor" });
  }
};

export const createDailyFromExerciseSet = async (req, res) => {
  // Body format
  /*
  {date: "2024-11-10", exerciseset: "1"} 
  */
  const { date, exerciseset } = req.body;
  try {
    // Exercícios a serem adicionados
    const parsedDate = new Date(date);
    const exerciseSetTarget = await ExerciseSet.findById(exerciseset)

    // Exercícios que já estão adicionados naquele dia
    const dailies = await Daily.find({
        date: {
            $gte: new Date(parsedDate.setHours(0, 0, 0, 0)),
            $lt: new Date(parsedDate.setHours(23, 59, 59, 999))
        }
    });
    const exercisesAlreadyAdded = dailies.map((daily) => daily.exercise._id.toString()); // Convertendo para string
    if (!exerciseSetTarget) {
      return res.status(404).json({ success: false, message: "ExerciseSet não encontrado." });
    }
    const targetExercises = exerciseSetTarget.exercises
    const dailyArray = targetExercises.map((exerciseId) => ({
      date,
      exercise: exerciseId
    }));

    const mappedDailyArray = dailyArray.filter((daily) => !exercisesAlreadyAdded.includes(daily.exercise.toString()));
    // Inserir todos os documentos de uma vez
    const insertedDailies = await Daily.insertMany(mappedDailyArray);
    
    res.status(200).json({ success: true, data: insertedDailies });
  } catch (error) {
    res.status(500).json({ success: false, message: "Erro interno do servidor" });
  }
}

export const addValueToDailyRep = async (req, res) => {
  /*{ value: 10 }*/
  try {
    const { id } = req.params;
    const { value } = req.body;

    // Obtém o documento com o ID especificado
    const daily = await Daily.findById(id);

    // Verifica se o documento foi encontrado
    if (!daily) {
      return res.status(404).json({ success: false, message: "Registro não encontrado." });
    }

    // Cria uma nova cópia do array `reps` e adiciona o novo valor
    const newReps = [...daily.reps, value];

    // Atualiza o documento no banco de dados
    const updatedExercise = await Daily.findByIdAndUpdate(
      id,
      { reps: newReps },
      { new: true } // Retorna o documento atualizado
    );

    res.status(200).json({ success: true, data: updatedExercise });
  } catch (error) {
    res.status(500).json({ success: false, message: "Erro interno do servidor" });
  }
};

export const maxRepsExercise = async (req, res) => {
  const {exerciseId} = req.body;

  if (!exerciseId){
    return res.status(400).json({error: "Exercise ID is requried"})
  }

  try {
    const daily = await Daily.findOne({exercise: exerciseId})
      .sort({date: -1})
      .select('reps date')
    
      if (!daily){
        return res.status(200).json({ success: true, data:{maxReps: null, date: null}});
      }

      const maxReps = Math.max(...daily.reps);
      res.status(200).json({ success: true, data: {maxReps: maxReps, date: daily.date}});
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error." });
  }
}