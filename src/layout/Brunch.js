import { Outlet } from 'react-router-dom';

import BrunchNavigation from '../components/Brunch/BrunchNavigation';


function BrunchRootLayout() {
  return (
    <>
      <BrunchNavigation />
      <Outlet />
    </>
  );
}

export default BrunchRootLayout;