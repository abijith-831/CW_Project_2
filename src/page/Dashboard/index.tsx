import GraphView from '../../Components/GraphView'
import TableView from '../../Components/TableView'
import Navbar from '../../layouts/Navbar'
import { useEffect, useState } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { updateCapitalView } from '../../redux/slices/authSlice'
import { getCompanyData } from '../../api/companyData.api'

const index = () => {

  const dispatch = useDispatch()
  const capitalView = useSelector((state:any)=> state.auth.currentUser?.capital_view)

  const [companyData , setCompanyData] = useState<any[]>([])
  const [loading , setLoading] = useState(true)

  const handleChangeView = (value : 'graph' | 'table')=>{
    dispatch(updateCapitalView(value))
  }

  useEffect(()=>{
    const fetchData = async ()=>{
        try {
            const response = await getCompanyData()
            setCompanyData(response.records)   
        } catch (error) {
            console.log(error); 
        }finally{
            setLoading(false)
        }
    }
    fetchData()
  },[])
    
  return (
        <div>
            <Navbar/>
        <div>
            <div className='px-10 md:px-14 lg:px-20  py-4 flex justify-between'>
                <div>
                    <h1 className='text-xl font-medium text-primary'>Registrars of Companies - {capitalView === 'graph'? 'Graph View' : 'Table View'} </h1>
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
                                'bg-gray-200 text-secondary'
                            }`}>Graph</button>
                        <button onClick={()=> handleChangeView('table')} className={`flex items-center justify-center gap-2 px-3 md:px-5 lg:px-7 xl:px-10 py-1 md:py-1.5 lg:py-2 text-xs sm:text-sm lg:text-md 
                            ${capitalView === 'table' ?
                                'bg-bg-primary text-white '
                                :
                                'bg-gray-200 text-secondary '
                            }`}>Table</button>         
                    </div>
                </div>
                
            </div>
            <div className='text-secondary px-10  md:px-14  lg:px-20 text-sm'>
                <h6 >Visualize key insights from company registration data, including capital distribution, company status, and registration trends over time. The graphs help you quickly understand overall patterns across construction-related businesses.The graphs help you quickly understand overall patterns across construction-related businesses.</h6>
            </div>

           <div>
                {capitalView === 'graph' ? <GraphView companyData={companyData} loading={loading}/> : <TableView/>}
           </div>
        </div>
    </div>
  )
}

export default index
