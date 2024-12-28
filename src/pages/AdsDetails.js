
import { Suspense } from 'react';
import { useRouteLoaderData, redirect ,Await} from 'react-router-dom';

import AdsItem from '../components/AdsItem';
import AdsList from '../components/AdsList'; 
import { getAuthToken } from '../util/auth';

function AdsDetailPage() {
  const { ad, ads } = useRouteLoaderData('ads-detail');

  return (
    <>
       <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={ad}>
          {(loadedAd) => <AdsItem ad={loadedAd} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={ads}>
          {(loadedAds) => <AdsList ads={loadedAds} />}
        </Await>
      </Suspense>
    </>
  );
}

export default AdsDetailPage;

async function loadAd(id) {
  const response = await fetch(`http://localhost:8080/lab/labId/ads/${id}`);//need to change the url

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Could not fetch ad details.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }else {
    const resData = await response.json();
    return resData.ad;
}
}

async function loadAds() {
  const response = await fetch('http://localhost:8080/lab/labId/ads');///need to change the url

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Could not fetch ads.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }else {
      const resData = await response.json();
      return resData.ads;
  }
}

export async function loader({ params }) {
  const { adsId } = params;
  const ad = await loadAd(adsId);
  const ads = await loadAds();

  return { ad, ads };
}

export async function action({ params, request }) { ////////////need to edit
  const { adsId } = params;
  const token = getAuthToken();

  const response = await fetch(`http://localhost:8080/lab/labId/ads/${adsId}`, {
    method: request.method,
    headers: {
      'Authorization': 'Bearer' + token,
    },
  });

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Could not delete ad.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return redirect('/ads');
}
