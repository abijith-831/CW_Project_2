import GraphView from '../../Components/GraphView'
import TableView from '../../Components/TableView'
import Navbar from '../../layouts/Navbar'
import { useEffect, useState } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { updateCapitalView } from '../../redux/slices/authSlice'
import { getCompanyData } from '../../api/companyData.api'

const Dashboard = () => {

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

   
  return (
    <div className=' flex flex-col overflow-hidden'>
        <Navbar/>   
        <div className="flex-1 flex flex-col overflow-hidden">
            <div className="px-5 sm:px-10 md:px-14 lg:px-20 py-4 flex flex-wrap gap-4 justify-between items-center">
                {/* Heading */}
                <h1 className="text-lg md:text-xl font-medium text-primary flex-1">
                    Registrars of Companies - {capitalView === 'graph' ? 'Graph View' : 'Table View'}
                </h1>

                {/* Filter + Toggle Wrapper */}
                <div className="flex flex-wrap items-center gap-6">
                    {/* Filter */}
                    <div className="flex items-center gap-3">
                    <h1 className="text-secondary text-sm md:text-base">Filter by:</h1>
                    <select
                        onChange={(e) => setSelectedState(e.target.value)}
                        className="border py-1.5 px-3 text-secondary rounded-lg border-border-primary text-sm"
                    >
                        <option value="">State</option>
                        {indianStates.map((state, index) => (
                        <option key={index} value={state}>{state}</option>
                        ))}
                    </select>
                    </div>

                    {/* Toggle Buttons */}
                    <div className="flex rounded-lg items-center overflow-hidden border border-gray-300">
                    <button
                        onClick={() => handleChangeView("graph")}
                        className={`px-6 py-1.5 text-sm ${
                        capitalView === "graph" ? "bg-bg-primary text-white" : "bg-gray-100 text-secondary"
                        }`}
                    >
                        Graph
                    </button>
                    <button
                        onClick={() => handleChangeView("table")}
                        className={`px-6 py-1.5 text-sm ${
                        capitalView === "table" ? "bg-bg-primary text-white" : "bg-gray-100 text-secondary"
                        }`}
                    >
                        Table
                    </button>
                    </div>
                </div>
                </div>

                {/* Description */}
                <div className="text-secondary px-5 sm:px-10 md:px-14 lg:px-20 text-sm leading-relaxed">
                <h6>
                    Visualize key insights from company registration data, including capital distribution,
                    company status, and registration trends over time. The graphs help you quickly understand
                    patterns across construction-related businesses.
                </h6>
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
           <div className="flex items-center justify-center gap-8 py-3">
                {/* Prev Button */}
                <button  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}  disabled={currentPage === 1} className={`px-10 shadow-sm py-1 rounded-lg ${
                    currentPage === 1
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-gray-300 text-secondary cursor-pointer"
                    }`}
                >
                    Prev
                </button>

                {/* Middle text */}
                <span className="text-secondary font-medium text-md sm:text-base">
                    Page {currentPage} of {totalPages}
                </span>

                {/* Next Button */}
                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`px-10 py-1 rounded-lg shadow-sm ${
                    currentPage === totalPages
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-gray-300 text-secondary cursor-pointer"
                    }`}
                >
                    Next
                </button>
                </div>

        </div>
    </div>
  )
}

export default Dashboard
