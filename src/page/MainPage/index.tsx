import React, { useState } from 'react'
import Dashboard from '../../Components/Dashboard'
import DetailsPage from '../../Components/DetailsPage'

const MainPage = () => {

    const [showDetails , setShowDetails] = useState<boolean>(false)
    const [selectedCompany , setSelectedCompany ] = useState<any>(null)

  return (
    <div>
      {showDetails ? (
        <DetailsPage company={selectedCompany} goToDashboard={()=> setShowDetails(false)}/>
      ):(
        <Dashboard 
        onSelectCompany={(company: any) => {
            setSelectedCompany(company);
            setShowDetails(true);
          }}  goToDetails={()=>setShowDetails(true)}/>
      )}
    </div>
  )
}

export default MainPage
