import { supabase } from "./supabase";

//=======================sign up request ==========================
export const signUpRequest = async (email: string, password: string) => {

    const { data , error } = await supabase.auth.signUp({email:email , password:password})

    return { data, error };

}

//=======================login request ==========================
export const loginRequest = async (email:string , password:string)=>{

    const { data , error } = await supabase.auth.signInWithPassword({email:email , password:password})
        
    return { data , error }

}

//=======================google auth login request ==========================
export const googleLoginRequest = async ()=>{

    return await supabase.auth.signInWithOAuth({
        provider : 'google',
        options:{
            redirectTo : `${window.location.origin}/login`,
            queryParams : { access_type: "offline", prompt: "consent" },
        }    
    })  
    
}


//=======================get or creatin user in user table in supabase ==========================
export const getUserFromTable = async (userId :  string) =>{

    return await supabase.from('usersTable').select("id, email, language_preference, theme_preference, profile_picture, full_name, capital_view")
    .eq('id',userId).single()

}

//======================= insert into table when signup ==========================
export const insertUserToTable = async (user:any)=>{

    return await supabase.from('usersTable').insert(user).select().single()

}


//=======================g get session from supabse ==========================
export const getCurrentSession = async () => {

  return await supabase.auth.getSession();

};


export const authStateListener = (callback: any) => {

  return supabase.auth.onAuthStateChange(callback);

};



export const fetchUserFromDB = async (userId: string) => {
  const { data, error } = await supabase
    .from("usersTable")
    .select("*")
    .eq("id", userId)
    .single();

  return { userDetails: data, error };
};



export const createUserInDB = async (payload: {
  id: string;
  email: string;
  full_name: string;
  profile_picture: string;
}) => {
  const { data, error } = await supabase
    .from("usersTable")
    .insert({
      id: payload.id,
      email: payload.email,
      full_name: payload.full_name,
      profile_picture: payload.profile_picture,
      language_preference: "eng",
      theme_preference: "light",
      capital_view: "graph",
      items_per_page:10,
      created_at: new Date(),
      is_Verified: true,
    })
    .select()
    .single();

  return { newUser: data, error };
};



export const updateUserInDB = async (userId: string, updateData: any) => {
  const { data, error } = await supabase
    .from("usersTable")
    .update(updateData)
    .eq("id", userId);

  return { data, error };
};