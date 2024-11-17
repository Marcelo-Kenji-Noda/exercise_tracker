import { Box, IconButton, ListItem, ListItemText } from '@mui/material'
import { Daily, useDaily } from '../store/daily'
import React, { useEffect } from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import RepsBox from './RepsBox'
import { useExercises } from '../store/exercises'
import { useState } from 'react'

type DailyListItemProps = {
    daily: Daily
}

type MaxReps = {
    maxReps: number | null
    date: string | null
}
function DailyListItem({daily}: DailyListItemProps) {
    const {exerciseMapping} = useExercises()
    const {deleteDaily} = useDaily();
    const [reps, setReps] = useState<number[]>(daily.reps)
    const [maxReps, setmaxReps] = useState<MaxReps | null>(null)

    const handleDeleteDaily = (_id?: string) => {
        if(_id){
            deleteDaily(_id);
        }
    }

    const fetchDailyByDate = async () => {
        const res = await fetch("/api/daily/maxreps", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({exerciseId: daily.exercise}),
        });
        const data = await res.json();
        if (!data.data.maxReps){
            setmaxReps(null)
        }else{
            setmaxReps(data.data)
        }
    }

    useEffect(() => {
        fetchDailyByDate()
    }, [fetchDailyByDate])
    return (
    <ListItem sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box display="flex" alignItems="center" flexDirection={{ xs: 'column', sm:'column', md: 'row' }}>
            <ListItemText    
            sx={{
            minWidth: { xs: '100px', sm: '150px', md:'200px' },
            textAlign: { xs: 'left', md: 'left' }, // Centraliza o texto em telas menores
            width: '100%'
            }} primary={exerciseMapping[daily.exercise]} secondary={maxReps? `Máx: ${maxReps.maxReps}`: "Sem peso anterior"}/>
            <RepsBox reps={reps} setReps={setReps} dailyId={daily._id}/>
        </Box>
        <IconButton onClick={() =>handleDeleteDaily(daily?._id)}>
            <DeleteIcon />
        </IconButton>
    </ListItem>
    )
}

export default DailyListItem