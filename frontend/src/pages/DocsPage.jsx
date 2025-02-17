import React from 'react';

const DocsPage = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Admin Dashboard Documentation</h2>
      <section>
        <h3 className="text-xl font-semibold">Introduction</h3>
        <p className="mb-4">
          Welcome to the Admin Dashboard. This page provides you with all the necessary instructions to manage users, view documents, and oversee the system's operations.
        </p>
      </section>

      <section className="mt-6">
        <h3 className="text-xl font-semibold">Managing Users</h3>
        <p className="mb-4">
          The "Users" page allows you to manage the users registered in the system. You can view user details, edit their information, and change their status (active/inactive).
        </p>
        <ul className="list-disc pl-5 mb-4">
          <li>Edit user details like name, email, and role.</li>
          <li>Activate or deactivate user accounts.</li>
          <li>Delete user accounts if necessary.</li>
        </ul>
      </section>

      <section className="mt-6">
        <h3 className="text-xl font-semibold">Documentation</h3>
        <p className="mb-4">
          You can also access system documentation, which outlines the features, guidelines, and best practices for managing the system.
        </p>
        <ul className="list-disc pl-5 mb-4">
          <li>Read through the system's features and capabilities.</li>
          <li>Learn how to manage team members and projects.</li>
          <li>Understand how to integrate third-party APIs and manage settings.</li>
        </ul>
      </section>

      <section className="mt-6">
        <h3 className="text-xl font-semibold">Contact Support</h3>
        <p>
          If you have any issues or questions, feel free to contact the support team by clicking on the "Support" button in the sidebar.
        </p>
      </section>
    </div>
  );
};

export default DocsPage;
