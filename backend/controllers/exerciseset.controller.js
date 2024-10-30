import Exercise from "../models/exercise.model.js";
import ExerciseSet from "../models/exerciseset.model.js";

import mongoose from "mongoose";

export const getSingleExerciseSet = async (req, res) => {
  const {id} = req.params;
  try {
      const exerciseset = await ExerciseSet.findById(id);
      res.status(200).json({success:true, data:exerciseset});
  } catch (error) {
      console.log("error in fetching exercise set:", error.message);
      res.status(500).json({success:false, message: "Server Error"})
  }
}

export const getExerciseSet = async (req, res) => {
    try {
        const exerciseset = await ExerciseSet.find({});
        res.status(200).json({success:true, data:exerciseset});
    } catch (error) {
        console.log("error in fetching exercises:", error.message);
        res.status(500).json({success:false, message: "Server Error"})
    }
}

export const createExerciseSet = async (req, res) => {
    try {
      const { name, exercises } = req.body;
      console.log(`Exercises: ${exercises}`)
      // Verificar se todos os IDs das tags existem na coleção BodyPart
      if (exercises && exercises.length > 0) {
        const exercisesFind = await Exercise.find({ _id: { $in: tags } });
        if (exercisesFind.length !== exercises.length) {
          return res.status(400).json({ error: "Alguma(s) exercise set não existe(m)." });
        }
      }
  
      // Criar o exercício caso todas as tags sejam válidas
      const exerciseset = new ExerciseSet({ name, exercises });
      await exerciseset.save();
      res.status(201).json(exerciseset);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};

export const deleteExerciseSet = async (req, res) =>{
    const {id} = req.params;
    try {
        await ExerciseSet.findByIdAndDelete(id);
        res.status(200).json({success:true, message: "Exercise set Deleted"})
    } catch (error) {
        res.status(404).json({success:false, message: "Exercise set not found"})
    }
}

export const updateExerciseSet = async (req, res) => {
    const { id } = req.params;
    const { exercises, ...exerciseData } = req.body;
    console.log(`Body: ${req.body}`)
    console.log(`Exercises data: ${exercises}`)
    try {
      // Se tags forem fornecidas, verifique se todos os IDs são válidos
      if (exercises && exercises.length > 0) {
        const exercisesReq = await Exercise.find({ _id: { $in: exercises } });
        if (exercisesReq.length !== exercises.length) {
          return res.status(400).json({ success: false, message: "Alguma(s) bodypart(s) não existe(m)." });
        }
      }
  
      // Atualizar o exercício se todas as tags forem válidas
      const updatedExercise = await ExerciseSet.findByIdAndUpdate(id, { ...exerciseData, exercises }, { new: true });
      console.log("Updated exercises", updatedExercise)
      res.status(200).json({ success: true, data: updatedExercise });
    } catch (error) {
      res.status(500).json({ success: false, message: "Server Error" });
    }
};