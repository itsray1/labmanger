
import { Suspense } from 'react';
import { useLoaderData, Await } from 'react-router-dom';

import AdsList from '../components/AdsList';

function AdsPage() {
  const { ads } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
    <Await resolve={ads }>
      {(loadedAds) => <AdsList ads ={loadedAds} />}
    </Await>
  </Suspense>
  );
}

export default AdsPage;

async function loadAds() {
  const response = await fetch('http://localhost:8080/lab/labid/ads');///need to change the url

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Could not fetch ads.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const resData = await response.json();
  return resData.ads;
}

export async function loader() {
  const ads = await loadAds();
  return { ads }; 
}

// export async function action({ request, params }) {
//   const method = request.method;
//   const token = localStorage.getItem('token');

//   const response = await fetch(`http://localhost:8080/ads/${params.adsId}`, {
//     method: method,
//     headers: {
//       'Authorization': `Bearer ${token}`,
//     },
//   });

//   if (!response.ok) {
//     throw new Response(JSON.stringify({ message: 'Could not delete ad.' }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }

//   return redirect('/ads');
// }
