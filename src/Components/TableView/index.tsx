import { Box, Icon } from '@mui/material';
import { getCoreRowModel, useReactTable, flexRender, getSortedRowModel } from '@tanstack/react-table';
import React, { useState } from 'react'
import './styles.css'
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";
import TagMultiSelectPage from './TagMultiSelect';

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



const TableView: React.FC<{ companyData: CompanyDataProps[]; loading: boolean }> = ({ companyData, loading }) => {
  const [sorting, setSorting] = useState([])
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
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
      header: 'Company Name',
      size: 180,
      enableResizing: true,
      enableSorting: true,
      cell: (props: any) => {
        const value = props.getValue()
        return <p>{value.length > 22 ? value.slice(0, 20) + '...' : value}</p>
      }
    },
    {
      accessorKey: 'CompanyIndustrialClassification',
      header: 'Industry',
      enableSorting: false,
      size: 150,
      enableResizing: true,
      cell: (props: any) => <p>{props.getValue()}</p>
    },
    {
      accessorKey: 'Registered_Office_Address',
      header: 'Registered Address',
      size: 300,
      enableResizing: true,
      cell: (props: any) => {
        const value = props.getValue();
        return <p>{value.length > 40 ? value.slice(0, 40) + "…" : value}</p>;
      }
    },
    {
      accessorKey: 'AuthorizedCapital',
      header: 'Authorized Capital',
      enableResizing: true,
      enableSorting: true,
      cell: (props: any) => <p>{props.getValue()}</p>
    },
    {
      accessorKey: 'PaidupCapital',
      header: 'Paidup Capital',
      enableResizing: true,
      enableSorting: true,
      cell: (props: any) => <p>{props.getValue()}</p>
    },
    {
      accessorKey: 'CompanyStatus',
      header: 'Status',
      enableResizing: true,
      enableSorting: false,
      cell: (props: any) => (
        <span
          className={`px-3 py-1 rounded-md text-xs font-semibold
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
    { accessorKey: 'CIN', header: 'CIN' },
    { accessorKey: 'CompanyROCcode', header: 'ROC Code' },
    { accessorKey: 'CompanyRegistrationdate_date', header: 'Registration Date' },
    { accessorKey: 'CompanyCategory', header: 'Category' },
    { accessorKey: 'Listingstatus', header: 'Listing Status' },
    { accessorKey: 'CompanyClass', header: 'Class' },
    { accessorKey: 'CompanyStateCode', header: 'State Code' },
    { accessorKey: 'nic_code', header: 'NIC Code' },
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
    <div className='px-20 py-4 w-full'>
      <div className="flex flex-wrap items-center justify-between gap-4 py-4">
        <h1 className="text-secondary text-lg sm:text-xl font-semibold flex-1 min-w-[250px]">
          Registrars of Companies (RoC)-wise Company Master Data
        </h1>

        {/* Column Visibility Dropdown */}
        <div className="relative w-full sm:w-auto max-w-full sm:max-w-lg">
          <TagMultiSelectPage table={table} />
        </div>
      </div>


      {/* table div */}
      <div className="table w-full text-center border border-border-primary rounded-xl overflow-hidden">
        {/* header */}
        <div className="table-header-group bg-bg-primary text-table-header">
          {table.getHeaderGroups().map(headerGroup => (
            <div className="table-row" key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <div  className="table-cell px-4 py-3 border-r border-border-primary last:border-r-0 border-b border-border-secondary relative select-none cursor-pointer" 
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
            <div className="table-row hover:bg-gray-50" key={row.id}>
              {row.getVisibleCells().map(cell => (
                <div   className="table-cell px-4 py-3 border-r border-border-primary last:border-r-0 border-b border-border-secondary relative"   key={cell.id} style={{ width: cell.column.getSize() }} >
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