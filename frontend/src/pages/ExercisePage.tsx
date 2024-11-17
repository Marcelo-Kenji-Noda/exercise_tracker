import { Box, Grid2, Modal } from '@mui/material';
import {useEffect, useState} from 'react'

import ExerciseForm from '../components/ExerciseForm';
import ExerciseTable from '../components/ExerciseTable'
import { StyledButton } from '../styles/styledComponents';
import { useExercises } from '../store/exercises';

export default function ExercisePage() {
    const [openExerciseForm, setOpenExerciseForm] = useState<boolean>(false);
    const { fetchExercises } = useExercises();

    useEffect(() => {
        fetchExercises();
    }, [fetchExercises])
    return (
    <Grid2 container>
        <Grid2 size={1}></Grid2>
        <Grid2 size={10}>
            <Box alignContent="center" justifyContent={"center"} display={"flex"}>
                <StyledButton variant={"outlined"} onClick={() => {setOpenExerciseForm(prev => !prev)}}>
                    Criar exercício
                </StyledButton>
            </Box>
            <Modal
            open={openExerciseForm}
            onClose={() => setOpenExerciseForm(false)}>
                <ExerciseForm setisOpen={setOpenExerciseForm}/>
            </Modal>

            <ExerciseTable/>
        </Grid2>
        <Grid2 size={1}></Grid2>
    </Grid2>
    )
}
