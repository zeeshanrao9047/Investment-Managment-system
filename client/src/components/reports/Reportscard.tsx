import React from 'react'

interface ReportscardProps {
  title: string
  description: string
}

const Reportscard: React.FC<ReportscardProps> = ({ title, description}) => {
  return (
    <div>
      <div className="reports-mini-cards shadow-custom rounded-sm p-3 sm:p-4 h-full relative">
        <h4 className="font-bold text-black">{title}</h4>
        <p className="text-sm mb-16 pb-7">{description}</p>
        <div>
          <button className="build-btn bg-blue-600 text-sm px-3 py-2 text-white font-semibol rounded-sm absolute bottom-[15px]">Build Report</button>
        </div>
      </div>
    </div>
  )
}

export default Reportscard
