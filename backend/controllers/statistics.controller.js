import Daily from "../models/daily.model.js";
import Exercise from "../models/exercise.model.js";

export const getMaxExercise = async (req, res) => {
    const { id } = req.params;
    try {
        const dailyEntries = await Daily.find({ exercise: id }).sort({ date: 1 });

        // Extraindo as datas e os valores máximos
        const dates = dailyEntries.map((entry) => entry.date.toISOString().split('T')[0]); // Formata a data como "YYYY-MM-DD"
        const maxReps = dailyEntries.map((entry) =>
            entry.reps.length > 0 ? Math.max(...entry.reps) : 0
        );

        // Retorno no formato especificado
        res.status(200).json({ success: true, data: { dates, series: maxReps } });
    } catch (error) {
        console.error("Error in fetching daily:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const getMeanExercise = async (req, res) => {
    const { id } = req.params;
    try {
        const dailyEntries = await Daily.find({ exercise: id }).sort({ date: 1 });

        // Extraindo as datas e as médias
        const dates = dailyEntries.map((entry) => entry.date.toISOString().split('T')[0]); // Formata a data como "YYYY-MM-DD"
        const meanReps = dailyEntries.map((entry) =>
            entry.reps.length > 0
                ? entry.reps.reduce((sum, rep) => sum + rep, 0) / entry.reps.length
                : 0
        );

        // Retorno no formato especificado
        res.status(200).json({ success: true, data: { dates, series: meanReps } });
    } catch (error) {
        console.error("Error in fetching daily:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};