import React from 'react';

const CompanyOverviewPage = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Company Overview</h2>
      <p className="mb-4">Here you can view important statistics and insights about the company.</p>

      <div className="bg-white p-6 shadow-md rounded-lg">
        <h3 className="text-xl font-semibold mb-2">Company Stats</h3>
        <ul className="space-y-2">
          <li>Total Employees: 120</li>
          <li>Projects Completed: 200</li>
          <li>Revenue: $5M</li>
          <li>Departments: HR, Engineering, Sales</li>
        </ul>
      </div>
    </div>
  );
};

export default CompanyOverviewPage;
