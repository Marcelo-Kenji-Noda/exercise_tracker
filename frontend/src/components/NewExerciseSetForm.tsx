import { Box, Grid2, IconButton, List, ListItem, ListItemText, Paper, TextField, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';

import DeleteIcon from '@mui/icons-material/Delete';
import { StyledButton } from '../styles/styledComponents';
import { useExerciseSet } from '../store/exerciseset';
import {useState} from 'react'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    height:{sx: '90%', sm:'90%', md:'75%'},
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    padding: '3rem'
};

type NewExerciseSetFormProp = {
    _id?: string
    exerciseSetName?:string
    exerciseList?: Exercise[]
    setisOpen?: (value: boolean) => void
    selectedExerciseList?: Exercise[]
}

type ExerciseSetBodyRequest = {
    name: string
    exercises: string[]
}

export type Exercise = {
    _id: string
    name: string
}
const columns: GridColDef[] = [
    { field: '_id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Nome', width: 200 },
];

const paginationModel = { page: 0, pageSize: 10 };

function NewExerciseSetForm({_id = "", exerciseSetName="", exerciseList = [], selectedExerciseList = [],setisOpen}:NewExerciseSetFormProp) {
    const [selectedIds, setSelectedIds] = useState<string[]>([])
    const [currentSelectedExercises, setCurrentSelectedExercises] = useState<Exercise[]>(selectedExerciseList)
    const [availableExercises, setAvailableExercises] = useState<Exercise[]>(exerciseList)
    const [currentSetExerciseName, setCurrentSetExerciseName] = useState<string>(exerciseSetName)
    const [filterAvailableExercise, setFilterAvailableExercise] = useState<string>("");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [exerciseSetId, _setExerciseSetId] = useState<string>(_id)
    const {createExerciseSet, updateExerciseSet} = useExerciseSet();
    /* Teste */
    /*  */
    /* s */
    const filteredExercises = availableExercises.filter((exercise) =>
        exercise.name.toLowerCase().includes(filterAvailableExercise.toLowerCase())
    );
    const handleSelectionChange = (selectionModel: GridRowSelectionModel) => {
        setSelectedIds(selectionModel as string[]);
    };
    const handleAddSelectedExercises = () => {
        const selectedExercises = availableExercises.filter((exercise) =>
          selectedIds.includes(exercise._id)
        );
    
        setCurrentSelectedExercises((prev) => [...prev, ...selectedExercises]);
    
        // Remove os exercícios selecionados de availableExercises
        setAvailableExercises((exercises) =>
          exercises.filter((exercise) => !selectedIds.includes(exercise._id))
        );
    
        // Limpa a seleção atual
        setSelectedIds([]);
    };

    const handleRemoveItemFromList = (_id: string) => {
        // Encontra o exercício a ser removido
        const exerciseToRemove = currentSelectedExercises.find((exercise) => exercise._id === _id);
    
        if (exerciseToRemove) {
          // Remove o exercício de currentSelectedExercises
          setCurrentSelectedExercises((prevExercises) =>
            prevExercises.filter((exercise) => exercise._id !== _id)
          );
    
          // Adiciona o exercício de volta à lista de availableExercises
          setAvailableExercises((prevExercises) => [...prevExercises, exerciseToRemove]);
        }
    };

    const handleCreateOrUpdateExerciseSet = () => {
        const exerciseIdsList: string[] = currentSelectedExercises.map(item => item._id);
        const requestBody: ExerciseSetBodyRequest = {
            "name": currentSetExerciseName,
            "exercises":exerciseIdsList
        }

        if(exerciseSetId.length > 0){
            // createExerciseSet(requestBody.name, requestBody.exercises);
            updateExerciseSet(exerciseSetId, requestBody)
        }else{
            createExerciseSet(requestBody.name, requestBody.exercises);
        }

        if(setisOpen){
            setisOpen(false);
        }
    }
    return (
    <Paper sx={style}>
        <Typography variant='h3' paddingBottom={2}> Criar série </Typography>
        <Grid2 container spacing={2}>
            <Grid2 size={{xs: 12, sm: 12, md: 8, lg: 8, xl:8}}>
                <TextField
                label={"Exercício set"}
                variant="outlined"
                onChange={(e) => setCurrentSetExerciseName(e.target.value)}
                value={currentSetExerciseName}
                fullWidth
                sx={{padding:'0.2rem 0.2rem 1rem 0.2rem'}}
                />
                <TextField
                label="Filtro"
                variant="outlined"
                value={filterAvailableExercise}
                onChange={(e) => setFilterAvailableExercise(e.target.value)}
                fullWidth
                sx={{padding:'0.2rem 0.2rem'}}
                size='small'
                />
                <DataGrid 
                    rows={filteredExercises}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[10]}
                    getRowId={(row) => row._id}
                    checkboxSelection
                    sx={{ border: 0, maxHeight: 300, overflowY: 'auto' }}
                    onRowSelectionModelChange={(newSelection) => handleSelectionChange(newSelection as string[])}
                />

            </Grid2>
            <Grid2 size={{xs: 12, sm:12, md: 4, lg: 4, xl:4}}>
                <Typography variant='h5'> Exercícios </Typography>
                {currentSelectedExercises?
                <List sx={{maxHeight:{xs:'200px', md:'500px'} , overflow:'auto'}}>
                    {currentSelectedExercises.map((values) => (
                        <ListItem secondaryAction={
                            <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveItemFromList(values._id)}>
                              <DeleteIcon />
                            </IconButton>
                          }>
                           <ListItemText primary={values.name}/> 
                        </ListItem>
                    ))}
                </List>:<></>
                }
            </Grid2>
        </Grid2>
        <Box display={'flex'} gap={1}>
            <StyledButton variant='outlined' onClick={handleAddSelectedExercises}> Adicionar exercícios </StyledButton>
            <StyledButton variant='outlined' onClick={handleCreateOrUpdateExerciseSet}> {_id === ""? "Criar série": "Salvar série"}</StyledButton>
        </Box>
    </Paper>
    )
}

export default NewExerciseSetForm