import LabelsAboveBars from '../Graph';
import Navbar from '../Navbar'
import React from 'react'
import AccordionLast from '../Accordion';
import { useTranslation } from 'react-i18next';

interface DetailsPageProps{
    goToDashboard : ()=> void;
    company : any
}

const DetailsPage:React.FC<DetailsPageProps> = ({goToDashboard , company}) => {
    
    const {t} = useTranslation()
    
  return (
    <div className="flex flex-col min-h-screen">
        <Navbar />

        <div className="w-full relative py-2 cursor-pointer">
            <button className="absolute left-4 border cursor-pointer rounded-full px-1.5 py-1.5 md:px-2.5 md:py-2.5  md:left-10 lg:left-20 top-4   text-primary font-medium hover:bg-gray-200" onClick={goToDashboard}>
                <img src="/logos/back.svg" alt="" className='h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5'/>
            </button>
        </div>

        {/* Page title */}
        <div className="w-full pl-8 md:pl-0 md:px-8 flex justify-center">
            <h1 className="text-md md:text-lg lg:text-xl font-medium text-secondary">
                Registrars of Companies - Detailed Information
            </h1>
        </div>

        <div className="w-[350px] md:w-[450px] lg:w-[550px] py-6  mx-auto">
            <LabelsAboveBars company={company} />
        </div>

        <div className='px-4 md:px-8 lg:pl-20 py-4 space-y-2'>
            <h1 className='text-md md:text-lg lg:text-xl font-medium text-secondary'>Registrars of Companies - Detailed Information</h1>
            <h3 className='text-secondary text-sm'>The following table provides a breakdown of vaccine doses distributed by manufacturer and source, including total doses received and administered . The following table provides a breakdown of vaccine doses distributed by manufacturer and source, including total doses received and administered</h3>
        </div>   
        <div className='px-4 md:px-8'>   
            <AccordionLast company={company} />
        </div>
    </div>


  )
}

export default DetailsPage
