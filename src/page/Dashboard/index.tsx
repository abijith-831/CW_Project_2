import GraphView from '../../Components/GraphView'
import TableView from '../../Components/TableView'
import Navbar from '../../layouts/Navbar'
import React, { useEffect, useState } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { updateCapitalView } from '../../redux/slices/authSlice'

const index = () => {

  const dispatch = useDispatch()
  const capitalView = useSelector((state:any)=> state.auth.currentUser?.capital_view)

  const handleChangeView = (value : 'graph' | 'table')=>{
    dispatch(updateCapitalView(value))
  }

  useEffect(()=>{
    
  })
    
  return (
    <div>
        <Navbar/>
        <div>
            <div className='px-6 py-4 flex justify-between'>
                <div>
                    <h1 className='text-xl font-medium text-primary'>Registrars of Companies - Graph View</h1>
                </div>
                <div className='flex gap-6'>
                    <div>
                        <h1>filter</h1>
                    </div>
                    <div className='flex rounded-lg items-center overflow-hidden '>
                        <button onClick={()=> handleChangeView('graph')} className={`flex items-center justify-center gap-2 px-3 md:px-5 lg:px-7 xl:px-10 py-1 md:py-1.5 lg:py-2 text-xs sm:text-sm lg:text-md 
                            ${capitalView === 'graph' ?
                                'bg-bg-primary text-third '
                                :
                                'bg-gray-300 text-secondary'
                            }`}>Graph</button>
                        <button onClick={()=> handleChangeView('table')} className={`flex items-center justify-center gap-2 px-3 md:px-5 lg:px-7 xl:px-10 py-1 md:py-1.5 lg:py-2 text-xs sm:text-sm lg:text-md 
                            ${capitalView === 'table' ?
                                'bg-bg-primary text-white '
                                :
                                'bg-gray-300 text-secondary '
                            }`}>Table</button>         
                    </div>
                </div>
                
            </div>
            <div className='text-secondary px-6 text-sm'>
                <h6 >Visualize key insights from company registration data, including capital distribution, company status, and registration trends over time. The graphs help you quickly understand overall patterns across construction-related businesses.The graphs help you quickly understand overall patterns across construction-related businesses.</h6>
            </div>

           <div>
                {capitalView === 'graph' ? <GraphView/> : <TableView/>}
           </div>
        </div>
    </div>
  )
}

export default index
