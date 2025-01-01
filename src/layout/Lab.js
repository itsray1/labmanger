import { Outlet } from 'react-router-dom';

import LabNavigation from '../components/Lab/LabNavigation';


function LabRootLayout() {
  return (
    <>
      <LabNavigation />
      <Outlet />
    </>
  );
}

export default LabRootLayout;