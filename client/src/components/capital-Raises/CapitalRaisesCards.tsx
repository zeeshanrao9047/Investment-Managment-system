import React from 'react'
import capimg from "../../../public/assets/capital-raises-cards-img.png"




interface CapitalCardProps {
  title: string
  fund: string
}

const CapitaCards: React.FC<CapitalCardProps> = ({ title, fund}) => {
  return (
    <div>
          <div className="capital-rases-cards flex items-start gap-3 sm:gap-5 shadow-custom p-2 sm:p-3 rounded-sm h-full">
              <div className="raises-logo-sec">
                  <img className="w-[85px] sm:w-[110px] h-[60px] sm:h-[85px] mx-auto rounded-md" src={capimg} alt="" />
              </div>
              <div className="w-full">
                  <div className='mb-3'>
                      <h6 className="text-sm text-gray-400 uppercase">Closed</h6>
                      <h3 className="font-bold">{title}</h3>
                  </div>
                  <div>
                      <div className="text-base font-medium dark:text-white"><h4 className="text-gray-400 leading-5">{fund}</h4></div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                          <div className="bg-[#dcdcde] h-2.5 rounded-full" ></div>
                      </div>
                  </div>
              </div>
          </div>
    </div>
  )
}

export default CapitaCards
