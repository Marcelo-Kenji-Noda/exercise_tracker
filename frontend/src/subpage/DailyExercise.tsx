import { Box, Grid2, Modal, Typography } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AddExercisesToDailyForm from '../components/AddExercisesToDailyForm';
import AddSeriesToDailyForm from '../components/AddSeriesToDailyForm';
import DailyList from '../components/DailyList';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StyledButton } from '../styles/styledComponents';
import {StyledContainer} from '../styles/styledComponents';
import { useDaily } from '../store/daily';

const monthMapping: Record<number, string> = {
    0: "Janeiro",
    1: "Fevereiro",
    2: "Março",
    3: "Abril",
    4: "Maio",
    5: "Junho",
    6: "Julho",
    7: "Agosto",
    8: "Setembro",
    9: "Outubro",
    10: "Novembro",
    11: "Dezembro"
}

const dayOfWeekMapping = [
    "Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira",
    "Quinta-feira", "Sexta-feira", "Sábado"
];
function DailyExercise() {
    const [currentDate, setCurrentDate] = useState<Dayjs | null>(dayjs());
    const [openSeriesForm, setOpenSeriesForm] = useState<boolean>(false);
    const [openExerciseForm, setOpenExerciseForm] = useState<boolean>(false);
    const [currentAddedExercises, setCurrentAddedExercises] = useState<string[]>([])
    const { daily, fetchDailyByDate } = useDaily();
    const monthName = currentDate? monthMapping[currentDate.month()] : "Janeiro";
    const dayOfWeek = currentDate?dayOfWeekMapping[currentDate.day()] : "Segunda-feira";
    
    useEffect(()=>{
        if (currentDate){
            fetchDailyByDate(currentDate.format("YYYY-MM-DD"))

        }
    },[currentDate, fetchDailyByDate])

    useEffect(() => {
        setCurrentAddedExercises(
            daily.map((value) => value.exercise)
        )
    }, [daily])
    
    return (
    <StyledContainer>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box marginTop={4} display={'flex'} alignContent={'center'} justifyContent={'center'} flexDirection={'column'} gap={3}>
                <Box display={'flex'} alignContent={'center'} justifyContent={'center'} alignItems={'center'}>
                    <Typography> {currentDate?.date()} de {monthName} de {currentDate?.year()}, {dayOfWeek} </Typography>
                </Box>
                <DatePicker format={"DD/MM/YYYY"} value={currentDate} onChange={(date) => setCurrentDate(date)}/>
            </Box>
        </LocalizationProvider>
        <DailyList dailyList={daily}/>
        <Grid2 gap={1}>
            <Grid2 size={{xs:12, sm: 12, md: 6, lg: 6, xl: 6}}>
                <StyledButton variant='outlined' onClick={() => setOpenSeriesForm(true)}> Selecionar série </StyledButton>
            </Grid2>
            <Grid2 size={{xs:12, sm: 12, md: 6, lg: 6, xl: 6}}>
                <StyledButton variant='outlined' onClick={() => setOpenExerciseForm(true)}> Adicionar exercício </StyledButton>
            </Grid2>
        </Grid2>
        <Modal
        open={openSeriesForm}
        onClose={() => setOpenSeriesForm(false)}>
            <AddSeriesToDailyForm currentDate={currentDate} setisOpen={setOpenSeriesForm}/>
        </Modal>

        <Modal
        open={openExerciseForm}
        onClose={() => setOpenExerciseForm(false)}>
            <AddExercisesToDailyForm currentDate={currentDate} setisOpen={setOpenExerciseForm} addedExercises={currentAddedExercises}/>
        </Modal>
    </StyledContainer>
    )
}

export default DailyExercise