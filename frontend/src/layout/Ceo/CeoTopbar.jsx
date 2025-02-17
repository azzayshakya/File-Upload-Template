import React from 'react';
import { Link } from 'react-router-dom';

const CeoTopBar = () => {
  return (
    <div className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white py-4 px-8 flex justify-between items-center shadow-lg rounded-lg mt-4 mx-6 transition-all ease-in-out duration-300 w-[50%]">
      <div className="text-2xl font-semibold cursor-pointer hover:text-yellow-300 transition-all">
        CEO 
      </div>
      <div className="space-x-6 hidden md:flex">
        <Link to="/ceo/manage-team" className="hover:text-yellow-300 transition-all">
          Manage Team
        </Link>
        <Link to="/ceo/company-overview" className="hover:text-yellow-300 transition-all">
          Company Overview
        </Link>
      </div>
    </div>
  );
};

export default CeoTopBar;

