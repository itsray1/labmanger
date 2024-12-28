import { Outlet } from 'react-router-dom';

import AdsNavigation from '../components/AdsNavigation';


function AdsRootLayout() {
  return (
    <>
      <AdsNavigation />
      <Outlet />
    </>
  );
}

export default AdsRootLayout;