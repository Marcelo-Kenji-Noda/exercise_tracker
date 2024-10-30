import Exercise from "../models/exercise.model.js";
import BodyPart from "../models/bodypart.model.js";

import mongoose from "mongoose";

export const getSingleExercise = async (req, res) => {
  const {id} = req.params;
  try {
      const exercise = await Exercise.findById(id);
      res.status(200).json({success:true, data:exercise});
  } catch (error) {
      console.log("error in fetching bodyparts:", error.message);
      res.status(500).json({success:false, message: "Server Error"})
  }
}

export const getExercises = async (req, res) => {
    try {
        const exercises = await Exercise.find({});
        res.status(200).json({success:true, data:exercises});
    } catch (error) {
        console.log("error in fetching exercises:", error.message);
        res.status(500).json({success:false, message: "Server Error"})
    }
}

export const createExercise = async (req, res) => {
    try {
      const { name, tags } = req.body;
  
      // Verificar se todos os IDs das tags existem na coleção BodyPart
      if (tags && tags.length > 0) {
        const bodyParts = await BodyPart.find({ _id: { $in: tags } });
        if (bodyParts.length !== tags.length) {
          return res.status(400).json({ error: "Alguma(s) bodypart(s) não existe(m)." });
        }
      }
  
      // Criar o exercício caso todas as tags sejam válidas
      const exercise = new Exercise({ name, tags });
      await exercise.save();
      res.status(201).json(exercise);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};

export const deleteExercise = async (req, res) =>{
    const {id} = req.params;
    try {
        await Exercise.findByIdAndDelete(id);
        res.status(200).json({success:true, message: "Body Part Deleted"})
    } catch (error) {
        res.status(404).json({success:false, message: "Body part not found"})
    }
}

export const updateExercise = async (req, res) => {
    const { id } = req.params;
    const { tags, ...exerciseData } = req.body;
  
    try {
      // Se tags forem fornecidas, verifique se todos os IDs são válidos
      if (tags && tags.length > 0) {
        const bodyParts = await BodyPart.find({ _id: { $in: tags } });
        if (bodyParts.length !== tags.length) {
          return res.status(400).json({ success: false, message: "Alguma(s) bodypart(s) não existe(m)." });
        }
      }
  
      // Atualizar o exercício se todas as tags forem válidas
      const updatedExercise = await Exercise.findByIdAndUpdate(id, { ...exerciseData, tags }, { new: true });
      res.status(200).json({ success: true, data: updatedExercise });
    } catch (error) {
      res.status(500).json({ success: false, message: "Server Error" });
    }
};