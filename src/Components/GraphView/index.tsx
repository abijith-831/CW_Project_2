import React from "react";
import LabelsAboveBars from "../Graph";
import SkeletonLoaderGraph from "../SkeletonLoader";

interface GraphViewProps {
  companyData: any[];
  loading: boolean;
}

const GraphView: React.FC<GraphViewProps> = ({ companyData, loading }) => {
  return (
    <div className="px-10 md:px-14 lg:px-20 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-4">

       
        {loading &&
          [...Array(6)].map((_, index) => (
            <div key={index} className="w-[450px]  md:w-full mx-auto">
              <SkeletonLoaderGraph />
            </div>
        ))}
        
        {!loading &&
          companyData?.map((company, index) => (
            <div key={index} className="w-[450px] md:w-full mx-auto">
              <LabelsAboveBars company={company} />
            </div>
          ))}

      </div>
    </div>
  );
};

export default GraphView;


