import { AppBar, Box, Button, IconButton, Menu, MenuItem, Theme, Toolbar, Typography, useMediaQuery } from '@mui/material'
import React, {MouseEvent, useState} from 'react'

import {Link} from 'react-router-dom'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { styled } from '@mui/material/styles';

const menuItems = [
  {label: 'Home', to: '/'},
  {label: 'Exercícios', to:'/exercise'},
  {label: "Séries", to: '/exerciseset'},
  {label: "Estatísticas", to: '/statistics'}
]

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none', // Remove o sublinhado
  color: theme.palette.text.primary, // Usa a cor primária de texto do tema
  // Remove o ripple visual (no caso de botões com animações herdadas)
  '&:focus, &:active': {
    outline: 'none',
  },
}));

function TopAppBar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm')); // Detecta tamanho mobile

  const handleMenuOpen = (event: MouseEvent<HTMLElement> ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
  <AppBar position="fixed" sx={{backgroundColor: 'white', color:'black', boxShadow:'none'}}>
    <Toolbar>

      {!isMobile ? (
          <Box>
            {menuItems.map((item) => (
              <Button
                key={item.to}
                color="inherit"
                component={Link}
                to={item.to}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        ) : (
          <>
            <Box sx={{ flexGrow: 1 }}>
            <Box>
              <StyledLink to="/" style={{ WebkitTapHighlightColor: 'transparent' }}>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Exercise Tracker
                </Typography>
              </StyledLink>
            </Box>
            </Box>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleMenuOpen}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {menuItems.map((item) => (
                <MenuItem
                  key={item.to}
                  component={Link}
                  to={item.to}
                  onClick={handleMenuClose}
                >
                  {item.label}
                </MenuItem>
              ))}
            </Menu>
          </>
        )}
    </Toolbar>
  </AppBar>
  )
}

export default TopAppBar