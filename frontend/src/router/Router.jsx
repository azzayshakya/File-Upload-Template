import { createBrowserRouter, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import AdminLayout from '../layout/Admin/AdminLayout';
import UserPage from '../pages/UserPage';
import DocsPage from '../pages/DocsPage';
import CeoLayout from '../layout/Ceo/CeoLayout';
import ManageTeamPage from '../pages/ManageTeamPage';
import CompanyOverviewPage from '../pages/CompanyOverviewPage';
import {ErrorPage} from '../pages/common/ErrorPage';
import {NotFoundPage} from '../pages/common/NotFoundPage'; 
import RedirectPage from '../pages/common/RedirectPage';
import HomeUILayout from '../layout/Home/HomeLayout';

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <HomeUILayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path:"/",
          element:<Navigate to="/home"/>
        },
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "admin",
          element: <AdminLayout />,
          children: [
            // {path:"/admin", element:<Navigate to="/admin/user"/>}
            { path: "user", element: <UserPage /> },
            { path: "docs", element: <DocsPage /> },
            
          ],
        },
        {
          path: "ceo",
          element: <CeoLayout />,
          children: [
            { path: "manage-team", element: <ManageTeamPage /> },
            { path: "company-overview", element: <CompanyOverviewPage /> },
          ],
        },
        {
          path: "*",
          element: <NotFoundPage />,
        },
        {
          path: "/redirect",
          element: <RedirectPage />,
          errorElement: <ErrorPage />,
        },
      ],
    },
  ],
  // { basename: import.meta.env.BASE_URL } 
);

export default router;
