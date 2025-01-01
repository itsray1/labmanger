import { Outlet } from 'react-router-dom';

import TestNavigation from '../components/Test/TestNavigation';


function TestRootLayout() {
  return (
    <>
      <TestNavigation />
      <Outlet />
    </>
  );
}

export default TestRootLayout;