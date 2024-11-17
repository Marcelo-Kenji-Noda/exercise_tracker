import { Container, Autocomplete, TextField } from "@mui/material"
import { useState } from "react"
import { useExercises } from "../store/exercises"
import ExerciseStatisticDisplay from "../components/ExerciseStatisticDisplay"

function Statistics() {
    const [selectedExercise, setSelectedExercise] = useState<string>("")
    const {exercises} = useExercises();
    return (
        <Container sx={{marginTop: '10px'}}>
            <Autocomplete
                options={exercises}
                getOptionLabel={(option) => option.name}
                onChange={(event, newValue) => setSelectedExercise(newValue?._id || "")}
                renderInput={(params) => (
                    <TextField {...params} label="Select Exercise" helperText="Please select an exercise" />
                )}
                isOptionEqualToValue={(option, value) => option._id === value._id}
            />
            <ExerciseStatisticDisplay exerciseId={selectedExercise}/>
        </Container>
    )
}

export default Statistics