import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import RootLayout from './layout/Root';
import LabRootLayout from './layout/Lab';
import AdsRootLayout from './layout/Ads';
import BrunchRootLayout from './layout/Brunch';


import ErrorPage from './pages/Error';

import AuthenticationPage, { action as authAction } from './pages/Authentication';

import LabPage, { loader as labLoader} from './pages/LabDetails';
import EditLabPage from './pages/EditLab';


import AdsEditPage from './pages/EditAds';
import AdsPage, { loader as adsLoader } from './pages/Ads';
import AdsDetailPage, { loader as adsDetailLoader, action as deleteAdsAction } from './pages/AdsDetails';
import NewAdsPage from './pages/NewAds';
import { action as manipulateAdsAction } from './components/AdsForm';

import BrunchPage, { loader as brunchLoader} from './pages/Brunch';
import BrunchDetailPage, { loader as brunchDetailLoader, action as deleteBrunchAction  } from './pages/BrunchDetails';
import NewBrunchPage from './pages/NewBrunch';
import BrunchEditPage from './pages/EditBrunch';
import { action as manipulateBrunchAction } from './components/BrunchForm';


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
      { index: true,path: 'auth', element: <AuthenticationPage />, action: authAction},
      {
        path: 'lab',
        element: <LabRootLayout/>, 
        loader: checkAuthLoader,
        children: [
          {index: true,element: <LabPage />,loader: labLoader },
          { path: ':labId',id: 'lab-detail', element: <EditLabPage />,loader: labLoader ,//////loader need edit
             children: [   
              { path: 'ads',
                element: <AdsRootLayout />,
                loader: adsLoader,
                children: [  
                  { index: true,element: <AdsPage />,loader: adsLoader}, 
                  { path: ':adsId', id: 'ads-detail', loader: adsDetailLoader,
                    children: [
                       {index: true, element: <AdsDetailPage />, action:deleteAdsAction,},
                       { path: 'edit', element: <AdsEditPage />, action: manipulateAdsAction, }
                      ]
                    },
                ],
              },
              { path: 'ads/new', element: <NewAdsPage />, action: manipulateAdsAction },
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
              
          ]
        }, 
        ],
      },
      ,
      { path: 'logout', action: logoutAction },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
