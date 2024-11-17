import ExerciseSetCard from './ExerciseSetCard';
import { Grid2 } from '@mui/material';
import { useExercises } from '../store/exercises';

export type ExerciseSet = {
    _id: string
    name: string
    exercises: string[]
    __v?: number
}

interface ExerciseSetCardListProps {
    exercisesets: ExerciseSet[];
    deleteButton?: boolean
  }

  
function ExerciseSetCardList({exercisesets, deleteButton = false}: ExerciseSetCardListProps) {
  const {exerciseMapping} = useExercises();

  return (
    <Grid2 container spacing={0}>
    {exercisesets.map((exerciseSet, id) => (
        <Grid2 size={12} key={id}>
        <ExerciseSetCard _id={exerciseSet._id} exercisesetName={exerciseSet.name} exercises={exerciseSet.exercises} exerciseMaping = {exerciseMapping} deleteButton = {deleteButton}/>
        </Grid2>
    ))}
    </Grid2>
  )
}

export default ExerciseSetCardList