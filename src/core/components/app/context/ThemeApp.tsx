import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ptBR } from '@mui/material/locale';
import { ReactNode } from 'react';

interface IProps {
  children: ReactNode
}

const theme = createTheme(
  {
    palette: {
      primary: { main: '#1976d2' },
    },
  },
  ptBR,
);


export const ThemeApp = (props : IProps) => {
  
  return (
    <ThemeProvider theme={theme}>
      {props.children}
    </ThemeProvider>)
}


