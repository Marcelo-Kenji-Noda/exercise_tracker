import { Box, FormControlLabel, Switch, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { LineChart } from '@mui/x-charts/LineChart';

type ExerciseStatisticDisplayProps = {
  exerciseId: string;
};

type Statistic = {
  dates: string[]; // Datas como strings no formato ISO (e.g., "2024-11-14")
  series: number[];
};

function ExerciseStatisticDisplay({ exerciseId }: ExerciseStatisticDisplayProps) {
    const [statisticMax, setStatisticMax] = useState<boolean>(true);
    const [statistics, setStatistics] = useState<Statistic | null>(null);
    const fetchMaxStatisticDisplay = async (exerciseId: string) => {
    const res = await fetch(`/api/statistics/maxexercise/${exerciseId}`, {
        method: 'GET',
    });
    const data = await res.json();
    setStatistics(data.data);
    };

    const fetchMeanStatisticDisplay = async (exerciseId: string) => {
    const res = await fetch(`/api/statistics/meanexercise/${exerciseId}`, {
        method: 'GET',
    });
    const data = await res.json();
    setStatistics(data.data);
    };

    useEffect(() => {
    if (exerciseId !== '') {
        if (statisticMax) {
            console.log(statisticMax)
        fetchMaxStatisticDisplay(exerciseId);
        } else {
            console.log(statisticMax)
        fetchMeanStatisticDisplay(exerciseId);
        }
    }
    }, [exerciseId, statisticMax]);

    return (
    <div>
        <FormControlLabel control={<Switch defaultChecked checked={statisticMax} onChange={() => setStatisticMax((prev) => !prev)}/>} labelPlacement="top" label="Média Máximo"/>
        {statistics ? (
        <Box
        sx={{
            width: '90w', // Faz o gráfico ocupar toda a largura da tela
            height: {xs:'300px', md:'500px'}, // Define uma altura fixa
            overflowX: 'hidden', // Evita barras de rolagem horizontais
        }}
        >
        <LineChart
            title= "Evolução do treino"
            xAxis={[
            {
                data: statistics.dates.map((date) => new Date(date)), // Converter strings para objetos Date
                scaleType: 'time', // Configurar o eixo X como temporal
                valueFormatter: (value) => 
                value instanceof Date ? value.toLocaleDateString() : 'N/A',
                label: 'Date'
            },
            ]}
            series={[
            {
                data: statistics.series,
                label: 'Caraga (kg)'
            },
            ]}
            sx={{
                width: '100%'
            }}
            grid={{ vertical: true, horizontal: true }}
        />
        </Box>
        ) : (
        <Typography>Nenhuma estatística disponível</Typography>
        )}
    </div>
    );
}

export default ExerciseStatisticDisplay;
