import Navbar from '../../layouts/Navbar'
import React from 'react'
import { useForm } from 'react-hook-form'

const SettingsPage = () => {

  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <div className='h-screen flex flex-col'>
      <Navbar />

      <div className='flex flex-1 gap-4 px-16 py-8 overflow-hidden'>
        
        <div className='h-full w-1/2 rounded-lg border bg-white shadow-md border-border-secondary flex items-center justify-center'>
          img
        </div>
        
        {/* right box */}
        <div className='h-full w-1/2 rounded-lg px-8 py-10 border bg-white shadow-md border-border-secondary overflow-auto'>
            <h1 className='font-bold text-2xl text-center mb-10'>Profile & Settings</h1>
          {/* profile banner */}
          <div className='flex items-center justify-between p-8 rounded-lg  border-border-secondary  border mb-8'>
            <div className='flex items-center gap-4'>
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.pn"
                alt="profile"
                className='w-20 h-20 rounded-full object-cover border'
              />
              <div>
                <h2 className='text-xl font-semibold text-primary'>Abhijith P</h2>
                <p className='text-gray-500 text-sm'>abhijith@example.com</p>
              </div>
            </div>

            <button className='px-12 py-1.5 rounded-md bg-border-secondary font-bold text-[#343333] hover:bg-secondary transition'>
              Edit
            </button>
          </div>

          {/* form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 mt-10">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                <label className="block text-sm mb-1">Full Name</label>
                <input
                    {...register("fullName", { required: true })}
                    className="w-full px-4 py-2 text-secondary  placeholder:text-secondary bg-bg-input rounded-md focus:ring focus:ring-blue-200"
                    placeholder="Enter full name"
                />
                {errors.fullName && <p className="text-red-500 text-xs">Full Name is required</p>}
                </div>

                <div>
                <label className="block text-sm mb-1">Nick Name</label>
                <input
                    {...register("nickName")}
                    className="w-full px-4 py-2 text-secondary  placeholder:text-secondary bg-bg-input rounded-md focus:ring focus:ring-blue-200"
                    placeholder="Enter nick name"
                />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                <label className="block text-sm mb-1">Gender</label>
                <select
                    {...register("gender", { required: true })}
                    className="w-full px-4 text-secondary  placeholder:text-secondary py-2 bg-bg-input  rounded-md focus:ring focus:ring-blue-200"
                >
                    <option value="" className='text-secondary'>Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
                {errors.gender && <p className="text-red-500 text-xs">Gender is required</p>}
                </div>

                <div>
                <label className="block text-sm mb-1">Country</label>
                <select
                    {...register("country", { required: true })}
                    className="w-full px-4 py-2 bg-bg-input text-secondary  placeholder:text-secondary rounded-md focus:ring focus:ring-blue-200"
                >
                    <option value="">Select country</option>
                    <option value="india">India</option>
                    <option value="uae">UAE</option>
                    <option value="usa">USA</option>
                    <option value="uk">United Kingdom</option>
                </select>
                {errors.country && <p className="text-red-500 text-xs">Country is required</p>}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                <label className="block text-sm mb-1">Language</label>
                <select
                    {...register("language", { required: true })}
                    className="w-full px-4 py-2 text-secondary  placeholder:text-secondary bg-bg-input rounded-md focus:ring focus:ring-blue-200"
                >
                    <option value="" >Select language</option>
                    <option value="english">English</option>
                    <option value="arabic">Arabic</option>
                    
                </select>
                {errors.language && <p className="text-red-500 text-xs">Language is required</p>}
                </div>

                <div>
                <label className="block text-sm mb-1">Theme</label>
                <select
                    {...register("theme", { required: true })}
                    className="w-full px-4 py-2 text-secondary  placeholder:text-secondary bg-bg-input rounded-md focus:ring focus:ring-blue-200"
                >
                    <option value="">Select theme</option>
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                </select>
                {errors.theme && <p className="text-red-500 text-xs">Theme is required</p>}
                </div>
            </div>

            </form>


        </div>
      </div>
    </div>
  )
}

export default SettingsPage
