import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  email: string;
  language_preference?: string;
  theme_preference?: string;
  capital_view?:string;
  selected_columns?:string[];
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

        if (!state.currentUser.selected_columns || state.currentUser.selected_columns.length === 0) {
          state.currentUser.selected_columns = [
            "CompanyName",
            "CIN",
            "CompanyCategory",
            "CompanySubcategory",
            "CompanyStatus",
            "Registered_Office_Address",
          ];
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
    updateSelectedColumns(state,action){
      if(state.currentUser){
        state.currentUser.selected_columns = action.payload;
      }
    },
    updateSearchQuery(state, action: PayloadAction<string>) {
      if (state.currentUser) {
        state.currentUser.search_query = action.payload;
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

export const { loginSuccess, logout, setError , updateCapitalView , updateSelectedColumns , updateSearchQuery , setUser} = authSlice.actions;
export default authSlice.reducer;
