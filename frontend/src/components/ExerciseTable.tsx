import { Box, Paper } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import DeleteIcon from '@mui/icons-material/Delete';
import { StyledButton } from '../styles/styledComponents';
import { useExercises } from '../store/exercises';
import {useState} from 'react'

const columns: GridColDef[] = [
    // { field: '_id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Nome', width: 130 },
];

const paginationModel = { page: 0, pageSize: 10};

function ExerciseTable() {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const {exercises, deleteMultipleExercises} = useExercises();

    const handleSelectionChange = (selectionModel: string[]) => {
      setSelectedIds(selectionModel);
    };

    return (
        <Paper sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={exercises}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10, 20]}
          getRowId={(row) => row._id}
          checkboxSelection
          sx={{ border: 0 }}
          onRowSelectionModelChange={(newSelection) => handleSelectionChange(newSelection as string[])}
        />
        {selectedIds.length == 0 ? <div></div>:
        <Box>
            <StyledButton variant='outlined' sx={{marginTop: '10px'}} onClick={() => deleteMultipleExercises(selectedIds)} endIcon={<DeleteIcon/>}>
                Deletar 
            </StyledButton>
        </Box>
        }
      </Paper>
    )
}


export default ExerciseTable