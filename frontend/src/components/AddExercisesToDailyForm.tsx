import { Autocomplete, Box, Container, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

import { Dayjs } from 'dayjs';
import { StyledButton } from '../styles/styledComponents';
import { useDaily } from '../store/daily';
import { useExercises } from '../store/exercises';

type AddExercisesToDailyFormProps = {
    currentDate: Dayjs | null;
    setisOpen?: (isOpen: boolean) => void;
    addedExercises?: string[];
};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    height: '70%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function AddExercisesToDailyForm({ currentDate, addedExercises = [] }: AddExercisesToDailyFormProps) {
    const { exercises } = useExercises();
    const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
    const { createDailyExercise } = useDaily();

    const handleSaveSeries = () => {
        if (currentDate && selectedExercise) {
            createDailyExercise(currentDate.format("YYYY-MM-DD"), selectedExercise);
        }
        setSelectedExercise(null);
        console.log({ date: currentDate?.format("YYYY-MM-DD"), selectedExercise });
    };

    return (
        <Container sx={style}>
            <Box display='flex' flexDirection={'column'} alignItems={"center"} gap={3}>
                <Typography variant='h5' marginTop={2}> Adicionar Exercício</Typography>
                <Box sx={{ width: '100%' }}>
                    <Autocomplete
                        options={exercises.filter((val) => !addedExercises.includes(val._id))}
                        getOptionLabel={(option) => option.name}
                        onChange={(event, newValue) => setSelectedExercise(newValue?._id || "")}
                        renderInput={(params) => (
                            <TextField {...params} label="Select Exercise" helperText="Please select an exercise" />
                        )}
                        isOptionEqualToValue={(option, value) => option._id === value._id}
                    />
                </Box>
                <StyledButton variant='outlined' onClick={handleSaveSeries}>Salvar</StyledButton>
            </Box>
        </Container>
    );
}

export default AddExercisesToDailyForm;
