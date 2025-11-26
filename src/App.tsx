import './App.css';
// import LabelsAboveBars from './LabelAboveBars';
// // import { useTranslation } from 'react-i18next';
// import { useTheme } from './hooks/useTheme';

// const App: React.FC = () => {

//   //  const { i18n } = useTranslation();
//    const { theme , toggleTheme } = useTheme()

//   // const { t }= useTranslation()
//   return (
//     <div className="bg-gray-400 text-black dark:bg-gray-900 dark:text-white p-4">
      
//       {/* <div className="w-full sm:w-1/4 min-w-[250px] bg-white p-[50px] rounded-2xl shadow-md max-h-[350px] overflow-hidden flex items-center justify-center">
//         <LabelsAboveBars />
//       </div>
      

    
//       <div className="w-full sm:w-1/4 min-w-[250px] bg-white p-[50px] rounded-2xl shadow-md max-h-[250px] overflow-hidden flex items-center justify-center">
//         <LabelsAboveBars />
//       </div>

    
//       <div className="w-full sm:w-1/4 min-w-[250px] bg-white p-[50px] rounded-2xl shadow-md max-h-[250px] overflow-hidden flex items-center justify-center">
//         <LabelsAboveBars />
//       </div> */}
//       {/* <h1>{t("welcome")}</h1>
//       <button>{t("login")}</button>

//        <button onClick={() => i18n.changeLanguage("en")}>English</button>
//       <button onClick={() => i18n.changeLanguage("hi")}>Hindi</button> */}

//       <h1></h1>
//         <button
//       onClick={toggleTheme}
//       className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700"
//     >
//       {theme === "light" ? "Switch to Dark" : "Switch to Light"}
//     </button>
//     </div>
//   );
// };

// export default App;



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


const App = () => {
  useTheme()

  return (
    <div >
      <SnackbarProvider maxSnack={3} autoHideDuration={3000} anchorOrigin={{vertical:'top',horizontal:'right'}}>
        <Routes>
          <Route path='/' element={<ProtectedRoute> <MainPage /></ProtectedRoute>}/>
          <Route path='/settings' element={<ProtectedRoute> <SettingsPage /></ProtectedRoute>}/>
          <Route path='/login' element={<PublicRoute><Login /></PublicRoute>}/>
          <Route path='/signup' element={<PublicRoute><SignUp /></PublicRoute>}/>

          <Route path='*' element={<NotFound />} />
        </Routes>
      </SnackbarProvider>
    </div>
  )
}

export default App
