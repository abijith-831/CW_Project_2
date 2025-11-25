import LabelsAboveBars from '../../Components/Graph';
import Navbar from '../../layouts/Navbar'
import React from 'react'

interface DetailsPageProps{
    goToDashboard : ()=> void;
    company : any
}
const DetailsPage:React.FC<DetailsPageProps> = ({goToDashboard , company}) => {
    console.log('cc',company);
    
  return (
    <div className="flex flex-col min-h-screen">
        <Navbar />

        <div className="w-full relative py-2">
            <button className="absolute left-4 border rounded-full p-2 md:left-10 lg:left-20 top-4   text-primary font-medium" onClick={goToDashboard}>
                <img src="/logos/back.svg" alt="" />
            </button>
        </div>

        {/* Page title */}
        <div className="w-full px-6 flex justify-center">
            <h1 className="text-lg md:text-xl font-medium text-secondary">
            Registrars of Companies - Detailed Information
            </h1>
        </div>

        <div className="w-[450px] py-6 mx-auto">
            <LabelsAboveBars company={company} />
        </div>

        <div className='px-8 md:px-16 lg:pl-20 py-4 space-y-2'>
            <h1 className='text-lg md:text-xl font-medium text-secondary'>Registrars of Companies - Detailed Information</h1>
            <h3 className='text-secondary text-md'>The following table provides a breakdown of vaccine doses distributed by manufacturer and source, including total doses received and administered . The following table provides a breakdown of vaccine doses distributed by manufacturer and source, including total doses received and administered</h3>
        </div>
        
    </div>


  )
}

export default DetailsPage
