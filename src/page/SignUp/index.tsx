import { useForm } from "react-hook-form";
import { signUpRequest } from "../../api/auth.api";
import { supabase } from "../../api/supabase";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { capitalize } from "@mui/material";

interface SignUpFormValues {
  email : string;
  password : string;
  confirmPassword : string;
}

const EyeIcon = () => (
  <img  src="./logos/eye-on.svg"  className="h-4 w-4" />
);

const EyeOffIcon = () => (
  <img  src="./logos/eye-off.svg"  className="h-4 w-4" />
);


export default function SignUp() {
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {register,handleSubmit , watch , setValue , formState:{errors}} = useForm<SignUpFormValues>()

  const password = watch('password')


  const handleSignUp = async (formData: SignUpFormValues) => {
  const {email , password} = formData

  try {
    const {data , error} = await signUpRequest(email,password)

    if(error){
      enqueueSnackbar(error.message, { variant: "error" });
      return;
    }

    const userId = data?.user?.id;

    if (!userId) {
      enqueueSnackbar("Signup failed. Try again.", { variant: "error" });
      return;
    }
    
      const { error: insertError } = await supabase.from("usersTable").insert({
        id: userId,
        email: email,
        full_name: "",
        nick_name: "",
        gender: "",
        country: "",
        language_preference: "eng",
        theme_preference: "light",
        profile_picture: "",
        created_at: new Date(),
        is_Verified: false,
        capital_view:'graph'
      });

      console.log('eeee',insertError);
      

      if (insertError) {
        enqueueSnackbar(insertError.details, { variant: "error" });
        return;
      }

      enqueueSnackbar(
        "Signup successful! Check your Inbox to verify your email.",
        { variant: "success" }
      );

      setValue("email", "");
      setValue("password", "");
      setValue("confirmPassword", "");

  } catch (error) {
    console.error(error);
      enqueueSnackbar("Something went wrong! Try again later.", {
        variant: "error",
    });
  }
};



  return (
    <div className="relative  w-full flex m items-center h-screen justify-center  overflow-hidden bg-[url('./bg/today-bg.jpg')] bg-cover">
      <div className="relative w-full max-w-sm py-6 px-8 space-y-6  bg-white/60 dark:bg-black/20  backdrop-blur-sm  border border-white/20 dark:border-zinc-700  shadow-xl  rounded-xl">

        {/* Header section with icon and title - More compact */}
        <div className="text-center space-y-3">
          <div className="inline-flex p-2 bg-zinc-100 dark:bg-zinc-900 rounded-md border border-zinc-200 dark:border-zinc-800">
            <img  src="./logos/user.svg"  className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">Welcome back</h1>
            <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mt-1">Enter your credentials to sign up</p>
          </div>
        </div>


        {/* Form  */}
        <form className="space-y-4 " onSubmit={handleSubmit(handleSignUp)} >
            {/* email */}
          <div className="space-y-2">
            <label  className="text-secondary text-sm font-medium "> Email </label>
            <input type="email" {...register('email',{required:"email is required"})}   placeholder="name@example.com" className="flex h-9 w-full rounded-primary border border-border-primary dark:border-zinc-800 bg-white/50 dark:bg-zinc-950 px-3 py-5 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 dark:placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 dark:focus-visible:ring-zinc-300 disabled:cursor-not-allowed disabled:opacity-50"/>
            {errors.email && (<p className="text-red-500 text-xs">{errors.email.message}</p>)}
          </div>
          {/* password */}
          <div className="space-y-2 ">
            <label  className="text-sm font-medium   text-secondary "> Password</label>
            <div className="relative">
              <input type={showPassword ? "text" : "password"}  
                {...register('password',{
                  required:'password is required',
                  minLength : {
                    value : 6,
                    message:'password must be atleast 6 characters'
                  }
                })}
              placeholder="Enter your password"  className="flex h-9 w-full rounded-primary border border-border-primary  bg-white/50 px-3 py-5 pr-10 text-sm   file:text-sm file:font-medium placeholder:text-zinc-500  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950  " />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 hover:text-zinc-900  transition-colors">
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
            {errors.password && (<p className="text-red-500 text-xs">{errors.password.message}</p>)}
          </div>
          {/* confirm password */}
          <div className="space-y-2">
            <label className="text-sm text-secondary font-medium "> Confirm Password </label>
            <div className="relative">
              <input  type={showPassword ? "text" : "password"} placeholder="Re-enter your password"
                {...register("confirmPassword", {
                  required: "Confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className="flex h-9 w-full rounded-primary border border-border-primary  bg-white/50 px-3 py-5 pr-10 text-sm   file:text-sm file:font-medium placeholder:text-zinc-500  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950  " />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2">
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>

            {errors.confirmPassword && (
              <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>
            )}
          </div>
          <button type="submit"  className="mt-2 cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-secondary text-sm font-bold transition-transform focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 dark:focus-visible:ring-zinc-300 disabled:pointer-events-none disabled:opacity-50 bg-white/90 text-primary hover:scale-101  duration-300  h-9 px-4 py-5 w-full">
            Sign up
          </button>
        </form>

        <div className="text-center space-y-2">
          <p className="text-sm text-secondary font-medium dark:text-zinc-400">
            Already have an account?{' '}
            <a href="/login" className="font-bold text-zinc-900 dark:text-zinc-50 underline underline-offset-4 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">
              Sign in
            </a>
          </p>
          <a href="#" className="text-sm font-medium text-secondary dark:text-zinc-50 underline underline-offset-4 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">
            Forgot your password?
          </a>
        </div>

      </div>
    </div>
  );
}