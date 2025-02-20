import { createBrowserRouter, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import {ErrorPage} from '../pages/common/ErrorPage';
import {NotFoundPage} from '../pages/common/NotFoundPage'; 
import RedirectPage from '../pages/common/RedirectPage';
import HomeUILayout from '../layout/Home/HomeLayout';
import SingleFileUpload from '@/pages/SingleFileUpload';
import MultipleFileUpload from '../pages/MultipleFileUpload';

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
          path: "/SingleFileUpload",
          element: <SingleFileUpload />,
        },
        {
          path: "/MultipleFileUpload",
          element: <MultipleFileUpload />,
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
);

export default router;
