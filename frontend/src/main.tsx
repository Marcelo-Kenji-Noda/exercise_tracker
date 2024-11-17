import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CssBaseline, ThemeProvider, Toolbar, createTheme } from '@mui/material';
import { Suspense, lazy } from 'react';

import HomePage from './pages/HomePage';
// import Statistics from './pages/Statistics';
import { StrictMode } from 'react';
import TopAppBar from './components/TopAppBar';
import { createRoot } from 'react-dom/client';

//const HomePage = lazy(() => import('./pages/HomePage'));
//const ExerciseSet = lazy(() => import('./pages/ExerciseSet'));
//const ExercisePage = lazy(() => import('./pages/ExercisePage'));
const Statistics = lazy(() => import('./pages/Statistics'));
const ExerciseSet = lazy(() => import('./pages/ExerciseSet'));
const ExercisePage = lazy(() => import('./pages/ExercisePage'));

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
          <Route path="/exercise" element={<Suspense fallback={<p>Loading...</p>}><ExercisePage /></Suspense>} />
          <Route path="/exerciseset" element={<Suspense fallback={<p>Loading...</p>}><ExerciseSet /></Suspense>} />
          <Route path="/statistics" element={<Suspense fallback={<p>Loading...</p>}><Statistics /></Suspense>}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);