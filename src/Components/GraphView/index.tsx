import React from 'react'
import SingleGraph from '../Graph'
import LabelsAboveBars from '../Graph'

const GraphView = () => {
  return (
    <div className='px-12 lg:px-32  py-4'>
      graph view akfnjknfjnafknfjsfsadadaaadadadadad

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 '>
        <div className=' border border-border-primary rounded-lg py-2'>
          <div className='flex justify-between px-6 '>
            <h1 >Company name</h1>
            <h3 className='border px-4 text-sm rounded-md  bg-green-200'>unlisted</h3>
          </div>
          <div className='pl-20'>
            <LabelsAboveBars />
          </div>
         <div className="flex flex-col gap-2">
        {/* First row */}
            <div className="flex items-center pl-20 lg:pl-30 gap-2">
              <div className="bg-bg-secondary w-4 h-4 rounded-full"></div>
              <div className="flex gap-6">
                <h2 className='text-sm'>Authorised capital</h2>
                <h2 className='text-sm'>200000.00 Rs</h2>
              </div>
            </div>

            {/* Second row */}
            <div className="flex items-center gap-2 pl-20 lg:pl-30">
              <div className="bg-bg-primary w-4 h-4 rounded-full"></div>
              <div className="flex gap-6">
                <h2 className='text-sm'>Paid-up capital</h2>
                <h2 className='text-sm pl-5'>150000.00 Rs</h2>
              </div>
            </div>
          </div>

        </div>
        <div><LabelsAboveBars /></div>
        <div><LabelsAboveBars /></div>
        <div><LabelsAboveBars /></div>
        <div><LabelsAboveBars /></div>
        <div><LabelsAboveBars /></div>
      </div>

    </div>
  )
}

export default GraphView
