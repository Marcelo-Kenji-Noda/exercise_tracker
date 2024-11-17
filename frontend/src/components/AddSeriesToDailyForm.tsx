import { Autocomplete, Box, Container, TextField, Typography } from '@mui/material';

import { Dayjs } from 'dayjs';
import { StyledButton } from '../styles/styledComponents';
import { useDaily } from '../store/daily';
import { useExerciseSet } from '../store/exerciseset';
import { useState } from 'react';

type AddSeriesToDailyFormProps = {
    currentDate?: Dayjs | null;
    setisOpen?: (isOpen: boolean) => void;
};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '70%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function AddSeriesToDailyForm({ currentDate }: AddSeriesToDailyFormProps) {
    const { exercisesets } = useExerciseSet();
    const [selectedSeries, setSelectedSeries] = useState<string | null>(null);
    const { createDailyFromExerciseSet } = useDaily();

    const handleSaveSeries = () => {
        if (currentDate && selectedSeries) {
            createDailyFromExerciseSet(currentDate.format("YYYY-MM-DD"), selectedSeries);
        }
        setSelectedSeries("");
    };

    return (
        <Container sx={style}>
            <Box display='flex' flexDirection={'column'} alignItems={"center"} gap={3}>
            <Typography variant='h5' marginTop={2}> Adicionar Série</Typography>
            <Box sx={{width: '100%'}}>
            <Autocomplete
                options={exercisesets}
                getOptionLabel={(option) => option.name}
                onChange={(_event, newValue) => setSelectedSeries(newValue?._id || "")}
                value={exercisesets.find((set) => set._id === selectedSeries) || null}
                renderInput={(params) => (
                    <TextField {...params} label="Select Exercise Set" helperText="Please select the exercise set" />
                )}
                isOptionEqualToValue={(option, value) => option._id === value._id}
                sx={{width:'100%'}}
            />
            </Box>
            <StyledButton variant='outlined' onClick={handleSaveSeries}>Adicionar</StyledButton>
            </Box>
        </Container>
    );
}

export default AddSeriesToDailyForm;
