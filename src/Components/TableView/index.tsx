import { Box } from '@mui/material';
import { getCoreRowModel, useReactTable ,flexRender } from '@tanstack/react-table';
import React from 'react'


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


const TableView:React.FC<{ companyData:CompanyDataProps[] ; loading:boolean}> = ({companyData , loading}) => {

  // const columns = [
  //   columnHelper.accessor("CompanyName", {
  //     header: "Company Name",
  //     size: 250,
  //     cell: (info) => {
  //       const value = info.getValue();
  //       return (
  //         <span className="text-primary font-medium">
  //           {value.length > 25 ? value.slice(0, 25) + "…" : value}
  //         </span>
  //       );
  //     },
  //   }),
  //   columnHelper.accessor("CompanyIndustrialClassification", {
  //     header: "Industry",
  //     size: 170,
  //     cell: (info) => info.getValue(),
  //   }),
  //   columnHelper.accessor("Registered_Office_Address", {
  //     header: "Registered Address",
  //     size: 260,
  //     cell: (info) => {
  //       const value = info.getValue();
  //       return value.length > 40 ? value.slice(0, 40) + "…" : value;
  //     },
  //   }),
  //   columnHelper.accessor("AuthorizedCapital", {
  //     header: "Authorized Capital",
  //     size: 160,
  //     cell: (info) => info.getValue(),
  //   }),
  //   columnHelper.accessor("PaidupCapital", {
  //     header: "Paidup Capital",
  //     size: 140,
  //     cell: (info) => info.getValue(),
  //   }),
  //   columnHelper.accessor("CompanyStatus", {
  //     header: "Status",
  //     size: 120,
  //     cell: (info) => (
  //       <span
  //         className={`px-3 py-1 rounded-md text-xs font-semibold
  //           ${
  //             info.getValue() === "Active"
  //               ? "bg-green-200 text-green-700"
  //               : info.getValue() === "Strike Off"
  //               ? "bg-red-200 text-red-700"
  //               : "bg-yellow-200 text-yellow-700"
  //           }`}
  //       >
  //         {info.getValue()}
  //       </span>
  //     ),
  //   }),
  // ];
  
  const columns = [
    {
      accessorKey : 'CompanyName',
      header : 'Company Name',
      cell:(props:any)=> <p>{props.getValue()}</p>
    },
    {
      accessorKey : 'CompanyIndustrialClassification',
      header : 'Industry',
      cell:(props:any)=> <p>{props.getValue()}</p>
    },
    {
      accessorKey: 'Registered_Office_Address',
      header: 'Registered Address',
      cell: (props: any) => {
        const value = props.getValue();   // extract value first
        return <p>{value.length > 40 ? value.slice(0, 40) + "…" : value}</p>;
      }
    },
    {
      accessorKey : 'AuthorizedCapital',
      header : 'Authorized Capital',
      cell:(props:any)=> <p>{props.getValue()}</p>
    },
    {
      accessorKey : 'PaidupCapital',
      header : 'Paidup Capital',
      cell:(props:any)=> <p>{props.getValue()}</p>
    },
    {
      accessorKey : 'CompanyStatus',
      header : 'Status',
      cell: (props:any) => (
        <span
          className={`px-3 py-1 rounded-md text-xs font-semibold
            ${
              props.getValue() === "Active"
                ? "bg-green-200 text-green-700"
                : props.getValue() === "Strike Off"
                ? "bg-red-200 text-red-700"
                : "bg-yellow-200 text-yellow-700"
            }`}
        >
          {props.getValue()}
        </span>
      ),
    }
  ]

  const table = useReactTable({
    data:companyData,
    columns,
    getCoreRowModel:getCoreRowModel()
  })

  console.log('adada',table.getHeaderGroups());
  return (
    <div className='px-10 py-4'>
      {/* header div */}
      <div className='flex items-center justify-between py-4'>
        <h1 className='text-secondary text-xl'>Registrars of Companies (RoC)-wise Company Master Data</h1>
        <h1 className='border px-12 py-2 border-border-secondary rounded-md text-secondary'>select columns ...</h1>
      </div>
    

      {/* table div */}
      <div className="table w-full text-center  border border-border-primary rounded-xl overflow-hidden">

        {/* HEADER */}
        <div className="table-header-group  bg-bg-primary text-table-header ">
          {table.getHeaderGroups().map(headerGroup => (
            <div className="table-row" key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <div
                  className="table-cell px-4 py-2 
            border-r border-border-primary last:border-r-0 
            border-b border-border-secondary"
                  key={header.id}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* BODY */}
        <div className="table-row-group text-sm ">
          {table.getRowModel().rows.map(row => (
            <div className="table-row hover:bg-gray-50" key={row.id}>
              {row.getVisibleCells().map(cell => (
                <div className="table-cell px-4 py-3 
            border-r border-border-primary last:border-r-0 
            border-b border-border-secondary" key={cell.id}>
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
