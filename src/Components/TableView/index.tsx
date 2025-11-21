import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";

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


const TableView: React.FC<{ companyData: CompanyDataProps[]; loading: boolean }> = ({
  companyData,
  loading,
}) => {
  const columnHelper = createColumnHelper<CompanyDataProps>();

  const columns = [
    columnHelper.accessor("CompanyName", {
      header: "Company Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("CompanyIndustrialClassification", {
      header: "Industry",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("Registered_Office_Address", {
      header: "Registered Address",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("AuthorizedCapital", {
      header: "Authorized Capital",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("PaidupCapital", {
      header: "Paidup Capital",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("CompanyStatus", {
      header: "Status",
      cell: (info) => (
        <span
          className={`px-3 py-1 rounded-md text-xs font-medium
            ${
              info.getValue() === "Active"
                ? "bg-green-200 text-green-800"
                : info.getValue() === "Strike Off"
                ? "bg-red-200 text-red-800"
                : "bg-yellow-200 text-yellow-800"
            }`}
        >
          {info.getValue()}
        </span>
      ),
    }),
  ];

  const table = useReactTable({
    data: companyData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) return <p className="text-center py-5 text-gray-600">Loading...</p>;

  return (
    <div className="px-10 py-4 overflow-x-auto rounded-xl">
      <table className="w-full border border-gray-200 rounded-lg shadow-sm text-sm">
        <thead className="bg-gray-100 ">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-2 border-b text-center  font-semibold bg-bg-primary text-table-header"
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-2 border-b">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableView;
