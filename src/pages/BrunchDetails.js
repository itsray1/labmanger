// import { Suspense } from 'react';
// import {
//   useRouteLoaderData,
//   json,
//   redirect,
//   defer,
//   Await,
// } from 'react-router-dom';

// import BrunchItem from '../components/BrunchItem';
// import BrunchList from '../components/brunchList';
// import { getAuthToken } from '../util/auth';

// function BrunchDetailPage() {
//   const { brunch, brunches } = useRouteLoaderData('brunch-detail');

//   return (
//     <>
//       <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
//         <Await resolve={brunch}>
//           {(loadedBrunch) => <BrunchItem brunch={loadedBrunch} />}
//         </Await>
//       </Suspense>
//       <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
//         <Await resolve={brunches}>
//           {(loadedBrunches) => <BrunchList brunches={loadedBrunches} />}
//         </Await>
//       </Suspense>
//     </>
//   );
// }

// export default BrunchDetailPage;

// async function loadBrunch(id) {
//   const response = await fetch('http://localhost:8080/Brunch/' + id);

//   if (!response.ok) {
//     throw json(
//       { message: 'Could not fetch details for selected Brunch.' },
//       {
//         status: 500,
//       }
//     );
//   } else {
//     const resData = await response.json();
//     return resData.brunch;
//   }
// }

// async function loadBrunches() {
//   const response = await fetch('http://localhost:8080/Brunch');

//   if (!response.ok) {
//     // return { isError: true, message: 'Could not fetch events.' };
//     // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
//     //   status: 500,
//     // });
//     throw json(
//       { message: 'Could not fetch Brunches.' },
//       {
//         status: 500,
//       }
//     );
//   } else {
//     const resData = await response.json();
//     return resData.brunch;
//   }
// }

// export async function loader({ request, params }) {
//   const id = params.eventId;

//   return defer({
//     brunch: await loadBrunch(id),
//     brunches: loadBrunches(),
//   });
// }

// export async function action({ params, request }) {
//   const brunchId = params.brunchId;

//   const token = getAuthToken();
//   const response = await fetch('http://localhost:8080/events/' + brunchId, {
//     method: request.method,
//     headers: {
//       'Authorization': 'Bearer ' + token
//     }
//   });

//   if (!response.ok) {
//     throw json(
//       { message: 'Could not delete event.' },
//       {
//         status: 500,
//       }
//     );
//   }
//   return redirect('/brunches');
// }
import { Suspense } from 'react';

import {
  useRouteLoaderData,
  json,
  redirect,
  Await,
} from 'react-router-dom';

import BrunchItem from '../components/BrunchItem';
import BrunchList from '../components/BrunchList';
import { getAuthToken } from '../util/auth';

function BrunchDetailPage() {
  const { brunch, brunches } = useRouteLoaderData('brunch-detail');

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <Await resolve={brunch}>
          {(loadedBrunch) => <BrunchItem brunch={loadedBrunch} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <Await resolve={brunches}>
          {(loadedBrunches) => <BrunchList brunches={loadedBrunches} />}
        </Await>
      </Suspense>
    </>
  );
}

export default BrunchDetailPage;

async function loadBrunch(id) {
  const response = await fetch('http://localhost:8080/lab/labid/Brunch/' + id);

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
 
    });
  } else {
    const resData = await response.json();
    return resData.brunch;
  }
}

async function loadBrunches() {
  const response = await fetch('http://localhost:8080/lab/labid/Brunch');

  if (!response.ok) {
    // return { isError: true, message: 'Could not fetch events.' };
    throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  
    // throw json(
    //   { message: 'Could not fetch Brunches.' },
    //   {
    //     status: 500,
    //   }
    // );
  } else {
    const resData = await response.json();
    return resData.brunches;
  }
}

export async function loader({  params }) {
  const id = params.brunchId;

  
  const brunch=await loadBrunch(id);
  const brunches= loadBrunches();
  return {brunch,brunches};
 
}

export async function action({ params, request }) {
  const brunchId = params.brunchId;

  const token = getAuthToken();
  const response = await fetch('http://localhost:8080/lab/labid/brunch/' + brunchId, {
    method: request.method,
    headers: {
      'Authorization': 'Bearer ' + token
    }
  });

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Could not delete brunch.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  return redirect('/brunch');
}