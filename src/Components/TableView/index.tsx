import { getCoreRowModel, useReactTable, flexRender, getSortedRowModel ,TableMeta } from '@tanstack/react-table';
import React, { useState } from 'react'
import './styles.css'
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";
import TagMultiSelectPage from './TagMultiSelect';
import { useTranslation } from 'react-i18next';
import TableSkeleton from '../SkeletonLoader/TableSkeleton';
// import { updateItemsPerPage } from '../../redux/slices/authSlice';
import { useDispatch , useSelector} from 'react-redux';
import { SortingState } from '@tanstack/react-table'

interface MyTableMeta extends TableMeta<CompanyDataProps> {
  isLoading?: boolean;
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


interface TableViewProps{
  companyData?:CompanyDataProps[]
  loading?:boolean;
  onCompanyClick?:(company:CompanyDataProps)=>void
  itemsPerPage: number; 
  onItemsPerPageChange?: (value: 10 | 15 | 20) => void
}


const TableView: React.FC<TableViewProps> = ({ companyData, loading, onCompanyClick , itemsPerPage , onItemsPerPageChange}) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const {t} = useTranslation();
  const user = useSelector((state:any) => state.auth.currentUser);
  const selectedColumns = useSelector((state:any)=>state.auth.currentUser?.selected_columns)
  const [columnVisibility, setColumnVisibility] = useState(selectedColumns)

  const selectedTagCount = Object.values(columnVisibility || {}).filter(v=>v).length

  // console.log('vvv',columnVisibility);
  

