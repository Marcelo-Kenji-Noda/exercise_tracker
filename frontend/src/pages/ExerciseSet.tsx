import { Box, Grid2, Modal } from '@mui/material'
import {useEffect, useState} from 'react'

import ExerciseSetCardList from '../components/ExerciseSetCardList'
import NewExerciseSetForm from '../components/NewExerciseSetForm'
import { StyledButton } from '../styles/styledComponents'
import { useExerciseSet } from '../store/exerciseset'
import { useExercises } from '../store/exercises'

type ExerciseSet = {
  _id: string
  name: string
  exercises: string[]
}
function ExerciseSet() {
  // Criar exercise set
  const [openExerciseForm, setOpenExerciseForm] = useState<boolean>(false)
  const {exercisesets, fetchExerciseSet} = useExerciseSet();
  const {exercises, fetchExercises} = useExercises();

  useEffect(() => {
    fetchExerciseSet();
  }, [fetchExerciseSet])

  useEffect(() => {
    fetchExercises()
  },[fetchExercises])

  return (
    <Grid2 container>
      <Grid2 size={12}>
        <Box display="flex" justifyContent="center">
        <StyledButton variant='outlined' onClick={() => (setOpenExerciseForm(prev => !prev))}>Criar séries</StyledButton>
        </Box>
      <Modal
        open={openExerciseForm}
        onClose={() => setOpenExerciseForm(false)}>
      <NewExerciseSetForm exerciseSetName='' exerciseList={exercises} setisOpen={setOpenExerciseForm}/>
      </ Modal>
      <ExerciseSetCardList exercisesets={exercisesets} deleteButton={true}/>
      </Grid2>
    </Grid2>
  )
}

export default ExerciseSet