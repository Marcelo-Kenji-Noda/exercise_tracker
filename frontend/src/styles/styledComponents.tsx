import { Button, Container, TextField } from "@mui/material";

import { styled } from "@mui/material/styles";

export const StyledContainer = styled(Container)(() => ({
    color: 'black',
    border: '1.5px solid #B5B5B5',
    borderRadius: '2px',
    minHeight: '85vh'
}));

export const StyledButton = styled(Button)(() => ({
    borderRadius: '1.25rem',
    boxShadow: 'none',
    color:'#515151',
    backgroundColor: 'white',
    borderColor: '#515151',
    paddingTop: '10px',
    marginTop:'10px',
    marginBottom: '1rem',
    '&:active': {
        backgroundColor: '#ffffff',
      },
    '&:hover': {
        backgroundColor: '#f5f5f5'
      }
}))

export const StyledRepsTextField = styled(TextField)(({theme}) => ({
  color: 'white',
  backgroundColor: '#45A940',
  [theme.breakpoints.down('md')]: {
    width: '3rem', // Para telas pequenas ou menores
  },
  [theme.breakpoints.up('md')]: {
    width: '4rem',
  },
  '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none',
        margin: 0,
    },
    '& input[type=number]': {
        '-moz-appearance': 'textfield', // Firefox
    },
}));