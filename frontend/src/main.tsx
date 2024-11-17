import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CssBaseline, ThemeProvider, Toolbar, createTheme } from '@mui/material';

import { StrictMode } from 'react';
import TopAppBar from './components/TopAppBar';
import { createRoot } from 'react-dom/client';
import { lazy } from 'react';

const HomePage = lazy(() => import('./pages/HomePage'));
const ExerciseSet = lazy(() => import('./pages/ExerciseSet'));
const ExercisePage = lazy(() => import('./pages/ExercisePage'));
const Statistics = lazy(() => import('./pages/Statistics'));


// Cria o tema com a fonte Roboto
const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Aplica estilos globais básicos */}
      <BrowserRouter>
        <TopAppBar/>
        <Toolbar sx={{marginBottom:0.2}}/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/exercise" element={<ExercisePage />} />
          <Route path="/exerciseset" element={<ExerciseSet />} />
          <Route path="/statistics" element={<Statistics />}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);