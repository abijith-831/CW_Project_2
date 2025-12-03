import { useState, useEffect } from "react";
import { supabase } from "../../api/supabase";
import { useDispatch } from "react-redux";
import { loginSuccess, setError } from "../../redux/slices/authSlice";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginRequest , googleLoginRequest , fetchUserFromDB , createUserInDB , updateUserInDB} from "../../api/auth.api";

interface LoginFormValues {
  email : string ; 
  password : string;
}

const EyeIcon = () => <img src="./logos/eye-on.svg" className="h-4 w-4" />;
const EyeOffIcon = () => <img src="./logos/eye-off.svg" className="h-4 w-4" />;

export default function Login() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register , handleSubmit , watch , setValue , formState:{errors}} = useForm<LoginFormValues>()

  const password = watch('password')

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
          console.error("Session error:", sessionError);
          return;
        }

        if (session?.user) {
          await processUserLogin(session);
        }
      } catch (error) {
        console.error("OAuth callback error:", error);
      }
    };

    handleOAuthCallback();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session) {
          await processUserLogin(session);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);


  const processUserLogin = async (session: any, redirectToDashboard = true) => {
    try {
      setIsLoading(true);

      const userId = session?.user?.id;
      if (!userId) {
        enqueueSnackbar("Login failed: User ID not found.", { variant: "error" });
        dispatch(setError());
        return;
      }

      const metadata = session.user.user_metadata;
      const profilePicture =
      metadata?.avatar_url || metadata?.picture || "";
      const fullName = metadata?.full_name || metadata?.name || "";

      // Check user in DB
      const { userDetails, error: userError } = await fetchUserFromDB(userId);

      console.log('deatisl',userDetails);
      

      if (userError || !userDetails) {
        // Create new user
        const { newUser, error: createErr } = await createUserInDB({
          id: userId,
          email: session.user.email,
          full_name: fullName,
          profile_picture: profilePicture,
        });

        if (createErr) {
          dispatch(setError());
          return;
        }

        const defaultColumns = {
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

        // selected_columns inside user
        const userWithColumns = {
          ...newUser,
          selected_columns: defaultColumns
        };

        dispatch(
          loginSuccess({
            user: newUser,
            accessToken: session?.access_token,
            refreshToken: session?.refresh_token,
          })
        );


        if (redirectToDashboard) navigate("/", { replace: true });

        return;
      }

      // ppdate user profile if changed
      // update payload
      const updatePayload: any = {};

      if (!userDetails.profile_picture && profilePicture) {
        updatePayload.profile_picture = profilePicture;
      }

      if (fullName && fullName !== userDetails.full_name) {
        updatePayload.full_name = fullName;
      }

      if (!userDetails.capital_view) {
        updatePayload.capital_view = "graph"
      }

      console.log('update payload',updatePayload);
      

      if (Object.keys(updatePayload).length > 0) {
        await updateUserInDB(userId, updatePayload);
      }


      dispatch(
        loginSuccess({
          user: { ...userDetails, ...updatePayload },
          accessToken: session?.access_token,
          refreshToken: session?.refresh_token,
        })
      );

      
      if (redirectToDashboard) navigate("/", { replace: true });

    } catch (error) {
      console.error("Process login error:", error);
      enqueueSnackbar("Failed to process login!", { variant: "error" });
      dispatch(setError());
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (data: LoginFormValues)=>{
    try {
      setIsLoading(true)

      const { data:loginData , error } = await loginRequest(data.email , data.password)

      if(error){
        enqueueSnackbar(error.message , {variant : 'error'})
        dispatch(setError())
        return
      }

      await processUserLogin(loginData.session)
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Something went wrong", { variant: "error" });
      dispatch(setError());
    }finally{
      setIsLoading(false)
    }
  }

  
  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);

      const { error } = await googleLoginRequest();

      if (error) {
        enqueueSnackbar(error.message, { variant: "error" });
        dispatch(setError());
      }
    } catch (error) {
      console.error("Google login error:", error);
      enqueueSnackbar("Google login failed!", { variant: "error" });
      dispatch(setError());
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ backgroundImage: "url('/bg/today-bg.jpg')" }} className="relative w-full flex items-center h-screen justify-center overflow-hidden bg-[url('./bg/today-bg.jpg')] bg-cover">
      <div className="relative w-full max-w-sm p-6 space-y-6 px-8 bg-white/60  backdrop-blur-sm border border-white/20  shadow-xl rounded-xl">
        {/* Header section */}
        <div className="text-center space-y-3">
          <div className="inline-flex p-2 bg-zinc-100  rounded-md border border-zinc-200 ">
            <img src="./logos/user.svg" className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 "> Welcome back</h1>
            <p className="text-sm font-medium text-zinc-600  mt-1"> Enter your credentials to sign in</p>
          </div>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit(handleLogin)}>
          <div className="space-y-2">
            <label   className="text-secondary text-sm font-medium  "> Email</label>
            <input type="email" placeholder="name@example.com"
              disabled={isLoading}
              {...register('email',{required:'email is reuired'})}
              className="flex h-9 w-full rounded-primary border border-border-primary  bg-white/50  px-3 py-5 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950  "/>
            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
          </div>
          <div className="space-y-2">
            <label   className="text-sm font-medium  text-secondary " >   Password </label>
            <div className="relative">
              <input type={showPassword ? "text" : "password"}  placeholder="Enter your password"
                disabled={isLoading}
                {...register('password',{required:"password is required", minLength:{value:6,message:'password must be atleast 6 characters'}})}
                className="flex h-9 w-full rounded-primary border border-border-primary  bg-white/50  px-3 py-5 pr-10 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 " />
                
              <button type="button" onClick={() => setShowPassword(!showPassword)} disabled={isLoading} className="absolute right-3 top-1/2 -translate-y-1/2 hover:text-zinc-900 cursor-pointer  transition-colors">
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
              
            </div>
            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
          </div>
          <button type="submit" disabled={isLoading} className="mt-2 inline-flex items-center justify-center whitespace-nowrap rounded-secondary text-sm font-bold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950  disabled:pointer-events-none disabled:opacity-50 bg-white/90 text-primary hover:scale-101 duration-300 transition-transform h-9 px-4 py-5 w-full cursor-pointer">
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center my-2">
          <div className="flex-1">
            <span className="block border-t border-gray-500 dark:border-zinc-800"></span>
          </div>
          <span className="px-3 text-[13px] uppercase text-secondary dark:text-zinc-400 dark:bg-zinc-900">
            Or continue with
          </span>
          <div className="flex-1">
            <span className="block border-t border-gray-500 dark:border-zinc-800"></span>
          </div>
        </div>

        {/* Google Login Button */}
        <button type="button" onClick={handleGoogleLogin} disabled={isLoading} className="mt-2 gap-3 cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-secondary text-sm font-bold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950  disabled:pointer-events-none disabled:opacity-50 bg-white/90 text-primary hover:scale-101 duration-300 transition-transform h-9 px-4 py-5 w-full" >
          <img src="./logos/google.svg" className="h-4 w-4" />
          {isLoading ? "Loading..." : "Login with Google"}
        </button>

        <div className="text-center space-y-2">
          <p className="text-sm text-secondary font-medium dark:text-zinc-400">
            Don&apos;t have an account?{" "}
            <a href="/signup" className="font-bold text-zinc-900  underline underline-offset-4 hover:text-zinc-700  transition-colors">  Sign up</a>
          </p>
          <a href="#"  className="text-sm font-medium text-secondary  underline underline-offset-4 hover:text-zinc-700  transition-colors">
            Forgot your password?
          </a>
        </div>
      </div>
    </div>
  );
}