import React from 'react';

const ManageTeamPage = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Manage Team</h2>
      <p className="mb-4">Here you can manage team members, assign roles, and track their progress.</p>

      {/* Example Table or Team Management Area */}
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Role</th>
            <th className="py-2 px-4 text-left">Status</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Example Team Members */}
          <tr className="border-b">
            <td className="py-2 px-4">Alice Brown</td>
            <td className="py-2 px-4">Developer</td>
            <td className="py-2 px-4">Active</td>
            <td className="py-2 px-4">
              <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700">
                Edit
              </button>
              <button className="bg-red-500 text-white py-1 px-3 ml-2 rounded hover:bg-red-700">
                Remove
              </button>
            </td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
  );
};

export default ManageTeamPage;
