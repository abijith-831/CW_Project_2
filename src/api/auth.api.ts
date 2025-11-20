import { supabase } from "./supabase";

export const signUpRequest = async (email: string, password: string) => {

    const { data , error } = await supabase.auth.signUp({email:email , password:password})

    return { data, error };

}

export const loginRequest = async (email:string , password:string)=>{

    const { data , error } = await supabase.auth.signInWithPassword({email:email , password:password})

    return { data , error }

}


