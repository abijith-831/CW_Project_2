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

  const [currentPage , setCurrentPage ] = useState(1)
  const [itemsPerPage , setItemsPerPage] = useState(capitalView === 'table' ? 10 : 6)
  const [selectedState , setSelectedState] = useState('')

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = companyData.slice(indexOfFirstItem,indexOfLastItem)


  const totalPages = Math.ceil(companyData.length / itemsPerPage)
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleChangeView = (value : 'graph' | 'table')=>{
    dispatch(updateCapitalView(value))
    setItemsPerPage(value === 'table' ? 10 : 6)
  }

  const indianStates = [
    "andhra pradesh",
    "arunachal pradesh",
    "andaman and nicobar islands",
    "assam",
    "bihar",
    "chandigarh",
    "goa",
    "delhi",
    "dadra & nagar haveli",
    "haryana",
    "jharkhand",
    "karnataka",
    "kerala",
    "daman and diu",
    "madhya Pradesh",
    "maharashtra",
    "manipur",
    "meghalaya",
    "mizoram",
    "nagaland",
    "punjab",
    "rajasthan",
    "sikkim",
    "tamil nadu",
    "telangana",
    "tripura",
   ];


  //   fetching company datas from api 
  useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);

      const baseUrl = import.meta.env.VITE_API_URL;
      let url = `${baseUrl}&limit=50`;

      if (selectedState) {
        url = `${baseUrl}&limit=50&filters%5BCompanyStateCode%5D=${selectedState}`;
      }
      
      const response = await fetch(url);
      const result = await response.json();
      setCompanyData(result.records || []);
      setCurrentPage(1); 

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [selectedState]);


  console.log('ccc',[...new Set(companyData.map(c=>c.CompanyStateCode))]);
   
  return (
    <div className=' flex flex-col overflow-hidden'>
        <Navbar/>   
        <div className="flex-1 flex flex-col overflow-hidden">
            <div className='px-10 md:px-14 lg:px-20  py-4 flex justify-between'>
                <div>
                    <h1 className='text-xl font-medium text-primary'>Registrars of Companies - {capitalView === 'graph'? 'Graph View' : 'Table View'} </h1>
                </div>
                <div className='flex items-center gap-10'>
                    <div className='flex items-center gap-4'>
                        <h1 className='text-secondary'>Filter by:</h1>
                        <select
                            onChange={(e)=> setSelectedState(e.target.value)}
                            className='border  py-1.5 text-center  text-secondary rounded-lg border-border-primary' >
                            <option value="">State</option>
                            {indianStates.map((state, index) => (
                                <option key={index} value={state}>{state}</option>
                            ))}
                        </select>
                    </div>

                    {/* Toggle */}
                    <div className='flex rounded-lg items-center overflow-hidden border border-gray-300'>
                        <button
                            onClick={() => handleChangeView('graph')}
                            className={`px-8 py-1.5 text-sm ${
                                capitalView === 'graph'
                                    ? 'bg-bg-primary text-white'
                                    : 'bg-gray-100 text-secondary'
                            }`}  >
                            Graph
                        </button>
                        <button
                            onClick={() => handleChangeView('table')}
                            className={`px-8 py-1.5 text-sm ${
                                capitalView === 'table'
                                    ? 'bg-bg-primary text-white'
                                    : 'bg-gray-100 text-secondary'
                            }`}  >
                            Table
                        </button>
                    </div>
                </div>

                
            </div>
            <div className='text-secondary px-10  md:px-14  lg:px-20 text-sm'>
                <h6 >Visualize key insights from company registration data, including capital distribution, company status, and registration trends over time. The graphs help you quickly understand overall patterns across construction-related businesses.The graphs help you quickly understand overall patterns across construction-related businesses.</h6>
            </div>
            {/* conditionally rendering graphs and table */}
           <div>
            {capitalView === 'graph' ? (
                <GraphView companyData={currentItems} loading={loading} />
                ) : (
                <TableView companyData={currentItems} loading={loading} />
            )}

           </div>
           {/* pagination block */}
           <div className="flex justify-center gap-2 ">
            {pageNumbers.map((number) => (
                <button key={number} onClick={() => setCurrentPage(number)} className={`px-3 py-1 rounded ${
                    currentPage === number ? 'bg-bg-primary text-white' : 'bg-gray-200 text-gray-700'
                }`}
                >
                {number}
                </button>
            ))}
            </div>
        </div>
    </div>
  )
}

export default index
