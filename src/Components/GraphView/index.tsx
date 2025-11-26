import React from "react";
import LabelsAboveBars from "../Graph";
import SkeletonLoaderGraph from "../SkeletonLoader";

interface GraphViewProps {
  companyData: any[];
  loading: boolean;
}

const GraphView: React.FC<GraphViewProps & { onCompanyClick: (company: any) => void }> = ({
  companyData,
  loading,
  onCompanyClick
}) => {
  return (
    <div className=" md:px-14 lg:px-20 py-4 bg-white dark:bg-gray-400">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 2xl:grid-cols-3  gap-x-12 gap-y-4">
       
        {loading &&
          [...Array(6)].map((_, index) => (
            <div key={index} className="w-[450px]  md:w-full mx-auto">
              <SkeletonLoaderGraph />
            </div>
        ))}
        
        {!loading &&
          companyData?.map((company, index) => (
            <div onClick={()=> onCompanyClick(company)} key={index} className="w-[350px]  sm:w-[350px] md:w-[350px] lg:w-[400px] xl:w-[500px] cursor-pointer mx-auto">
              <LabelsAboveBars company={company} />
            </div>
          ))}

      </div>
    </div>
  );
};

export default GraphView;


