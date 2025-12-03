import { supabase } from '../../api/supabase'
import Navbar from '../../Components/Navbar'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { getUserProfile, updateUserProfile } from "../../api/userProfile.api"
import { useSnackbar } from 'notistack'
import { useDispatch , useSelector} from 'react-redux'
import { useTranslation } from 'react-i18next'

import { setUser } from "../../redux/slices/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";


const SettingsPage = () => {
  const [userInfo, setUserInfo] = useState<any>(null)
  const [isEdit, setIsEdit] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const user = useSelector((state:any)=>state.auth.currentUser)
  console.log('user',user);
  
  const theme = useSelector((state:any)=> state.auth.currentUser?.theme_preference) || 'light'
  const language = useSelector((state:any)=>state.auth.currentUser?.language_preference) || 'eng'
  const capital_view = useSelector((state:any)=> state.auth.currentUser?.capital_view) || "graph"
  const items_per_page = useSelector((state:any)=>state.auth.currentUser?.items_per_page) || 10
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);
  const {t} = useTranslation("profile")


  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors }, setValue, setFocus, watch } = useForm()
  const formValues = watch()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true)
        const data = await getUserProfile()

        // console.log('daadad',data);
        
        setUserInfo(data)
      } catch (error) {
        console.error(error)
      }finally{
        setLoading(false)
      }
    }
    fetchUser()
  }, [])

  useEffect(() => {
    if (userInfo) {
      setValue("fullName", userInfo.full_name)
      setValue("nickName", userInfo.nick_name)
      setValue("gender", userInfo.gender)
      setValue("country", userInfo.country)
      setValue("language", language)
      setValue("theme", theme)
      setValue("capital_view",capital_view)
      setValue("items_per_page",items_per_page )
    }
  }, [userInfo, setValue,theme,isEdit , capital_view])

  const isChanged =  formValues.fullName !== userInfo?.full_name ||
  formValues.nickName !== userInfo?.nick_name ||
  formValues.gender !== userInfo?.gender ||
  formValues.country !== userInfo?.country ||
  formValues.language !== userInfo?.language_preference ||
  formValues.theme !== userInfo?.theme_preference ||
  formValues.capital_view !== userInfo?.capital_view ||
  formValues.items_per_page !== userInfo?.items_per_page ||
  selectedFile !== null;
  
  const onSubmit = async (data: any) => {
    try {

      let profilePictureUrl = userInfo?.profile_picture || null

      if (selectedFile) {
        const fileName = `${userInfo.id}_${Date.now()}.jpg`;
        const { error: uploadError } = await supabase.storage
          .from('profile_pictures')
          .upload(fileName, selectedFile, { cacheControl: '3600', upsert: true })

        if (uploadError) throw uploadError

        const { data: urlData } = supabase.storage
          .from('profile_pictures')
          .getPublicUrl(fileName)

        profilePictureUrl = urlData.publicUrl
      }

      const res = await updateUserProfile({
        full_name: data.fullName,
        nick_name: data.nickName,
        gender: data.gender,
        country: data.country,
        language_preference: data.language,
        theme_preference: data.theme,
        profile_picture: profilePictureUrl,    
        capital_view : data.capital_view,
        items_per_page : data.items_per_page
      })

      console.log('ressss',res);
      
      dispatch(setUser(res));

      setUserInfo(res)
      setIsEdit(false)
      setSelectedFile(null)
      enqueueSnackbar("User Profile Updated Successfully!", { variant: "success" })
    } catch (error) {
      console.error(error)
      enqueueSnackbar("Something went wrong!", { variant: "error" })
    }
  }

  const handleFileChange = async (event : React.ChangeEvent<HTMLInputElement>) =>{
    const file = event.target.files?.[0]

    if (!file){
      enqueueSnackbar("Something wrong while selecting image",{variant:'error'})
      return
    }

    if(file.size > 2 * 1024 * 1024) {
      enqueueSnackbar('Image should be less than 2 MB',{variant:'error'})
      return
    }

    setSelectedFile(file)
  }


  return (
    <div className='min-h-screen flex flex-col dark:bg-dark-primary'>
      <Navbar />

      <div className='flex flex-col lg:flex-row flex-1 gap-4 px-4 sm:px-8 lg:px-16 py-6 lg:py-8 overflow-auto'>
        
        {/* Left Image Section */}
        <div className='w-full lg:w-1/2 h-64 lg:h-auto rounded-lg border bg-white dark:border-neutral-600 shadow-md border-border-secondary flex items-center justify-center overflow-hidden'>
          <img src="/bg/today-bg.jpg" alt="" className='w-full h-full object-cover'/>
        </div>
        
        {/* Right Form Section */}
        <div className='w-full lg:w-1/2 rounded-lg px-6 sm:px-8 py-2 md:py-4 lg:py-10 border bg-white dark:bg-neutral-800 dark:border-neutral-600 shadow-md border-border-secondary overflow-auto'>
        
          <h1 className='font-bold text-lg md:text-xl lg:text-2xl text-center  mb-2 md:mb-4 lg:mb-8 text-secondary dark:text-table-header'>{t("profile_heading")}</h1>

          {/* Profile Banner */}
          <div className='relative flex flex-col md:flex-row sm:justify-between items-center md:items-start gap-4 p-6 sm:p-8 border border-border-secondary dark:border-neutral-600 rounded-lg mb-8'>

            {/* Edit Button – Desktop (top-right) */}
            <div className="hidden md:block absolute top-13 right-4">
              {!isEdit && (
                <button
                  onClick={() => {
                    setIsEdit(true);
                    setTimeout(() => setFocus("fullName"), 0);
                  }}
                  className="flex cursor-pointer items-center gap-2 px-6 py-1.5 rounded-md bg-bg-primary opacity-90 hover:scale-102 duration-300"  >
                  <FontAwesomeIcon icon={faPen} className="text-table-header text-xs  " />
                  <span className="font-medium text-table-header">{t("edit_btn")}</span>
                </button>
              )}
             
            </div>
      

            {/* Content */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 w-full">
              <div className="relative w-20 h-20">
                <img
                  src={
                    selectedFile
                      ? URL.createObjectURL(selectedFile)
                      : userInfo?.profile_picture ||
                        "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  }
                  alt="profile"
                  className={`w-20 h-20 rounded-full object-cover border transition-opacity duration-300 ${
                    imageLoading ? "opacity-0" : "opacity-100" }`}
                  onLoad={() => setImageLoading(false)} />

                {imageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-full bg-white/20 dark:bg-neutral-700/20 backdrop-blur-sm">
                    <div className="w-6 h-6 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
                  </div>
                )}

                {isEdit && !imageLoading && (
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center rounded-full bg-black/40 backdrop-blur-[2px] text-white text-sm cursor-pointer" onClick={() => fileInputRef.current?.click()} >
                    <input type="file" className="hidden" accept="image/*" ref={fileInputRef} onChange={handleFileChange} />
                    <h1>Upload</h1>
                    <p className="text-[10px] text-table-header">2 MB maximum</p>
                  </div>
                )}
              </div>

              <div className="text-center sm:text-left flex-1 pt-4">
                <h2 className="text-xl font-semibold text-primary dark:text-table-header">
                  {userInfo?.full_name || 'User'}
                </h2>
                <p className="text-gray-500 dark:text-neutral-300 text-sm">{userInfo?.email}</p>
              </div>

              {/* Edit Button – Mobile (bottom-center) */}
            <div className="md:hidden w-full flex justify-center mt-4">
              <button
                onClick={() => {
                  setIsEdit(true);
                  setTimeout(() => setFocus("fullName"), 0);
                }}
                className="flex items-center gap-2 px-4 py-1 rounded-md bg-bg-primary opacity-90 hover:scale-105 duration-300"  >
                <FontAwesomeIcon icon={faPen} className="text-table-header text-sm" />
                <span className="font-medium text-table-header">{t("edit_btn")}</span>
              </button>
            </div>
            </div>
          </div>



          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm mb-1 text-fourth dark:text-neutral-400">{t("full_name")}</label>
                <input
                  {...register("fullName", {
                    pattern: {
                      value: /^[A-Za-z ]+$/,
                      message: "Only alphabets and spaces are allowed"
                    }
                  })}
                  disabled={!isEdit}
                  className="w-full px-4 py-2 text-secondary placeholder:text-secondary dark:placeholder:text-table-header bg-bg-input dark:bg-neutral-600 dark:text-table-header rounded-md focus:ring focus:ring-blue-200"
                  placeholder= {t("full_name_placeholder")} />
                {errors.fullName && (
                  <p className="text-red-500 text-xs">{String(errors.fullName.message)}</p>
                )}
              </div>

              <div>
                <label className="block text-sm mb-1 text-fourth dark:text-neutral-400">{t("nick_name")}</label>
                <input
                  {...register("nickName", {
                    pattern: {
                      value: /^[A-Za-z ]+$/,
                      message: "Only alphabets and spaces are allowed"
                    }
                  })}
                  disabled={!isEdit}
                  className="w-full px-4 py-2 text-secondary placeholder:text-secondary bg-bg-input dark:placeholder:text-table-header dark:bg-neutral-600 dark:text-table-header rounded-md focus:ring focus:ring-blue-200"
                  placeholder= {t("nick_name_placeholder")}   />
                {errors.nickName && (
                  <p className="text-red-500 text-xs">{String(errors.nickName.message)}</p>
                )}
              </div>
            </div>
                {/* gender and country */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                  <label className="block text-sm mb-1 text-fourth dark:text-neutral-400">
                    {t("gender")}
                  </label>
                    <div className="relative">
                      <select {...register("gender")} disabled={!isEdit}
                        className=" w-full pl-6 pr-4 py-2  text-secondary  bg-bg-input dark:bg-neutral-600 dark:text-table-header  rounded-md appearance-none      focus:ring focus:ring-blue-200 "  >
                        <option value="">{t("select_gender")}</option>
                        <option value="male">{t("male")}</option>
                        <option value="female">{t("female")}</option>
                        <option value="other">{t("others")}</option>
                      </select>
                      <span className="absolute  right-4 top-1/2 -translate-y-1/2 pointer-events-none ">
                        <img src="/logos/down.svg" alt="" className=' text-bold w-4 h-4  dark:hidden' />
                        <img src="/logos/dark_down.svg" alt="" className=' text-bold w-4 h-4 hidden dark:block' />
                      </span>
                    </div>

                    {errors.gender && ( <p className="text-red-500 text-xs">Gender is required</p> )}
              </div>

              <div>
                <label className="block text-sm mb-1 text-fourth dark:text-neutral-400">
                  {t("country")}
                </label>

                <div className="relative">
                  <select {...register("country")} disabled={!isEdit} className="w-full pl-6 pr-4 py-2 text-secondary bg-bg-input rounded-md appearance-none focus:ring focus:ring-blue-200 dark:bg-neutral-600 dark:text-table-header" >
                    <option value="">{t("select_country")}</option>
                    <option value="india">{t("india")}</option>
                    <option value="uae">{t("uae")}</option>
                    <option value="usa">{t("usa")}</option>
                    <option value="uk">{t("uk")}</option>
                  </select>

                  <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-primary">
                    <img src="/logos/down.svg" alt="" className=' text-bold w-4 h-4  dark:hidden' />
                    <img src="/logos/dark_down.svg" alt="" className=' text-bold w-4 h-4 hidden dark:block' />
                  </span>
                </div>

                {errors.country && (
                  <p className="text-red-500 text-xs">Country is required</p>
                )}
              </div>
            </div>



            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Language */}
              <div>
                <label className="block text-sm mb-1 text-fourth dark:text-neutral-400">
                  {t("language")}
                </label>
                <div className="relative">
                  <select {...register("language")} disabled={!isEdit} className="   w-full pl-6 pr-4 py-2 text-secondary bg-bg-input rounded-md  appearance-none  focus:ring focus:ring-blue-200 dark:bg-neutral-600 dark:text-table-header " >
                    <option value="eng">English</option>
                    <option value="arb">العربية</option>
                  </select>

                  <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <img src="/logos/down.svg" alt="" className=' text-bold w-4 h-4  dark:hidden' />
                    <img src="/logos/dark_down.svg" alt="" className=' text-bold w-4 h-4 hidden dark:block' />
                  </span>
                </div>

                {errors.language && (
                  <p className="text-red-500 text-xs">Language is required</p>
                )}
              </div>

              {/* Theme */}
              <div>
                <label className="block text-sm mb-1 text-fourth dark:text-neutral-400">
                  {t("theme")}
                </label>
                <div className="relative">
                  <select {...register("theme")} disabled={!isEdit} className="   w-full pl-6 pr-4 py-2   text-secondary bg-bg-input rounded-md   appearance-none  focus:ring focus:ring-blue-200 dark:bg-neutral-600 dark:text-table-header" >
                    <option value="light">{t("light")}</option>
                    <option value="dark">{t("dark")}</option>
                  </select>

                  <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <img src="/logos/down.svg" alt="" className=' text-bold w-4 h-4  dark:hidden' />
                    <img src="/logos/dark_down.svg" alt="" className=' text-bold w-4 h-4 hidden dark:block' />
                  </span>
                </div>

                {errors.theme && (
                  <p className="text-red-500 text-xs">Theme is required</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm mb-1 text-fourth dark:text-neutral-400">
                      {t("capital_view")}
                    </label>
                    <div className="relative">
                      <select {...register("capital_view")} disabled={!isEdit} className="   w-full pl-6 pr-4 py-2    text-secondary bg-bg-input rounded-md  appearance-none   focus:ring focus:ring-blue-200  dark:bg-neutral-600 dark:text-table-header ">
                        <option value="graph">{t("graph_text")}</option>
                        <option value="table">{t("table_text")}</option>
                      </select>
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <img src="/logos/down.svg" alt="" className=' text-bold w-4 h-4  dark:hidden' />
                        <img src="/logos/dark_down.svg" alt="" className=' text-bold w-4 h-4 hidden dark:block' />
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm mb-1 text-fourth dark:text-neutral-400">
                      {t("items_per_page")}
                    </label>
                    <div className="relative">
                      <select {...register("items_per_page")} disabled={!isEdit} className="   w-full pl-6 pr-4 py-2    text-secondary bg-bg-input rounded-md  appearance-none   focus:ring focus:ring-blue-200  dark:bg-neutral-600 dark:text-table-header ">
                        <option value="10">{t("10_items")}</option>
                        <option value="15">{t("15_items")}</option>
                        <option value="20">{t("20_items")}</option>
                      </select>
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <img src="/logos/down.svg" alt="" className=' text-bold w-4 h-4  dark:hidden' />
                        <img src="/logos/dark_down.svg" alt="" className=' text-bold w-4 h-4 hidden dark:block' />
                      </span>
                    </div>
                  </div>
            </div>
             

              {isEdit && (
              <div className='flex items-end justify-end gap-10 mb-4'>
                <button onClick={() => setIsEdit(false)}  className='px-4 py-1  rounded-md text-secondary cursor-pointer bg-neutral-300 hover:scale-102 duration-300 transition-transform'>{t("cancel_btn")}</button>
                <button disabled={!isChanged} onSubmit={handleSubmit(onSubmit)} className={`px-4 py-1  rounded-md text-table-header bg-bg-primary  
                  ${!isChanged ? "opacity-50 cursor-not-allowed" : "hover:scale-102 cursor-pointer"} 
                  duration-300 transition-transform`}>{t("update_btn")}</button>

              </div>
              )}
            
          </form>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
