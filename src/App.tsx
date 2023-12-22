import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './core/routes/AppRoutes'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <BrowserRouter>
        <AppRoutes/>
      </BrowserRouter>
    </LocalizationProvider>    
  )
}

export default App
