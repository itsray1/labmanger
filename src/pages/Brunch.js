import { Suspense } from 'react';
import { useLoaderData, json, defer, Await } from 'react-router-dom';

import BrunchList from '../components/BrunchList';


function BrunchPage() {
  const { brunches } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <Await resolve={brunches}>
        {(loadedBrunches) => <BrunchList brunches={loadedBrunches} />}
      </Await>
    </Suspense>
  );
}
export default BrunchPage;

async function loadBrunches() {
  const response = await fetch('http://localhost:8080/lab/labId/brunches');//////need to change the url

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Could not fetch brunches.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const data = await response.json();
  return data.brunches;
}

export async function loader() {
  const brunches = await loadBrunches();
  return { brunches };
}

// export async function action({ request, params }) {
//   const method = request.method;
//   const brunchData = await request.formData();

//   const brunch = {
//     name: brunchData.get('name'),
//     location: brunchData.get('location'),
//     phone: brunchData.get('phone'),
//   };

//   let url = 'http://localhost:8080/brunches';
//   if (method === 'PATCH') {
//     url += `/${params.brunchId}`;
//   }

//   const response = await fetch(url, {
//     method,
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(brunch),
//   });

//   if (!response.ok) {
//     throw new Response(JSON.stringify({ message: 'Could not save brunch.' }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }

//   return redirect('/brunches');
// }
