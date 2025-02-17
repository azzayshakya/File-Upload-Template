import React from 'react';
import { Outlet } from 'react-router-dom';
import CeoTopBar from './CeoTopBar'; 

const CeoLayout = () => {
  return (
    <div className="py-8">
      <CeoTopBar />
      <Outlet />
    </div>
  );
};

export default CeoLayout;
