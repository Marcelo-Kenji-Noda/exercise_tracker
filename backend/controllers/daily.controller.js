import Daily from "../models/daily.model.js";
import ExerciseUnit from "../models/exerciseunit.model.js";

import mongoose from "mongoose";

export const getSingleDaily = async (req, res) => {
  const {id} = req.params;
  try {
      const daily = await Daily.findById(id);
      res.status(200).json({success:true, data:daily});
  } catch (error) {
      console.log("error in fetching daily:", error.message);
      res.status(500).json({success:false, message: "Server Error"})
  }
}

export const getDaily = async (req, res) => {
    try {
        const daily = await Daily.find({});
        res.status(200).json({success:true, data:daily});
    } catch (error) {
        console.log("error in fetching daily:", error.message);
        res.status(500).json({success:false, message: "Server Error"})
    }
}

export const createDaily = async (req, res) => {
    try {
      const { date, exercises } = req.body;
      // Criar o exercício caso todas as tags sejam válidas
      const daily = new Daily({ date, exercises });
      await daily.save();
      res.status(201).json(daily);
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
    const { exercises, ...exerciseData } = req.body;
    // console.log(`Exercises: ${exercises}`)
    try {
      // Se tags forem fornecidas, verifique se todos os IDs são válidos
      if (exercises && exercises.length > 0) {
        const exercisesUnitNew = await ExerciseUnit.find({ _id: { $in: exercises } });

        console.log(`Exercises: ${exercisesUnitNew}`)
        if (exercisesUnitNew.length !== exercises.length) {
          return res.status(400).json({ success: false, message: "Alguma(s) Exercises não existe(m)." });
        }
      }
  
      // Atualizar o exercício se todas as tags forem válidas
      const updatedExercise = await Daily.findByIdAndUpdate(id, { ...exerciseData, exercises }, { new: true });
      res.status(200).json({ success: true, data: updatedExercise });
    } catch (error) {
      res.status(500).json({ success: false, message: "Server Error" });
    }
};