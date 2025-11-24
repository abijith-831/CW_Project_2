import { Box, Icon } from '@mui/material';
import { getCoreRowModel, useReactTable, flexRender, getSortedRowModel } from '@tanstack/react-table';
import React, { useState } from 'react'
import './styles.css'
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";

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
  const [columnVisibility, setColumnVisibility] = useState({})
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

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
              ? "bg-green-200 text-badge"
              : props.getValue() === "Strike Off"
                ? "bg-red-200 text-badge"
                : "bg-blue-200 text-badge"
            }`}
        >
          {props.getValue()}
        </span>
      ),
    }
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
    <div className='px-20 py-4'>
      <div className='flex items-center justify-between py-4'>
        <h1 className='text-secondary text-xl'>Registrars of Companies (RoC)-wise Company Master Data</h1>
        
        {/* Column Visibility Dropdown */}
        <div className="relative">
          <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className='border px-12 py-2 border-border-secondary rounded-md text-secondary bg-white'>
            Select Columns...
          </button>
          
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-border-secondary rounded-md shadow-lg z-10">
              <div className="p-2">
                {table.getAllColumns()
                  .filter(column => column.getCanHide())
                  .map((column) => (
                    <label  key={column.id}  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded cursor-pointer">
                      <input type="checkbox" checked={column.getIsVisible()} onChange={column.getToggleVisibilityHandler()} className="cursor-pointer"/>
                      <span className="text-sm text-secondary">
                        {typeof column.columnDef.header === 'string'  ? column.columnDef.header  : column.id}
                      </span>
                    </label>
                  ))}
              </div>
            </div>
          )}
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