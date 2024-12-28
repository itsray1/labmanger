import { useEffect } from 'react';
import { Outlet, useLoaderData, useSubmit } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';
import { getTokenDuration } from '../util/auth';

function RootLayout() {
  const token = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    if (!token || token === 'EXPIRED') {
      submit(null, { action: '/logout', method: 'post' });
      return;
    }

    const tokenDuration = getTokenDuration();

    // تسجيل الخروج تلقائيًا بعد انتهاء المدة
    const logoutTimer = setTimeout(() => {
      submit(null, { action: '/logout', method: 'post' });
    }, tokenDuration);

    // تنظيف التايمر عند تفكيك المكون
    return () => clearTimeout(logoutTimer);
  }, [token, submit]);

  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
