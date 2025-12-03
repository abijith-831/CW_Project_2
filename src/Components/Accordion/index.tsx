import React, { useState } from "react";
import { useTranslation } from 'react-i18next';

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

interface AccordionProps {
  company: CompanyDataProps;
}

const Accordion: React.FC<AccordionProps> = ({ company }) => {
  const [openIndex, setOpenIndex] = useState<number[]>([]);
  const { t } = useTranslation("details");

  const accordionData = [
    {
      question: t("company_details"),
      icon: "/logos/company.svg",
    },
    {
      question: t("capital_info"),
      icon: "/logos/capital.svg",
    },
    {
      question: t("reg_details"),
      icon: "/logos/regi.svg",
    },
    {
      question: t("industry_details"),
      icon: "/logos/industry.svg",
    },
  ];

  const handleItemClick = (index: number) => {
    setOpenIndex((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const renderContent = (question: string) => {
    switch (question) {
      case t("company_details"):
        return (
          <div className="relative flex flex-col md:flex-row items-start md:items-start justify-between gap-6 text-[12px] md:px-4 md:text-xs lg:text-sm py-2 dark:text-table-header w-full">
            {/* LEFT COLUMN */}
            <div className="space-y-1 w-full">
              <div className="grid grid-cols-[120px_10px_1fr] items-start gap-1">
                <strong>{t("CIN")}</strong>
                <span>-</span>
                <span>{company.CIN}</span>
              </div>

              <div className="grid grid-cols-[120px_10px_1fr] items-start gap-1">
                <strong>{t("CompanyCategory")}</strong>
                <span>-</span>
                <span>{company.CompanySubCategory}</span>
              </div>

              <div className="grid grid-cols-[120px_10px_1fr] items-start gap-1 relative group">
                <strong>{t("CompanyName")}</strong>
                <span>-</span>
                <span>
                  {company.CompanyName.length > 24
                    ? company.CompanyName.slice(0, 24) + "…"
                    : company.CompanyName}
                </span>
                {company.CompanyName.length > 24 && (
                  <span className="absolute -top-8 left-0 scale-0 group-hover:scale-100 transition-transform bg-bg-primary text-table-header text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap z-10">
                    {company.CompanyName}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-[120px_10px_1fr] items-start gap-1">
                <strong>{t("CompanyClass")}</strong>
                <span>-</span>
                <span>{company.CompanyClass}</span>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-1 w-full">
              <div className="grid grid-cols-[120px_10px_1fr] items-start gap-1">
                <strong>{t("CompanyROCcode")}</strong>
                <span>-</span>
                <span>{company.CompanyROCcode}</span>
              </div>

              <div className="grid grid-cols-[120px_10px_1fr] items-start gap-1">
                <strong>{t("CompanyCategory")}</strong>
                <span>-</span>
                <span>{company.CompanyCategory}</span>
              </div>

              <div className="grid grid-cols-[120px_10px_1fr] items-start gap-1">
                <strong>{t("Listingstatus")}</strong>
                <span>-</span>
                <span>{company.Listingstatus}</span>
              </div>

              <div className="grid grid-cols-[120px_10px_1fr] items-start gap-1">
                <strong>{t("CompanyStatus")}</strong>
                <span>-</span>
                <span
                  className={
                    company.CompanyStatus.toLowerCase() === "active"
                      ? "text-green-600"
                      : company.CompanyStatus.toLowerCase() === "strike off"
                      ? "text-red-600"
                      : "text-blue-600"
                  }
                >
                  {company.CompanyStatus}
                </span>
              </div>
            </div>
          </div>
        );

      case t("capital_info"):
        return (
          <div className="relative flex flex-col md:flex-row items-start justify-between gap-4 text-[12px] md:px-4 md:text-xs lg:text-sm py-2 dark:text-table-header w-full">
            <div className="space-y-1 w-full md:w-1/2">
              <div className="grid grid-cols-[150px_10px_1fr] items-start gap-1">
                <strong>{t("AuthorizedCapital")}</strong>
                <span>-</span>
                <span>{company.AuthorizedCapital} Rs</span>
              </div>
            </div>

            <div className="space-y-1 w-full md:w-1/2">
              <div className="grid grid-cols-[150px_10px_1fr] items-start gap-1">
                <strong>{t("PaidupCapital")}</strong>
                <span>-</span>
                <span>{company.PaidupCapital} Rs</span>
              </div>
            </div>
          </div>
        );

      case t("reg_details"):
        return (
          <>
            <div className="relative flex flex-col md:flex-row items-start justify-between gap-4 text-[12px] md:px-4 md:text-xs lg:text-sm py-2 dark:text-table-header w-full">
              <div className="space-y-1 w-full md:w-1/2">
                <div className="grid grid-cols-[150px_10px_1fr] items-start gap-1">
                  <strong>{t("CompanyRegistrationdate_date")}</strong>
                  <span>-</span>
                  <span>{company.CompanyRegistrationdate_date}</span>
                </div>
              </div>

              <div className="space-y-1 w-full md:w-1/2">
                <div className="grid grid-cols-[150px_10px_1fr] items-start gap-1">
                  <strong>{t("CompanyStateCode")}</strong>
                  <span>-</span>
                  <span>{company.CompanyStateCode}</span>
                </div>
              </div>
            </div>

            <div className="mt-1 md:px-4">
              <div className="grid grid-cols-[150px_10px_1fr] items-start gap-1 text-[12px]  md:text-xs lg:text-sm">
                <strong>{t("Registered_Office_Address")}</strong>
                <span>-</span>
                <span>{company.Registered_Office_Address}</span>
              </div>
            </div>
          </>
        );

      case t("industry_details"):
        return (
          <>
            <div className="relative flex flex-col md:flex-row items-start justify-between gap-4 text-[12px] md:px-4 md:text-xs lg:text-sm py-2 dark:text-table-header w-full">
              <div className="w-full md:w-1/2">
                <div className="grid grid-cols-[170px_10px_1fr] items-start gap-1">
                  <strong>{t("CompanyIndustrialClassification")}</strong>
                  <span>-</span>
                  <span>{company.CompanyIndustrialClassification}</span>
                </div>
              </div>

              <div className="w-full md:w-1/2">
                <div className="grid grid-cols-[170px_10px_1fr] items-start gap-1">
                  <strong>{t("nic_code")}</strong>
                  <span>-</span>
                  <span>{company.nic_code}</span>
                </div>
              </div>
            </div>

            <div className="mt-1 md:px-4">
              <div className="grid grid-cols-[170px_10px_1fr] items-start gap-1 text-[12px]  md:text-xs lg:text-sm">
                <strong>{t("Listingstatus")}</strong>
                <span>-</span>
                <span>{company.CompanyIndianOrForeignCompany}</span>
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-center pt-2 pb-8 mb-6">
      <div className="w-full max-w-3xl mx-auto bg-white dark:bg-neutral-900 rounded-2xl shadow-lg dark:shadow-zinc-900/20 border border-zinc-200 dark:border-border-dark-primary overflow-hidden">
        {accordionData.map((item, index) => {
          const isOpen = openIndex.includes(index);

          return (
            <div
              key={index}
              className="border-b border-zinc-200 dark:border-zinc-700 last:border-b-0"
            >
              {/* Header */}
              <button
                className="w-full flex justify-between items-center text-left py-3 md:py-4 px-5 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400 focus-visible:ring-opacity-75 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors duration-200"
                onClick={() => handleItemClick(index)}
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3">
                  <img src={item.icon} alt="" className="w-6 h-6" />
                  <span className="text-sm font-semibold text-primary dark:text-zinc-100">
                    {item.question}
                  </span>
                </div>

                {/* Arrow Icon */}
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
              </button>

              {/* Content */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen ? "max-h-screen" : "max-h-0"
                }`}
              >
                <div className="p-5 pt-0 text-secondary dark:text-zinc-300 space-y-2">
                  {renderContent(item.question)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Accordion;