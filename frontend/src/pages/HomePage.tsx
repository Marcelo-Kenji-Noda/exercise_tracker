import { Box, Drawer, Fab } from "@mui/material";
import { useEffect, useState } from "react";

import AddIcon from '@mui/icons-material/Add';
import DailyExercise from '../subpage/DailyExercise';
import ExerciseSetSubPage from "../subpage/ExerciseSetSubPage";
import Grid from "@mui/material/Grid2";
import { useExercises } from "../store/exercises";

export default function HomePage() {
    const { fetchExercises } = useExercises();
    const [drawerOpen, setDrawerOpen] = useState(false);
  
    useEffect(() => {
      fetchExercises();
    }, [fetchExercises]);
  
    const toggleDrawer = (open: boolean) => () => {
      setDrawerOpen(open);
    };
  
    return (
      <>
        <Grid container spacing={2}>
          <Grid size = {1}>
            {/* Margem esquerda */}
          </Grid>
  
          <Grid
            size = {{xs:0, sm:0, md:3, lg:3, xl:3}}
            sx={{
              display: { xs: "none", sm: "none", md:"block", lg: "block", xl:"block" }, // Oculta em telas menores que `sm`
            }}
          >
            <ExerciseSetSubPage />
          </Grid>
  
          <Grid size={{xs:10, sm:10, md:7, lg:7, xl:7}}>
            <DailyExercise />
          </Grid>
  
          <Grid size={1}>
            {/* Margem direita */}
          </Grid>
        </Grid>
  
        {/* Botão para abrir Drawer (somente em telas pequenas) */}
        <Box
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
            display: { xs: "block", sm: "block", md:"none", lg: "none", xl:"none" }, // Exibe o botão apenas em telas menores
          }}
        >
            <Fab
            variant="extended"
            color="primary"
            size="medium"
            onClick={toggleDrawer(true)}
            aria-label="Abrir ExerciseSetSubPage"
            >
            <AddIcon />
                Adicionar série
            </Fab>
        </Box>
  
        {/* Drawer para ExerciseSetSubPage */}
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          sx={{
            "& .MuiDrawer-paper": {
              width: "75vw",
            },
          }}
        >
          <ExerciseSetSubPage />
        </Drawer>
      </>
    );
  }