import React, { useState } from "react";

// --- Types ---
interface AccordionItem {
  question: string;
  answer: string;
  icon: string;
}

interface CompanyDataProps {
  AuthorizedCapital: string;
  CIN: string;
  CompanyCategory: string;
  CompanyClass: string;
  CompanyIndianOrForeignCompany: string;
  CompanyIndustrialClassification: string;
  CompanyName: string;
  CompanyROCcode: string;
  CompanyRegistrationdate_date: string;
  CompanyStateCode: string;
  CompanyStatus: string;
  CompanySubCategory: string;
  Listingstatus: string;
  PaidupCapital: string;
  Registered_Office_Address: string;
  nic_code: string;
}

interface AccordionLastProps {
  company: CompanyDataProps;
}

interface AccordionIconProps {
  isOpen: boolean;
}

interface AccordionItemProps {
  item: AccordionItem;
  isOpen: boolean;
  onClick: () => void;
  company: CompanyDataProps;
}

const accordionData: AccordionItem[] = [
  {
    question: "Company Details",
    icon: "/logos/company.svg",
    answer: "",
  },
  {
    question: "Capital Information",
    icon: "/logos/capital.svg",
    answer: "",
  },
  {
    question: "Registration Details",
    icon: "/logos/regi.svg",
    answer: "",
  },
  {
    question: "Industry Details",
    icon: "/logos/industry.svg",
    answer: "",
  },
];

