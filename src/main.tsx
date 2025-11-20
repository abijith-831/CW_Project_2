// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'

// import App from './App.tsx'
// // import { Provider } from 'react-redux'
// import "./i18n/i18nConfig";
// import { BrowserRouter , Routes , Route , Link} from 'react-router-dom' 

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     {/* <Provider> */}
//       <App />
//     {/* </Provider> */}
//   </StrictMode>,
// )
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
// import { AuthProvider } from "./utils/authUtils";
import { GoogleOAuthProvider } from '@react-oauth/google'
import { store , persistor } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";


const CLIENT_ID = import.meta.env.GOOGLE_CLIENT_ID

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <GoogleOAuthProvider clientId={CLIENT_ID}>
            {/* <AuthProvider> */}
              <App />
            {/* </AuthProvider> */}
          </GoogleOAuthProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

