import { Modal, Typography } from '@mui/material';
import { StyledButton, StyledContainer } from '../styles/styledComponents';
import { useEffect, useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import ExerciseSetCardList from '../components/ExerciseSetCardList'
import NewExerciseSetForm from '../components/NewExerciseSetForm';
import { useExerciseSet } from '../store/exerciseset';
import { useExercises } from '../store/exercises';

function ExerciseSetSubPage() {
  const {exercisesets, fetchExerciseSet} = useExerciseSet();
  const {exercises} = useExercises();
  const [isExerciseSetFormOpen, setIsExerciseSetFormOpen] = useState<boolean>(false)
  useEffect(() => {
    fetchExerciseSet()
  },[fetchExerciseSet])

  return (
    <StyledContainer>
        <Typography variant='h5' marginTop={3} marginLeft={1}> Séries </Typography>
        <StyledButton variant='outlined' endIcon={<AddIcon />} sx={{marginBottom: '5px'}} onClick={() => setIsExerciseSetFormOpen(true)}> Criar série </StyledButton>
        <ExerciseSetCardList exercisesets={exercisesets}/>
        <Modal
        open={isExerciseSetFormOpen}
        onClose={() => setIsExerciseSetFormOpen(false)}>
        <NewExerciseSetForm exerciseSetName='' exerciseList={exercises} setisOpen={setIsExerciseSetFormOpen}/>
        </ Modal>
    </StyledContainer>
  )
}

export default ExerciseSetSubPage