import ExerciseUnit from "../models/exerciseunit.model.js";
import mongoose from "mongoose";


export const getSinglegetExerciseUnit= async (req, res) => {
    const {id} = req.params;
    try {
        const exerciseUnit = await ExerciseUnit.findById(id);
        res.status(200).json({success:true, data:exerciseUnit});
    } catch (error) {
        console.log("error in fetching exercise unit:", error.message);
        res.status(500).json({success:false, message: "Server Error"})
    }
  }

export const getExerciseUnit = async (req, res) => {
    try {
        const exerciseUnit = await ExerciseUnit.find({});
        res.status(200).json({success:true, data:exerciseUnit});
    } catch (error) {
        console.log("error in fetching bodyparts:", error.message);
        res.status(500).json({success:false, message: "Server Error"})
    }
}

export const createExerciseUnit = async (req, res) => {
    const exerciseUnit = req.body;

    if (!exerciseUnit.exercise){
        return res.status(400).json({success: false, message: "Please provide a valid exercise"});
    }
    if (exerciseUnit.weightload){
        exerciseUnit.reps = exerciseUnit.weightload.length
    }
    const newExerciseUnit = new ExerciseUnit(exerciseUnit)

    try{
        await newExerciseUnit.save();
        res.status(201).json({success:true, data:newExerciseUnit})
    }catch(error){
        console.error("Error in Create Body Part", error.message);
        res.status(500).json({success:false, message:"Server Error"})
    }
}

export const deleteExerciseUnit = async (req, res) =>{
    const {id} = req.params;
    try {
        await ExerciseUnit.findByIdAndDelete(id);
        res.status(200).json({success:true, message: "Exercise unit Deleted"})
    } catch (error) {
        res.status(404).json({success:false, message: "Exercise unit not found"})
    }
}

export const updateExerciseUnit = async (req, res) => {
    const {id} = req.params;
    const exerciseUnit = req.body;
    
    try {
        exerciseUnit["reps"] = exerciseUnit.weightload.length
        const updatedexerciseUnit = await ExerciseUnit.findByIdAndUpdate(id, exerciseUnit, {new:true});
        res.status(200).json({success:true, data:updatedexerciseUnit});
    } catch (error) {
        res.status(500).json({success:false, message:"Server Error"})
    }
}