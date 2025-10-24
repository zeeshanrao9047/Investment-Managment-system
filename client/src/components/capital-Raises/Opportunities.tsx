import { useState } from 'react';
import { IoReturnDownBack } from "react-icons/io5";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { RxCross1 } from "react-icons/rx";
import { Link } from "wouter";
interface Opportunity {
  id: string;
  opportunityName: string;
  capitalRaiseState: string;
  expectedAmount: number;
  lastLogin: string;
  portalStatus: string;
  createdAt: string;
  primaryContact: string;
}

const Opportunities = () => {
  const [activeTab, setActiveTab] = useState('opportunities');
  const [selectedAction, setSelectedAction] = useState('');
  const [selectedOpportunities, setSelectedOpportunities] = useState<string[]>([]);
  const [newOpportunity, setNewOpportunity] = useState(false)
  // Mock data - replace with your actual data
  const opportunities: Opportunity[] = [
    {
      id: '1',
      opportunityName: 'Jane Webber',
      capitalRaiseState: 'Draft',
      expectedAmount: 200000.00,
      lastLogin: '-',
      portalStatus: 'Not Invited',
      createdAt: 'Jun 20 2025 09:33 PM',
      primaryContact: 'Jane'
    },
    {
      id: '2',
      opportunityName: 'John Smith',
      capitalRaiseState: 'Draft',
      expectedAmount: 75000.00,
      lastLogin: '-',
      portalStatus: 'Registered',
      createdAt: 'Dec 05 2023 01:57 PM',
      primaryContact: 'John S'
    },
    {
      id: '3',
      opportunityName: 'Michael Ballard',
      capitalRaiseState: 'Draft',
      expectedAmount: 75000.00,
      lastLogin: 'Jun 21, 2018 11:13 AM',
      portalStatus: 'Registered',
      createdAt: 'Dec 05 2023 01:57 PM',
      primaryContact: 'Michael'
    },
    {
      id: '4',
      opportunityName: 'Vilmo-Bankers Hill',
      capitalRaiseState: 'Draft',
      expectedAmount: 0,
      lastLogin: '-',
      portalStatus: 'Not Invited',
      createdAt: 'Feb 15 2022 05:51 PM',
      primaryContact: 'Vilma'
    }
  ];

  const toggleOpportunitySelection = (id: string) => {
    setSelectedOpportunities(prev =>
      prev.includes(id)
        ? prev.filter(opportunityId => opportunityId !== id)
        : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedOpportunities.length === opportunities.length) {
      setSelectedOpportunities([]);
    } else {
      setSelectedOpportunities(opportunities.map(opp => opp.id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Navigation Tabs */}


      {/* Header Section */}
      <div className="mb-6">

        {/* Opportunities Section */}
        <div className="flex items-center space-x-4 mb-4 justify-between">
          <div className="flex items-center space-x-2">

            <button className="text-blue-500 border-blue-500 border py-2 px-2 rounded-lg font-medium flex items-center gap-2">
              <IoReturnDownBack /> Back To Capital Raises
            </button>
            <button className="text-blue-500 border border-blue-500 py-2 px-2 rounded-lg font-medium flex items-center gap-2">
              <HiOutlineBuildingOffice2 /> Go To Project
            </button>

          </div>
          <div className="flex items-center gap-2">
   <select
              value={selectedAction}
              onChange={(e) => setSelectedAction(e.target.value)}
              className="px-3 py-2 border border-blue-500 rounded-md text-sm focus:outline-none text-blue-500 "
            >
              <option value="">Actions</option>
              <option value="edit">Add Tag</option>
              <option value="delete">Remove Tag</option>
              <option value="export">Email Contacts</option>
              <option value="export">Zip Executed Documents</option>
            </select>

            {/* Pipeline Button */}
            <button className="px-4 py-2 border border-blue-500 rounded-md text-sm focus:outline-none text-blue-500 ">
              Pipeline
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500">
              Grid
            </button>


              <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={() => setNewOpportunity(true)}>
            + New Opportunity
          </button>
          </div>
        </div>

        <div className="h-px bg-gray-300 my-4"></div>

        {/* Total Pipeline Value */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            TOTAL PIPELINE VALUE <span className="text-blue-600">$2,100,001.00</span>
          </h2>
          <p className="text-sm text-gray-600 mt-1">TOTAL OPPORTUNITIES</p>
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            {/* Action Dropdown */}
         
          </div>

          {/* New Opportunity Button */}
        

          {newOpportunity && (
            <div className="fixed inset-0 top-[-170px] bg-[#0000006f] flex items-center justify-center z-50">
              <div className="bg-white w-full max-w-md rounded-lg text-black">
                <div className="flex items-center justify-between px-8 py-2 border-b border-b-gray-400">
                  <p className="text-lg text-gray-700 font-light">
                    Create New Oppertunities
                  </p>
                  <RxCross1
                    className="text-gray-400 cursor-pointer text-xl"
                    onClick={() => setNewOpportunity(false)}
                  />
                </div>

                <div className="flex flex-col gap-4 px-5 py-2">
                  <div className='space-y-3'>
                    <h1>Name <span className='text-red-500'>*</span></h1>
                    <input type="text" className='w-full py-2 border border-gray-300 outline-none pl-2 rounded-lg ' placeholder='Opportunity Name' />
                  </div>
                  <div className='space-y-3'>
                    <h1>Lookup a contact...</h1>
                    <select name="" id="" className='w-full py-2 border border-gray-300 outline-none px-2 rounded-lg text-gray-500 '>
                      <option value="">Lookup a contact</option>
                    </select>
                  </div>
                  <div className='space-y-3'>
                    <h1>Expected amount</h1>
                    <div className='flex items-center rounded-lg  border border-gray-300 py-2 ' >
                      <p className='text-xl px-2 text-gray-400 border-r'>$</p>
                      <input type="number" className='w-full  outline-none pl-2 ' placeholder='Opportunity Name' />
                    </div>
                  </div>
                </div>

                <div className="py-6 flex justify-end gap-5 px-8">
                  <button
                    className="border border-gray-400 text-gray-700 hover:bg-gray-100 cursor-pointer py-2 px-4 rounded-lg transition-colors"
                    onClick={() => setNewOpportunity(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="border border-blue-500 text-white bg-blue-500 cursor-pointer hover:bg-blue-600 py-2 px-4 rounded-lg transition-colors"

                  >
                    Create Opportunity
                  </button>
                </div>
              </div>
            </div>
          )}


        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-white-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input
                  type="checkbox"
                  checked={selectedOpportunities.length === opportunities.length && opportunities.length > 0}
                  onChange={toggleSelectAll}
                  className="w-4 h-4 text-blue-600 rounded"
                />
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Opportunity Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Capital Raise State
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Expected Amount
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Login
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Portal Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created ↓
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Primary Contact
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {opportunities.map((opportunity) => (
              <tr key={opportunity.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedOpportunities.includes(opportunity.id)}
                    onChange={() => toggleOpportunitySelection(opportunity.id)}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
                 <Link href="/opportunities-detail"> {opportunity.opportunityName}</Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {opportunity.capitalRaiseState}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${opportunity.expectedAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {opportunity.lastLogin}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {opportunity.portalStatus}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {opportunity.createdAt}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {opportunity.primaryContact}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Opportunities;