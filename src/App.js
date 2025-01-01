import'./App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import RootLayout from './layout/Root';
import LabRootLayout from './layout/Lab';
import TestRootLayout from './layout/Test';
import BrunchRootLayout from './layout/Brunch';


import ErrorPage from './pages/Error';

import AuthenticationPage, { action as authAction } from './pages/Authentication';

import LabPage, { loader as labLoader} from './pages/Lab/LabDetails';
import EditLabPage from './pages/Lab/EditLab';
import  { action as manipulateLabAction } from './components/Lab/LabForm';


import EditTestPage from './pages/Test/EditTest';
import TestPage, { loader as testLoader } from './pages/Test/Test';
import TestDetailPage, { loader as testDetailLoader, action as deleteTestAction } from './pages/Test/TestDetails';
import NewTestPage from './pages/Test/NewTest';
import { action as manipulateTestAction } from './components/Test/TestForm';

import BrunchPage, { loader as brunchLoader} from './pages/Brunch/Brunch';
import BrunchDetailPage, { loader as brunchDetailLoader, action as deleteBrunchAction  } from './pages/Brunch/BrunchDetails';
import NewBrunchPage from './pages/Brunch/NewBrunch';
import BrunchEditPage from './pages/Brunch/EditBrunch';
import { action as manipulateBrunchAction } from './components/Brunch/BrunchForm';


import { action as logoutAction } from './pages/Logout';
import { checkAuthLoader, tokenLoader } from './util/auth';


const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout/>,
    errorElement: <ErrorPage />,
    id:'root',
    loader: tokenLoader,
    children: [
      { index: true, element: <AuthenticationPage />, action: authAction},
      {path: 'lab',
        element: <LabRootLayout/>, 
        loader: checkAuthLoader,
        children: [
          {index: true,element: <LabPage />,loader: labLoader },
          { path: ':labId',id:'lab-detail', element: <EditLabPage />,loader: labLoader ,action: manipulateLabAction, }//////loader need edit
          ]},  
        {
        path: 'test',
        element: <TestRootLayout />,
        loader: testLoader,
        children: [  
            { index: true,element: <TestPage />,loader: testLoader}, 
            { path: ':testId', id: 'test-detail', loader: testDetailLoader,
            children: [
                       {index: true, element: <TestDetailPage />, action:deleteTestAction,},
                       { path: 'edit', element: <EditTestPage />, action: manipulateTestAction, }
                      ]
            },
            ]
            },
          { path: 'test/new', element: <NewTestPage  />, action: manipulateTestAction },


          { path: 'brunch',
          element: <BrunchRootLayout/>,
          loader: brunchLoader,
          children: [  
              { index: true,element: <BrunchPage />,loader: brunchLoader}, 
              { path: ':brunchId', id: 'brunch-detail', loader:brunchDetailLoader,
                    children: [
                       {index: true, element: <BrunchDetailPage />, action:deleteBrunchAction,},
                       { path: 'edit', element: <BrunchEditPage />, action: manipulateBrunchAction, }
                      ]
              },
              ],
          },
          { path: 'brunch/new', element: <NewBrunchPage />, action:manipulateBrunchAction }, 
      { path: 'logout', action: logoutAction },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
