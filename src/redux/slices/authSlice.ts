import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  email: string;
  language_preference?: 'eng'|'arb';
  theme_preference?: 'light'|'dark';
  capital_view?:string;
  selected_columns?: Record<string, boolean>;
  search_query?: string;
}

interface UserState {
  currentUser: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  error: boolean;
}

const initialState: UserState = {
  currentUser: null,
  accessToken: null,
  refreshToken: null,
  error: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
   loginSuccess(
        state,
        action: PayloadAction<{
          user: User;
          accessToken: string | null;
          refreshToken: string | null;
        }>
      ) {
        state.currentUser = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.error = false;

        if (!state.currentUser.selected_columns) {
          state.currentUser.selected_columns = {
            CompanyName: true,
            CompanyIndustrialClassification: true,
            Registered_Office_Address: true,
            AuthorizedCapital: true,
            PaidupCapital: true,
            CompanyStatus: true,

            CIN: false,
            CompanyROCcode: false,
            CompanyRegistrationdate_date: false,
            CompanyCategory: false,
            Listingstatus: false,
            CompanyClass: false,
            CompanyStateCode: false,
            nic_code: false,
          };
        }
      },
    logout(state) {
      state.currentUser = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.error = false;
    },
    updateCapitalView:(state , action: PayloadAction<string>) =>{
      if(state.currentUser){
        state.currentUser.capital_view = action.payload;
      }
    },  
    updateSelectedColumns(state,action:PayloadAction<Record<string,boolean>>){
      if(state.currentUser){
        state.currentUser.selected_columns = action.payload;
      }
    },
    updateSearchQuery(state, action: PayloadAction<string>) {
      if (state.currentUser) {
        state.currentUser.search_query = action.payload;
      }
    },
    updateThemePreference(state , action:PayloadAction<'light'|'dark'>){
      if(state.currentUser){
        state.currentUser.theme_preference = action.payload
      }
    },
    updateLanguagePreference(state , action:PayloadAction<'eng'|'arb'>){
      if(state.currentUser){
        state.currentUser.language_preference = action.payload
      }
    },
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setError(state) {
      state.error = true;
    }
  },
});

export const { loginSuccess,
               logout,
               setError, 
               updateCapitalView,
               updateSelectedColumns,
               updateSearchQuery,
               updateThemePreference,
               updateLanguagePreference,
               setUser
              } = authSlice.actions;
export default authSlice.reducer;
