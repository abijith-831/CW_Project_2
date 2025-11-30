import GraphView from '../../Components/GraphView'
import TableView from '../../Components/TableView'
import Navbar from '../Navbar'
import { useEffect, useState } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { updateCapitalView } from '../../redux/slices/authSlice'
import { getCompanyData } from '../../api/companyData.api'
import { updateCapitalViewInDB } from '../../api/userProfile.api'
import { useTranslation } from 'react-i18next'

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
  const capitalView = useSelector((state:any)=> state.auth.currentUser?.capital_view)
  const searchQuery = useSelector((state: any) => state.auth.currentUser?.search_query);

  const [companyData , setCompanyData] = useState<any[]>([])
  const [loading , setLoading] = useState(true)

  const [currentPage , setCurrentPage ] = useState(1)
  const [itemsPerPage , setItemsPerPage] = useState(capitalView === 'table' ? 12 : 6)
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
    setItemsPerPage(value === 'table' ? 12 : 6)
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

  console.log('sele',selectedState);
  

   
  return (
    <div className=' flex flex-col min-h-screen overflow-hidden dark:bg-neutral-800 dark:text-table-header'>
        <Navbar/>   
        {/* <button onClick={goToDetails}>extra detaisls</button> */}
        <div className="flex-1 flex flex-col overflow-hidden">
            <div className={`px-5 sm:px-10 md:px-14 lg:px-20 py-4 flex flex-wrap gap-4 justify-between items-center ${ isArabic ? "flex-row-reverse text-right" : "" }`}>
                {/* Heading */}
                <h1 className="text-md rtl md:text-lg lg:text-xl font-medium text-primary dark:text-table-header flex-1">
                    {t("registrar_heading")} - {capitalView === "graph" ? t("graph_view") : t("table_view")}
                </h1>

                {/* Filter + Toggle Wrapper */}
                  <div className="flex flex-wrap items-center  gap-6 lg:gap-16">
                      {/* Filter */}
                      <div className="flex items-center gap-1 md:gap-3">
                        <h1 className="text-secondary text-sm md:text-base dark:text-table-header ">{t("filter_by")}:</h1>
                        <select value={selectedState}  onChange={(e) => setSelectedState(e.target.value)} className="border cursor-pointer py-1 md:py-1.5  text-secondary rounded-lg border-border-primary dark:border-border-dark-primary dark:text-table-header text-sm" >
                            <option value="">{t("state")}</option>
                            
                            {indianStates.map((state, index) => (
                              <option className='cursor-pointer ' key={index} value={state}>{state.charAt(0).toUpperCase() + state.slice(1)}</option>
                            ))}
                            
                        </select>
                          <div className="w-6 flex justify-center">
                            {selectedState && (
                              <button onClick={() => setSelectedState("")}
                                className="hover:text-zinc-700 dark:hover:text-black bg-bg-primary rounded-full px-1.5 opacity-50 ">  ✕  </button>
                            )}
                          </div>
                      </div>

                      {/* Toggle Buttons */}
                      <div className="flex rounded-lg items-center overflow-hidden border border-gray-300 dark:border-border-dark-primary">
                        <button onClick={() => handleChangeView("graph")} className={`px-2 sm:px-3 md:px-6 py-1 md:py-1.5 cursor-pointer text-sm ${ capitalView === "graph" ? "bg-bg-primary text-white" : "bg-gray-100 text-secondary" }`} >
                            {t("graph")}
                        </button>
                        <button onClick={() => handleChangeView("table")} className={`px-2 sm:px-3 md:px-6 py-1 md:py-1.5 cursor-pointer text-sm ${ capitalView === "table" ? "bg-bg-primary text-white" : "bg-gray-100 text-secondary"  }`} >
                            {t("table")}
                        </button>
                      </div>
                  </div>
                </div>

                {/* Description */}
               <div  className={`text-secondary px-5 sm:px-10 md:px-14 lg:px-20 text-sm leading-relaxed ${    isArabic ? "text-right" : ""  }`} >
                    <h6 className="text-sm md:text-md dark:text-table-header">
                      {t("description")}
                    </h6>
               </div>


            {/* conditionally rendering graphs and table */}
           <div >
              {capitalView === 'graph' ? (
                  <GraphView companyData={currentItems} onCompanyClick={onSelectCompany} loading={loading} />
                  ) : (
                  <TableView companyData={currentItems} onCompanyClick={onSelectCompany} loading={loading} />
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
