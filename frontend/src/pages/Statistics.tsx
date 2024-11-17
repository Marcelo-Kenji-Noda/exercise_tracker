import { Autocomplete, Container, TextField } from "@mui/material"

import ExerciseStatisticDisplay from "../components/ExerciseStatisticDisplay"
import { useExercises } from "../store/exercises"
import { useState } from "react"

function Statistics() {
    const [selectedExercise, setSelectedExercise] = useState<string>("")
    const {exercises} = useExercises();
    return (
        <Container sx={{marginTop: '10px'}}>
            <Autocomplete
                options={exercises}
                getOptionLabel={(option) => option.name}
                onChange={(_event, newValue) => setSelectedExercise(newValue?._id || "")}
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