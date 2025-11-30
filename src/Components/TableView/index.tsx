import { getCoreRowModel, useReactTable, flexRender, getSortedRowModel } from '@tanstack/react-table';
import React, { useState } from 'react'
import './styles.css'
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";
import TagMultiSelectPage from './TagMultiSelect';
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

interface TableViewProps{
  companyData:CompanyDataProps[]
  loading:boolean;
  onCompanyClick?:(company:CompanyDataProps)=>void
}


const TableView: React.FC<TableViewProps> = ({ companyData, loading, onCompanyClick }) => {
  const [sorting, setSorting] = useState([])
  const {t} = useTranslation()
  
  const [columnVisibility, setColumnVisibility] = useState({
    CompanyName: true,
    CompanyIndustrialClassification: true,
    Registered_Office_Address: true,
    AuthorizedCapital: true,
    PaidupCapital: true,
    CompanyStatus:true,

    CIN: false,
    CompanyROCcode: false,
    CompanyRegistrationdate_date: false,
    CompanyCategory: false,
    Listingstatus: false,
    CompanyClass: false,
    CompanyStateCode: false,
    nic_code: false,
  })

  

  const columns = [
    {
      accessorKey: 'CompanyName',
      header: t("CompanyName"),
      size: 180,
      enableResizing: true,
      enableSorting: true,
      cell: (props: any) => {
        const value = props.getValue()
        return <div className="relative group w-fit">
          <p className="text-primary  dark:text-neutral-400">
            {value.length > 22 ? value.slice(0, 20) + '...' : value}
          </p>

          {value.length > 22 && (
            <span className="absolute -top-8 left-0 scale-0 group-hover:scale-100 transition-transform bg-bg-primary text-table-header text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap">
              {value}
            </span>
          )}
        </div> 
      }
    },
    {
      accessorKey: 'CompanyIndustrialClassification',
      header: t("CompanyIndustrialClassification"),
      enableSorting: false,
      size: 150,
      enableResizing: true,
      cell: (props: any) => <p>{props.getValue()}</p>
    },
    {
      accessorKey: 'Registered_Office_Address',
      header: t("Registered_Office_Address"),
      size: 300,
      enableResizing: true,
      cell: (props: any) => {
        const value = props.getValue();
        return <p>{value.length > 40 ? value.slice(0, 40) + "…" : value}</p>;
      }
    },
    {
      accessorKey: 'AuthorizedCapital',
      header: t("AuthorizedCapital"),
      enableResizing: true,
      enableSorting: true,
      cell: (props: any) => <p>{props.getValue()}</p>
    },
    {
      accessorKey: 'PaidupCapital',
      header: t("PaidupCapital"),
      enableResizing: true,
      enableSorting: true,
      cell: (props: any) => <p>{props.getValue()}</p>
    },
    {
      accessorKey: 'CompanyStatus',
      header: t("CompanyStatus"),
      enableResizing: true,
      enableSorting: true,
      cell: (props: any) => (
        <span
          className={`px-3 py-1 rounded-md text-xs font-semibold text-primary
            ${props.getValue() === "Active"
              ? "bg-[#DDEFD0] text-badge"
              : props.getValue() === "Strike Off"
                ? "bg-[#EFCBC6] text-badge"
                : "bg-blue-200 text-badge"
            }`}
        >
          {props.getValue()}
        </span>
      ),
    },
    { accessorKey: 'CIN', header: t("CIN") },
    { accessorKey: 'CompanyROCcode', header: t("CompanyROCcode") },
    { accessorKey: 'CompanyRegistrationdate_date', header: t("CompanyRegistrationdate_date") },
    { accessorKey: 'CompanyCategory', header: t("CompanyCategory") },
    { accessorKey: 'Listingstatus', header: t("Listingstatus") },
    { accessorKey: 'CompanyClass', header: t("CompanyClass") },
    { accessorKey: 'CompanyStateCode', header: t("CompanyStateCode") },
    { accessorKey: 'nic_code', header: t("nic_code") },
  ]
  
  const table = useReactTable({
    data: companyData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    columnResizeMode: "onChange",
    state: {
      sorting,
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting
  })



  return (
    <div className='px-4 md:px-10 lg:px-20 py-4 w-full'>
      <div className="flex flex-wrap items-center justify-between gap-4 py-4">
        <h1 className="text-secondary dark:text-table-header text-md md:text-lg lg:text-xl font-semibold flex-1 min-w-[250px]">
          {t("second_heading")}
        </h1>

        {/* Column Visibility Dropdown */}
        <div className="relative w-full sm:w-auto max-w-full sm:max-w-lg ">
          <TagMultiSelectPage table={table} />
        </div>
      </div>


      {/* table div */}
      <div className="table w-full text-center border border-border-primary dark:border-border-dark-primary rounded-xl overflow-hidden mt-2">
        {/* header */}
        <div className="table-header-group bg-bg-primary text-table-header">
          {table.getHeaderGroups().map(headerGroup => (
            <div className="table-row" key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <div  className="table-cell px-4 py-2.5 border-r border-border-primary last:border-r-0 border-b border-border-secondary dark:border-border-dark-primary relative select-none cursor-pointer" 
                  key={header.id}
                  style={{ width: header.getSize() }}
                  onClick={header.column.getToggleSortingHandler()} >
                  <div className="flex items-center justify-between gap-2">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getCanSort() && (
                      <>
                        {header.column.getIsSorted() === "asc" && (<ArrowUp size={16} className="text-table-header" />)}
                        {header.column.getIsSorted() === "desc" && (<ArrowDown size={16} className="text-table-header" />)}
                        {!header.column.getIsSorted() && (<ArrowUpDown size={16} className="text-border-table-header" />)}
                      </>
                    )}
                  </div>
                  {/* resizer */}
                  <div  onMouseDown={header.getResizeHandler()}  onTouchStart={header.getResizeHandler()}  className={`resizer ${header.column.getIsResizing() ? "isResizing" : ""}`}/>
                </div>
              ))}
            </div>
          ))}
        </div>
 
        {/* body */}
        <div className="table-row-group text-sm">
          {table.getRowModel().rows.map(row => (
            <div onClick={()=>onCompanyClick?.(row.original)} className="table-row hover:bg-gray-50 dark:hover:bg-neutral-700 cursor-pointer" key={row.id}>
              {row.getVisibleCells().map(cell => (
                <div className="table-cell dark:text-neutral-400 px-4 py-2.5 border-r  border-border-primary dark:border-neutral-600 last:border-r-0 border-b border-border-secondary relative overflow-visible">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TableView