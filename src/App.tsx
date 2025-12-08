import './App.css';
import { Routes , Route } from 'react-router-dom'
import Login from '../src/page/Login'
import SignUp from '../src/page/SignUp'
import { SnackbarProvider } from 'notistack'
import ProtectedRoute from './utils/ProtectedRoute';
import PublicRoute from './utils/PublicRoute';
import SettingsPage from './page/SettingsPage';
import NotFound from './page/404';
import MainPage from './page/MainPage';
import { useTheme } from './hooks/useTheme';
import useSetLanguage from './hooks/useSetLanguage';


const App = () => {
  useTheme()
  useSetLanguage()

  return ( 
    <div >
      <SnackbarProvider maxSnack={3} autoHideDuration={3000} anchorOrigin={{vertical:'top',horizontal:'right'}}>
        <Routes>
          <Route path='/' element={<ProtectedRoute><MainPage /></ProtectedRoute>}/>
          <Route path='/settings' element={<ProtectedRoute><SettingsPage /></ProtectedRoute>}/>
          <Route path='/login' element={<PublicRoute><Login /></PublicRoute>}/>
          <Route path='/signup' element={<PublicRoute><SignUp /></PublicRoute>}/>

          <Route path='*' element={<NotFound />} />
        </Routes>
      </SnackbarProvider>
    </div>
  )
}

export default App
