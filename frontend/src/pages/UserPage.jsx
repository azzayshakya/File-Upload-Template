import React from 'react';

const UserPage = () => {
  const users = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'User', status: 'Inactive' },
    { id: 3, name: 'David Johnson', email: 'david.johnson@example.com', role: 'User', status: 'Active' },
  ];

  return (
    <div className="">
      <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Email</th>
            <th className="py-2 px-4 text-left">Role</th>
            <th className="py-2 px-4 text-left">Status</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="border-b">
              <td className="py-2 px-4">{user.name}</td>
              <td className="py-2 px-4">{user.email}</td>
              <td className="py-2 px-4">{user.role}</td>
              <td className="py-2 px-4">{user.status}</td>
              <td className="py-2 px-4">
                <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700">Edit</button>
                <button className="bg-red-500 text-white py-1 px-3 ml-2 rounded hover:bg-red-700">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserPage;