const AccordionIcon: React.FC<AccordionIconProps> = ({ isOpen }) => (
  <svg className={`w-6 h-6 text-zinc-500 dark:text-zinc-400 transition-transform duration-300 ${
      isOpen ? "rotate-180" : ""
    }`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const AccordionItem: React.FC<AccordionItemProps> = ({
  item,
  isOpen,
  onClick,
  company,
}) => {
  return (
    <div className="border-b border-zinc-200 dark:border-zinc-700 last:border-b-0">
      {/* header */}
      <button
        className="w-full flex justify-between items-center text-left py-3 md:py-4 px-5 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400 focus-visible:ring-opacity-75 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors duration-200"
        onClick={onClick}
        aria-expanded={isOpen} >
        <div className="flex items-center gap-3">
          <img src={item.icon} alt="" className="w-6 h-6" />
          <span className="text-sm font-semibold text-primary dark:text-zinc-100">
            {item.question}
          </span>
        </div>
        <AccordionIcon isOpen={isOpen} />
      </button>

      {/* content */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-screen" : "max-h-0"  }`} >
        <div className="p-5 pt-0 text-secondary dark:text-zinc-300 space-y-2">

          {/* ccompany Details */}
          {item.question === "Company Details" && (
            <>
              <div className="relative flex flex-col md:flex-row items-start md:items-start justify-between gap-6 text-[12px] md:px-4 md:text-xs lg:text-sm py-2 dark:text-table-header w-full">

                {/* LEFT COLUMN */}
                <div className="space-y-1 w-full">
                  {/* CIN */}
                  <div className="grid grid-cols-[120px_10px_1fr] items-start gap-1">
                    <strong>CIN</strong>
                    <span>-</span>
                    <span>{company.CIN}</span>
                  </div>

                  {/* Sub Category */}
                  <div className="grid grid-cols-[120px_10px_1fr] items-start gap-1">
                    <strong>Sub-Category</strong>
                    <span>-</span>
                    <span>{company.CompanySubCategory}</span>
                  </div>

                  {/* Company Name */}
                  <div className="grid grid-cols-[120px_10px_1fr] items-start gap-1 relative group">
                    <strong>Company Name</strong>
                    <span>-</span>
                    <span>
                      {company.CompanyName.length > 24
                        ? company.CompanyName.slice(0, 24) + "…"
                        : company.CompanyName}
                    </span>

                    {company.CompanyName.length > 24 && (
                      <span className="absolute -top-8 left-0 scale-0 group-hover:scale-100 transition-transform bg-bg-primary text-table-header text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap">
                        {company.CompanyName}
                      </span>
                    )}
                  </div>

                  {/* Company Class */}
                  <div className="grid grid-cols-[120px_10px_1fr] items-start gap-1">
                    <strong>Company Class</strong>
                    <span>-</span>
                    <span>{company.CompanyClass}</span>
                  </div>
                </div>


                {/* RIGHT COLUMN */}
                <div className="space-y-1 w-full">

                  {/* ROC Code */}
                  <div className="grid grid-cols-[120px_10px_1fr] items-start gap-1">
                    <strong>ROC Code</strong>
                    <span>-</span>
                    <span>{company.CompanyROCcode}</span>
                  </div>

                  {/* Category */}
                  <div className="grid grid-cols-[120px_10px_1fr] items-start gap-1">
                    <strong>Category</strong>
                    <span>-</span>
                    <span>{company.CompanyCategory}</span>
                  </div>

                  {/* Listing Status */}
                  <div className="grid grid-cols-[120px_10px_1fr] items-start gap-1">
                    <strong>Listing Status</strong>
                    <span>-</span>
                    <span>{company.Listingstatus}</span>
                  </div>

                  {/* Company Status */}
                  <div className="grid grid-cols-[120px_10px_1fr] items-start gap-1">
                    <strong>Company Status</strong>
                    <span>-</span>
                    <span className={
                      company.CompanyStatus.toLowerCase() === "active"
                        ? "text-green-600"
                        : company.CompanyStatus.toLowerCase() === "strike off"
                        ? "text-red-600"
                        : "text-blue-600"
                    }>
                      {company.CompanyStatus}
                    </span>
                  </div>

                </div>

              </div>
                
              
            </>
          )}

          {/* Capital Info */}
          {item.question === "Capital Information" && (
            <>
              <div className="relative flex flex-col md:flex-row items-start justify-between gap-4 text-[12px] md:px-4 md:text-xs lg:text-sm py-2 dark:text-table-header w-full">

                {/* LEFT COLUMN */}
                <div className="space-y-1 w-full md:w-1/2">
                  <div className="grid grid-cols-[150px_10px_1fr] items-start gap-1">
                    <strong>Authorised Capital</strong>
                    <span>-</span>
                    <span>{company.AuthorizedCapital} Rs</span>
                  </div>
                </div>

                {/* RIGHT COLUMN */}
                <div className="space-y-1 w-full md:w-1/2">
                  <div className="grid grid-cols-[150px_10px_1fr] items-start gap-1">
                    <strong>Paid up Capital</strong>
                    <span>-</span>
                    <span>{company.PaidupCapital} Rs</span>
                  </div>
                </div>

              </div>
            </>
          )}


          {/* Registration */}
          {item.question === "Registration Details" && (
            <>
              <div className="relative flex flex-col md:flex-row items-start justify-between gap-4 text-[12px] md:px-4 md:text-xs lg:text-sm py-2 dark:text-table-header w-full">

                {/* LEFT COLUMN */}
                <div className="space-y-1 w-full md:w-1/2">
                  <div className="grid grid-cols-[150px_10px_1fr] items-start gap-1">
                    <strong>Registration Date</strong>
                    <span>-</span>
                    <span>{company.CompanyRegistrationdate_date}</span>
                  </div>
                </div>

                {/* RIGHT COLUMN */}
                <div className="space-y-1 w-full md:w-1/2">
                  <div className="grid grid-cols-[150px_10px_1fr] items-start gap-1">
                    <strong>State Code</strong>
                    <span>-</span>
                    <span>{company.CompanyStateCode}</span>
                  </div>
                </div>

              </div>

              {/* Registered Address — full width */}
              <div className="mt-1 md:px-4">
                <div className="grid grid-cols-[150px_10px_1fr] items-start gap-1 text-xs md:text-sm">
                  <strong>Registered Address</strong>
                  <span>-</span>
                  <span>{company.Registered_Office_Address}</span>
                </div>
              </div>
            </>
          )}


          {/* Industry */}
          {item.question === "Industry Details" && (
            <>
              <div className="relative flex flex-col md:flex-row items-start justify-between gap-4 text-[12px] md:px-4 md:text-xs lg:text-sm py-2 dark:text-table-header w-full">

                {/* Left Column */}
                <div className="w-full md:w-1/2">
                  <div className="grid grid-cols-[170px_10px_1fr] items-start gap-1">
                    <strong>Industrial Classification</strong>
                    <span>-</span>
                    <span>{company.CompanyIndustrialClassification}</span>
                  </div>
                </div>

                {/* Right Column */}
                <div className="w-full md:w-1/2">
                  <div className="grid grid-cols-[170px_10px_1fr] items-start gap-1">
                    <strong>NIC Code</strong>
                    <span>-</span>
                    <span>{company.nic_code}</span>
                  </div>
                </div>

              </div>

              {/* Nationality (full width) */}
              <div className="mt-1 md:px-4">
                <div className="grid grid-cols-[170px_10px_1fr] items-start gap-1 text-xs md:text-sm">
                  <strong>Nationality</strong>
                  <span>-</span>
                  <span>{company.Registered_Office_Address}</span>
                </div>
              </div>
            </>
          )}


        </div>
      </div>
    </div>
  );
};

const AccordionLast: React.FC<AccordionLastProps> = ({ company }) => {
  const [openIndex, setOpenIndex] = useState<number[]>([]);

  const handleItemClick = (index: number) => {
    setOpenIndex(prev => prev.includes(index)?prev.filter(i=>i!==index): [...prev,index])
  };

  return (
    <div className="flex items-center justify-center pt-2 pb-8 mb-6 ">
      <div className="w-full max-w-3xl mx-auto bg-white dark:bg-neutral-900 rounded-2xl shadow-lg dark:shadow-zinc-900/20 border border-zinc-200 dark:border-border-dark-primary overflow-hidden">
        
        {accordionData.map((item, index) => (
          <AccordionItem
            key={index}
            item={item}
            isOpen={openIndex.includes(index)}
            onClick={() => handleItemClick(index)}
            company={company}
          />
        ))}

      </div>
    </div>
  );
};

export default AccordionLast;
