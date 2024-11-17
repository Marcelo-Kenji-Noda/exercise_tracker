import { Box, IconButton } from '@mui/material';
import React, { useState } from 'react'

import AddCircleIcon from '@mui/icons-material/AddCircle';
import { StyledRepsTextField } from '../styles/styledComponents';
import { useDaily } from '../store/daily';

type RepsBoxProps = {
    reps: number[];
    setReps: (reps: number[]) => void;
    dailyId?: string;
}

function RepsBox({reps, setReps, dailyId}: RepsBoxProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [newValue, setNewValue] = useState<string>(""); // Alterado para string vazia

    const {addRepToDaily, updateDailyReps} = useDaily();
    
    const handleBlur = () => {
        setIsEditing(false);
        if (dailyId && newValue && Number(newValue) > 0) { // Verifica se o novo valor é válido
            const newReps = [...reps];
            newReps.push(Number(newValue)); // Adiciona o novo valor como número
            addRepToDaily(dailyId, Number(newValue));
            setNewValue(""); // Limpa o campo de entrada
            setReps(newReps);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
        if (dailyId) {
            const newReps = [...reps]; // Cria uma cópia do array de reps
            newReps[index] = Number(event.target.value); // Atualiza o valor na posição específica
            if (newReps[index] === 0) {
                newReps.splice(index, 1); // Remove o valor se for 0
            }
            updateDailyReps(dailyId, newReps);
            setReps(newReps);
        }
    };

    return (
        <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
            <Box display="flex" flexWrap={{xs: "wrap", sm:"nowrap"}} justifyContent="flex-start" gap={1}>
                {reps.map((val, index) => (
                    <StyledRepsTextField 
                        key={index} 
                        type="number" 
                        value={val} 
                        onChange={(event) => handleChange(event, index)} 
                    />
                ))}
                {isEditing ? (
                    <StyledRepsTextField
                        sx={{ backgroundColor: 'white' }}
                        type="number"
                        value={newValue}
                        onChange={(e) => setNewValue(e.target.value)} // O valor agora é string
                        onBlur={handleBlur} // Detecta a saída do campo
                        autoFocus // Coloca o cursor automaticamente no campo ao clicar
                    />
                ) : (
                    <IconButton onClick={() => setIsEditing(true)}>
                        <AddCircleIcon />
                    </IconButton>
                )}
            </Box>
        </Box>
    );
}

export default RepsBox;
