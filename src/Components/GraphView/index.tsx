import React from 'react'
import SingleGraph from '../Graph'
import LabelsAboveBars from '../Graph'

interface GraphViewProps {
  companyData:any[];
  loading : boolean
}

const GraphView: React.FC<GraphViewProps> = ({ companyData, loading }) => {

  return (
    <div className='px-10 md:px-14 lg:px-20 py-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-4'>
        
        {companyData && (
          companyData.map((company , index)=>(
            <div className="w-[450px] md:w-full mx-auto"><LabelsAboveBars company={company}/></div>
          ))
        )}
      </div>
    </div>
  );
};

export default GraphView;


