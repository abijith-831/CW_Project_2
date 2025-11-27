import { supabase } from "./supabase";


export const getUserProfile = async () => {
  try {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) return null;

    const email = session.user.email;

    const { data, error } = await supabase
      .from("usersTable")
      .select("*")
      .eq("email", email)
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};



export const updateUserProfile = async (payload: any) => {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error("No session found");

  const email = session.user.email;

  const { data, error } = await supabase
    .from("usersTable")
    .update(payload)
    .eq("email", email)
    .select()
    .single();

  if (error) throw error;
  return data;
};


export const updateCapitalViewInDB = async (userId: string, capitalView: string) => {
  return await supabase
    .from("usersTable")
    .update({ capital_view: capitalView })
    .eq("id", userId);
};