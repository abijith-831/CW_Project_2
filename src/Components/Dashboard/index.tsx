import GraphView from '../../Components/GraphView'
import TableView from '../../Components/TableView'
import Navbar from '../Navbar'
import { useEffect, useState } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { updateCapitalView, updateItemsPerPage } from '../../redux/slices/authSlice'
import { getCompanyData } from '../../api/companyData.api'
import { updateCapitalViewInDB, updateItemsPerPageInDB , } from '../../api/userProfile.api'
import { useTranslation } from 'react-i18next'
import { updateSearchQuery } from '../../redux/slices/authSlice'

interface DashboardProps {
  goToDetails: () => void;
  onSelectCompany: (company: any) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ goToDetails, onSelectCompany }) => {

  const dispatch = useDispatch()
  const { t } = useTranslation();
  const {i18n} = useTranslation()
  const isArabic = i18n.language === "arb";
  
  const user = useSelector((state:any) => state.auth.currentUser);
  
  const searchQuery = useSelector((state: any) => state.auth.currentUser?.search_query);

  const [companyData , setCompanyData] = useState<any[]>([])
  const [loading , setLoading] = useState(true)

  const [currentPage , setCurrentPage ] = useState(1)
  const savedItemsPerPage = useSelector((state:any)=>state.auth.currentUser?.items_per_page)
  const graph_currentPage = useSelector((state:any)=>state.auth.currentUser?.graph_currentPage)
  const table_currentPage = useSelector((state:any)=>state.auth.currentUser?.table_currentPage)
  const [itemsPerPage , setItemsPerPage] = useState(user?.capital_view === 'table' ? savedItemsPerPage : 6)
  const [selectedState , setSelectedState] = useState('')

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage

  const filteredData = companyData.filter((item) => {
    const matchesState = selectedState ? item.CompanyStateCode?.toLowerCase() === selectedState.toLowerCase() : true;
    const matchesSearch = searchQuery
        ? item.CompanyName?.toLowerCase().includes(searchQuery.toLowerCase())
        : true;

    return matchesState && matchesSearch;
   });

  const currentItems = filteredData.slice(indexOfFirstItem,indexOfLastItem)

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleChangeView = async(value : 'graph' | 'table')=>{
    dispatch(updateCapitalView(value))
     if (user?.id) {
        await updateCapitalViewInDB(user.id, value);
      }
    setItemsPerPage(value === 'table' ? savedItemsPerPage : 6)
  }

  const indianStates = [
    "andhra pradesh",
    "assam",
    "bihar",
    "chandigarh",
    "goa",
    "delhi",
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

  useEffect(() => {
    const fetchData = async ()=>{
      try {
        setLoading(true)
        const result = await getCompanyData(selectedState)
        setCompanyData(result.records || [])
        setCurrentPage(1)
      } catch (error) {
        console.log(error);
      }finally{
        setLoading(false);
      }
    }
    fetchData();
}, [selectedState])

  const handleItemsPerPageChange = async (value: 10 | 15 | 20) => {
    setItemsPerPage(value); 
    dispatch(updateItemsPerPage(value))

    if (user?.id) {
      await updateItemsPerPageInDB(user.id, value); 
    }

    setCurrentPage(1); 
  };


  return (
    <div className=' flex flex-col min-h-screen overflow-hidden dark:bg-neutral-800 dark:text-table-header'>
        <Navbar/>   
        {/* <button onClick={goToDetails}>extra detaisls</button> */}
        <div className="flex-1 flex flex-col overflow-hidden">
              <div className={`px-5 sm:px-10 md:px-14 lg:px-20 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${ isArabic ? "flex-col-reverse md:flex-row-reverse text-right" : "" }`}>
                {/* Heading */}
                <h1 className="text-md md:text-lg lg:text-xl font-medium text-primary dark:text-table-header w-full  whitespace-nowrap overflow-hidden ">
                  {t("registrar_heading")} - {user?.capital_view === "graph" ? t("graph_view") : t("table_view")}
                </h1>

                {/* Filter + Toggle */}
                <div className="w-full flex justify-between md:justify-end items-center gap-4 md:gap-6">
                  {/* Filter */}
                  <div className="relative inline-block border rounded-lg border-slate-300 dark:bg-neutral-600 shadow dark:border-border-dark-primary w-1/2 md:w-auto px-4 md:px-6">
                    <select
                      value={selectedState}
                      onChange={(e) => setSelectedState(e.target.value)}
                      className="cursor-pointer  md:py-1.5 pl-2 pr-10 md:pr-14 text-secondary dark:text-table-header text-sm w-full bg-transparent appearance-none focus:outline-none"  >
                      <option value="">{t("state")}</option>
                      {indianStates.map((state, index) => (
                        <option key={index} value={state}>
                          {state.charAt(0).toUpperCase() + state.slice(1)}
                        </option>
                      ))}
                    </select>

                    {selectedState && (
                      <button onClick={() => setSelectedState("")} className="absolute cursor-pointer right-10 top-1/2 -translate-y-1/2 py-0.5 px-1.5 rounded-full text-xs bg-bg-primary text-table-header opacity-70 hover:opacity-100" >
                        ✕
                      </button>
                    )}

                    <img src="/logos/down.svg" alt="" className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none dark:hidden" />
                    <img src="/logos/dark_down.svg" alt="" className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none hidden dark:block" />
                  </div>

                  {/* Toggle Buttons */}
                  <div className="flex rounded-lg items-center overflow-hidden border shadow border-slate-300 dark:border-border-dark-primary  md:w-auto justify-end">
                    <button
                      onClick={() => handleChangeView("graph")}
                      className={`px-3 md:px-6 py-0.5 md:py-1.5 cursor-pointer text-sm ${
                        user?.capital_view === "graph"
                          ? "bg-bg-primary text-white"
                          : "bg-gray-100 text-secondary"
                      }`} >
                      {t("graph")}
                    </button>
                    <button
                      onClick={() => handleChangeView("table")}
                      className={`px-3 md:px-6 py-0.5 md:py-1.5 cursor-pointer text-sm ${
                        user?.capital_view === "table"
                          ? "bg-bg-primary text-white"
                          : "bg-gray-100 text-secondary"   }`}  >
                      {t("table")}
                    </button>
                  </div>
                </div>
              </div>



                {/* Description */}
               <div  className={`text-secondary px-5 sm:px-10 md:px-14 lg:px-20 text-sm leading-relaxed ${    isArabic ? "text-right" : ""  }`} >
                    <h6 className="text-xs  md:text-sm lg:text-md dark:text-table-header">
                      {t("description")}
                    </h6>
               </div>

               <div>
                {filteredData.length === 0 && searchQuery?.length > 0 ? (
                    <div className="w-full h-[60vh] flex flex-col items-center justify-center py-10 space-y-6 text-center">
                      <h2 className="text-xl font-bold text-bg-primary dark:text-table-header">
                        No results found
                      </h2>
                      <div className="flex gap-8 mt-2">
                        <button onClick={() => window.location.reload()} className="px-6 py-1.5 bg-bg-primary text-white rounded-lg shadow hover:opacity-90 transition" >
                          Refresh Page
                        </button>
                        <button onClick={() => dispatch(updateSearchQuery(""))} className="px-6 py-1.5 bg-gray-300 dark:bg-neutral-600 text-secondary dark:text-table-header rounded-lg shadow hover:opacity-80 transition"  >
                          Clear Search
                        </button>
                    </div>
                    </div>
                  ) : (
                    <div>
                      {user?.capital_view === "graph" ? (
                        <GraphView companyData={currentItems} onCompanyClick={onSelectCompany} loading={loading} />
                      ) : (
                        <TableView companyData={currentItems} onCompanyClick={onSelectCompany} loading={loading} itemsPerPage={itemsPerPage} onItemsPerPageChange={handleItemsPerPageChange}/>
                      )}
                    </div>
                  )}
               </div>

           {/* pagination block */}
           <div className="flex items-center justify-center gap-4 md:gap-6 lg:gap-8 py-4">
                {/* Prev Button */}
                <button  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}  disabled={currentPage === 1} className={`px-6 md:px-10 lg:px-12 text-sm md:text-base shadow-sm py-1 rounded-lg ${
                    currentPage === 1
                        ? "bg-gray-200 text-gray-400 dark:bg-neutral-500 cursor-not-allowed"
                        : "bg-gray-300 text-secondary hover:transition-transform hover:scale-102 duration-300  cursor-pointer"
                    }`}>
                    {t("prev")}
                </button>

                {/* Middle text */}
                <span className="text-secondary font-medium text-sm md:text-base dark:text-table-header">
                    {t("page")} {currentPage} {t("of")} {totalPages}
                </span>

                {/* Next Button */}
                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`px-6 md:px-10 lg:px-12 text-sm md:text-base shadow-sm py-1 rounded-lg ${
                    currentPage === totalPages
                        ? "bg-gray-200 text-gray-400 dark:bg-neutral-500 cursor-not-allowed"
                        : "bg-gray-300 text-secondary dark:bg-neutral-300 hover:transition-transform hover:scale-102 duration-300 cursor-pointer"
                    }`}>
                    {t("next")}
                </button>
            </div>
        </div>
    </div>
  )
}

export default Dashboard
