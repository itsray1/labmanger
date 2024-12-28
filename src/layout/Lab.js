import { Outlet } from 'react-router-dom';

import LabNavigation from '../components/LabNavigation';


function LabRootLayout() {
  return (
    <>
      <LabNavigation />
      <Outlet />
    </>
  );
}

export default LabRootLayout;