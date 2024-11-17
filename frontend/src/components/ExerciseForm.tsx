import { Box, TextField, Typography } from '@mui/material';

import { StyledButton } from '../styles/styledComponents';
import { useExercises } from '../store/exercises';
import {useState} from 'react'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  height: '30%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  display: 'flex',
  flexDirection: 'column',
  justifyContent:'center',
  alignItems:'center',
  p: 4,
};

type ExerciseFormProps = {
  setisOpen: (value: boolean) => void
}

function ExerciseForm({setisOpen}: ExerciseFormProps) {
  const [newExercise, setnewExercise] = useState<string>("")
  const {createExercises} = useExercises();

  const handleCreateNewExercise = () => {
    const response = createExercises(newExercise);
    setnewExercise("");
    setisOpen(false);
    console.log(response);
  }

  return (
    <Box sx={style}>
      <form onSubmit={() => handleCreateNewExercise()}>
        <Box display={'flex'} flexDirection={'column'} alignContent={'center'} justifyContent={'center'} gap={2} alignItems={'center'}>
        <Typography variant="h4"> Criar exercício </Typography>
          <TextField
            label={"Exercício"}
            variant="outlined"
            onChange={(e) => setnewExercise(e.target.value)}
            value={newExercise}
            fullWidth
          />
          <StyledButton
            onClick={() => handleCreateNewExercise()}
            variant="outlined"
            type='submit'
            fullWidth
          >
            Salvar
          </StyledButton>
      </Box>
      </form>
    </Box>
  )
}

export default ExerciseForm