  const columns = [
    {
      accessorKey: 'CompanyName',
      header: t("CompanyName"),
      size: 180,
      enableResizing: true,
      enableSorting: true,
      cell: (props: any) => {
        const value = props.getValue();
        const column = props.column;   
        const colSize = column.getSize();

        let maxChars = 60;
        if (colSize < 60) maxChars = 15;
        else if (colSize < 200) maxChars = 20;

        return <div className="relative group w-fit">
          <p className="text-primary dark:text-neutral-400">
            {value.length > maxChars ? value.slice(0, maxChars) + '...' : value}
          </p>

          {value.length > maxChars && (
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
      cell: (props: any) => {
        const value = props.getValue();
        const column = props.column;   
        const colSize = column.getSize();

        let maxChars = 50;
        if (colSize < 90) maxChars = 20;
        else if (colSize <= 120) maxChars = 25;

        return <div className="relative group w-fit">
          <p className="text-primary dark:text-neutral-400 line-clamp-3">
            {value.length > maxChars ? value.slice(0, maxChars) + '...' : value}
          </p>

          {value.length > maxChars && (
            <span className="absolute -top-8 left-0 scale-0 group-hover:scale-100 transition-transform bg-bg-primary text-table-header text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap">
              {value}
            </span>
          )}
      </div>

      } 
    },
    {
      accessorKey: 'Registered_Office_Address',
      header: t("Registered_Office_Address"),
      size: 350,
      enableResizing: true,
      cell: (props: any) => {
        const value = props.getValue();
        const column = props.column; 
        const colSize = column.getSize();

        let maxChars = 80;
        if (colSize < 250) maxChars = 30;
        else if (colSize <= 350) maxChars = 50;

        return  <div className="relative group w-fit">
          <p className="text-primary dark:text-neutral-400 line-clamp-3">
            {value.length > maxChars ? value.slice(0, maxChars) + '...' : value}
          </p>
          {value.length > maxChars && (
            <span className="absolute -top-8 left-0 scale-0 group-hover:scale-100 transition-transform bg-bg-primary text-table-header text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap">
              {value}
            </span>
          )}
      </div>
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
      cell: (props: any) => {
        const value = props.getValue();
        const column = props.column; 
        const colSize = column.getSize();

        let maxChars = 20;
        if (colSize < 80) maxChars = 8;
        else if (colSize <= 120) maxChars = 12;
        
        return <div className="relative group w-fit items-center justify-center line-clamp-1">
            <span
              className={`px-1 md:px-3 py-1 rounded-md text-[8px] md:text-xs font-semibold text-primary 
                ${props.getValue() === "Active"
                  ? "bg-[#DDEFD0] text-badge"
                  : props.getValue() === "Strike Off"
                    ? "bg-[#EFCBC6] text-badge"
                    : "bg-blue-200 text-badge"
                }`}
            >
              {value.length > maxChars ? value.slice(0, maxChars) + '...' : value}
            </span>
            {value.length > maxChars && (
            <span className="absolute -top-8 left-0 scale-0 group-hover:scale-100 transition-transform bg-bg-primary text-table-header text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap">
              {value}
            </span>
          )}
         </div>
    },
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
  
  const table = useReactTable<CompanyDataProps>({
    data: companyData || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    columnResizeMode: "onChange",
    state: {
      sorting,
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    meta: { isLoading: loading } as MyTableMeta
  })

  // console.log('tabb',table);

  return (

    <div className='px-4 md:px-10 lg:px-20 py-4 w-full'>
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 py-4">
          {/* Heading */}
          <h1 className="text-secondary dark:text-table-header text-md md:text-lg lg:text-xl font-semibold flex-1 min-w-[250px]">
            {t("second_heading")}
          </h1>

          {/* Dropdowns container */}
          <div className="flex w-full lg:w-auto flex-row gap-4 justify-between mt-2 lg:mt-0 ">
            {/* Items per page */}
            <div className="relative inline-block border rounded-lg border-slate-300 dark:bg-neutral-600 dark:border-border-dark-primary shadow w-1/3  md:w-auto px-4 md:px-2 pt-1 space-x-4">
              <select value={itemsPerPage}  onChange={(e) =>
                  onItemsPerPageChange?.(Number(e.target.value) as 10 | 15 | 20)  }
                className="cursor-pointer md:py-1.5 pl-2 pr-10 md:pr-14 text-secondary dark:text-table-header text-xs md:text-sm w-full bg-transparent appearance-none focus:outline-none" >
                <option value={10}>10 Items</option>
                <option value={15}>15 Items</option>
                <option value={20}>20 Items</option>
              </select>

             
              {/* Dropdown Icons */}
              <img  src="/logos/down.svg"   alt=""   className="absolute right-1 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none dark:hidden" />
              <img src="/logos/dark_down.svg" alt="" className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none hidden dark:block" />
            </div>

            {/* Column Visibility Dropdown */}
            <div className="  relative ">
              <TagMultiSelectPage columns={columns} columnVisibility={columnVisibility} setColumnVisibility={setColumnVisibility}/>
            </div>
          </div>
        </div>

      {/* table div */}
      <div className="w-full overflow-x-auto">
        <div className="table  w-full text-center border border-border-primary dark:border-border-dark-primary rounded-xl overflow-hidden  mt-2">
          {/* header */}
          <div className="table-header-group bg-bg-primary text-table-header">
            {table.getHeaderGroups().map(headerGroup => (
              <div className="table-row" key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <div  className="table-cell px-2 md:px-4 py-1 pt-2  md:py-2.5 border-r border-border-primary last:border-r-0 border-b  dark:border-border-dark-primary relative select-none cursor-pointer" 
                    key={header.id}
                    style={{ width: header.getSize() }}
                    onClick={header.column.getToggleSortingHandler()} >
                    <div className="flex items-center justify-between gap-2 text-xs md:text-md lg:text-base">
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
          {/* {loading &&
              Array.from({ length: 10 }).map(() => {
                return table.getHeaderGroups().map(headerGroup => (
                  <tr {...headerGroup.headers}>
                    {headerGroup.headers.map(column => (
                      <td className='p-4' {...column.getContext()}>
                        <TableSkeleton />
                      </td>
                    ))}
                  </tr>
                ))
            })} */}
          
  
          {/* Table body */}
          <div className="table-row-group text-sm">
            {(table.options.meta as MyTableMeta)?.isLoading ? 
                Array.from({ length: 12 }).map((_, rowIndex) => (
                  <div className="table-row hover:bg-gray-50 dark:hover:bg-neutral-700 cursor-pointer" key={rowIndex}>
                    {columns.slice(0,selectedTagCount).map((col, colIndex) => (
                      <div key={colIndex}
                        className="table-cell dark:text-neutral-400 px-4 py-2.5 border-r border-border-secondary dark:border-neutral-600 last:border-r-0 border-b relative overflow-visible" >
                        <TableSkeleton />
                      </div>
                    ))}
                  </div>
                ))
                : table.getRowModel().rows.map(row => (
                  
                    <div onClick={() => onCompanyClick?.(row.original)} className="table-row hover:bg-gray-50 dark:hover:bg-neutral-700 cursor-pointer" key={row.id}>
                      {row.getVisibleCells().map(cell => {
                        // console.log('cell',cell);
                        
                        return (
                        <div key={cell.id} className="table-cell text-xs md:text-md lg:text-[13px] dark:text-neutral-400 px-2 md:px-4 py-1 md:py-2.5 border-r border-border-primary dark:border-neutral-600 last:border-r-0 border-b  relative overflow-visible">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </div> 
                      )})}
                    </div>
                  ))
              }
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableView