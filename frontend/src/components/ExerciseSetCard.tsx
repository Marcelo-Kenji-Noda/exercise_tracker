import { Box, Collapse, ListItemButton, ListItemIcon, ListItemText, Modal } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { IconButton, List, ListItem } from '@mui/material'

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Exercise } from './NewExerciseSetForm';
import NewExerciseSetForm from './NewExerciseSetForm';
import { useExerciseSet } from '../store/exerciseset';
import { useExercises } from '../store/exercises';
import { useState } from 'react';

type ExerciseCardProps = {
  _id: string
  exercisesetName: string
  exercises: string[]
  exerciseMaping: Record<string, string>
  deleteButton?: boolean
}
function ExerciseSetCard({ _id, exercisesetName, exercises, exerciseMaping, deleteButton=false}: ExerciseCardProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false); /* Check if is open */
  const [openExerciseForm, setOpenExerciseForm] = useState<boolean>(false);
  const [availableExercises, setAvailableExercises] = useState<Exercise[]>([]);
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([])
  const allExercises = useExercises((state) => state.exercises);

  const handleAddNewExercise = () => {
    setOpenExerciseForm(true);
    setAvailableExercises(allExercises.filter(value => !exercises.includes(value._id)))
    setSelectedExercises(allExercises.filter(value => exercises.includes(value._id)))
  }
  const { deleteExerciseSet } = useExerciseSet()
  return (
    <Box>
      <List>
        <ListItem secondaryAction={ deleteButton ?
          <IconButton edge="end" aria-label="delete" onClick={() => deleteExerciseSet(_id)}>
            <DeleteIcon />
          </IconButton>: null
        }>
          <ListItemButton onClick={() => setIsOpen((curr) => !curr)} >
            <ListItemText primary={exercisesetName} />
            {isOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          </ListItem>
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <List>
              {exercises.map((val, id) => (
                <ListItem key={id + val}>
                   <ListItemText sx={{paddingLeft: '2rem'}} inset primary={exerciseMaping[val]} />
                </ListItem>
              ))}
            </List>
            <ListItemButton>
            <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Adicionar exercício" onClick={handleAddNewExercise}/>
            </ListItemButton>
          </Collapse>
      </List>
      <Modal
        open={openExerciseForm}
        onClose={() => setOpenExerciseForm(false)}>
      <NewExerciseSetForm _id = {_id} exerciseSetName={exercisesetName} exerciseList = {availableExercises}  selectedExerciseList={selectedExercises} setisOpen={setOpenExerciseForm}/>
      </ Modal>
    </Box>
  )
}

export default ExerciseSetCard