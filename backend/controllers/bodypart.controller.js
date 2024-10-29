import BodyPart from "../models/bodypart.model.js";
import mongoose from "mongoose";

export const getBodyParts = async (req, res) => {
    try {
        const bodyparts = await BodyPart.find({});
        res.status(200).json({success:true, data:bodyparts});
    } catch (error) {
        console.log("error in fetching bodyparts:", error.message);
        res.status(500).json({success:false, message: "Server Error"})
    }
}

export const createBodyParts = async (req, res) => {
    const bodypart = req.body;

    if (!bodypart.name){
        return res.status(400).json({success: false, message: "Please provide a name"});
    }

    const newBodyPart = new BodyPart(bodypart)

    try{
        await newBodyPart.save();
        res.status(201).json({success:true, data:newBodyPart})
    }catch(error){
        console.error("Error in Create Body Part", error.message);
        res.status(500).json({success:false, message:"Server Error"})
    }
}

export const deleteBodyParts = async (req, res) =>{
    const {id} = req.params;
    try {
        await BodyPart.findByIdAndDelete(id);
        res.status(200).json({success:true, message: "Body Part Deleted"})
    } catch (error) {
        res.status(404).json({success:false, message: "Body part not found"})
    }
}

export const updateBodyParts = async (req, res) => {
    const {id} = req.params;
    const bodypart = req.body;
    try {
        const updatedBodyPart = await BodyPart.findByIdAndUpdate(id, bodypart, {new:true});
        res.status(200).json({success:true, date:updatedBodyPart});
    } catch (error) {
        res.status(500).json({success:false, message:"Server Error"})
    }
}