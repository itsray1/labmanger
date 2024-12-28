import { Outlet } from 'react-router-dom';

import BrunchNavigation from '../components/BrunchNavigation';


function BrunchRootLayout() {
  return (
    <>
      <BrunchNavigation />
      <Outlet />
    </>
  );
}

export default BrunchRootLayout;