//////////////////////////////need  more work//////////////////////////////////

import { Suspense } from 'react';
import {
  useRouteLoaderData,
  json,
  redirect,
  Await,
} from 'react-router-dom';

import LabProfile from '../components/LabProfile';
import { getAuthToken } from '../util/auth';

function LabDetailPage() {
  const {lab} = useRouteLoaderData('Lab-detail');

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={lab}>
          {(loadedLab) => <LabProfile lab={loadedLab} />}
        </Await>
      </Suspense>
    
    </>
  );
}

export default LabDetailPage;

async function loadLab(id) {
  const response = await fetch('http://localhost:8080/lab/'+ id);

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Could not fetch details for Lab.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  } else {
    const resData = await response.json();
    return resData.lab;
  }
}


export async function loader({ params }) {
  const id = params.labId;

    const lab= await loadLab(id);
    return{lab};

}

export async function action({ params, request }) {
  const labId = params.labId;

  const token = getAuthToken();
  const response = await fetch('http://localhost:8080/labs/' + labId, {
    method: request.method,
    headers: {
      'Authorization': 'Bearer ' + token
    }
  });

  if (!response.ok) {
    // throw json(
    //   { message: 'Could not delete lab.' },
    //   {
    //     status: 500,
    //   }
    // );
    throw new Response(JSON.stringify({ message: 'Could not .' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  return redirect('/labs');
}