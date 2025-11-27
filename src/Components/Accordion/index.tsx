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
  <svg
    className={`w-6 h-6 text-zinc-500 dark:text-zinc-400 transition-transform duration-300 ${
      isOpen ? "rotate-180" : ""
    }`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
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
              <div className="flex items-center justify-between text-xs md:text-sm px-8 py-2 dark:text-table-header">
                <div>
                  <p><strong>CIN</strong> - {company.CIN}</p>
                  <p><strong>Sub-Category</strong> - {company.CompanySubCategory}</p>
                  <p><strong>Company Name</strong> - {company.CompanyName}</p>
                  <p><strong>Company Class</strong> - {company.CompanyClass}</p>
                </div>
                <div>
                  <p><strong>ROC Code</strong> - {company.CompanyROCcode}</p>
                  <p><strong>Category</strong> - {company.CompanyCategory}</p>
                  <p><strong>Listing Status</strong> - {company.Listingstatus}</p>
                  <p>
                    <strong>Company Status</strong> - 
                    <span className={
                        company.CompanyStatus.toLowerCase() === "active"
                          ? "text-green-600"
                          : company.CompanyStatus.toLowerCase() === "strike off"
                          ? "text-red-600"
                          : "text-blue-600"
                      } > {"  "}{company.CompanyStatus} </span>
                  </p>

                </div>
              </div>    
              
            </>
          )}

          {/* Capital Info */}
          {item.question === "Capital Information" && (
            <>
              <div className="flex items-center justify-between text-xs md:text-sm px-8 py-2">
                <p><strong>Authorized Capital</strong> - {company.AuthorizedCapital} Rs</p>
                <p><strong>Paidup Capital</strong> - {company.PaidupCapital} Rs</p>
              </div>
            </>
          )}

          {/* Registration */}
          {item.question === "Registration Details" && (
            <>
              <div className="flex items-center justify-between text-xs md:text-sm px-8 ">
                <p><strong>Registration Date</strong> - {company.CompanyRegistrationdate_date}</p>
                <p><strong>State Code</strong> - {company.CompanyStateCode}</p>
              </div>
              <p className="flex items-center justify-between text-xs md:text-sm px-8"><strong>Registered Address</strong> - {company.Registered_Office_Address}</p>
            </>
          )}

          {/* Industry */}
          {item.question === "Industry Details" && (
            <>
              <div className="flex items-center justify-between text-xs md:text-sm px-8 ">
                <p><strong>Industrial Classification</strong> - {company.CompanyIndustrialClassification}</p>
                <p><strong>NIC Code</strong> - {company.nic_code}</p>
              </div>
              <p className="flex items-center justify-between text-xs md:text-sm px-8 "><strong>Indian/Foreign</strong> -Indian</p>
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
