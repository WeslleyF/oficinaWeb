import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './core/routes/AppRoutes'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { ThemeApp } from './core/components/app/context/ThemeApp';

function App() {
  return (
    <ThemeApp>
       <LocalizationProvider dateAdapter={AdapterDateFns}>
         <BrowserRouter>
           <AppRoutes/>
         </BrowserRouter>
       </LocalizationProvider> 
    </ThemeApp>
      
  )
}

export default App
