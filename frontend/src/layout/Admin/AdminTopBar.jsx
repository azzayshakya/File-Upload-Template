import React from 'react';
import { Link } from 'react-router-dom';

const AdminTopBar = () => {
  return (
    <div className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white py-4 px-6 flex justify-between items-center shadow-lg rounded-lg mt-4 mx-6 transition-all ease-in-out duration-300 w-[30%]">
      <div className="text-2xl font-semibold cursor-pointer hover:text-yellow-300 transition-all">Admin</div>
      <div className="space-x-6 hidden md:flex">
        <Link to="/admin/user" className="hover:text-yellow-300 transition-all">Users</Link>
        <Link to="/admin/docs" className="hover:text-yellow-300 transition-all">Docs</Link>
      </div>
    </div>
  );
};

export default AdminTopBar;
