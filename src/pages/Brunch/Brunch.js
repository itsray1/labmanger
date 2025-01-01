// import { Suspense } from 'react';
// import { useLoaderData,  Await } from 'react-router-dom';

// import BrunchList from '../components/BrunchList';


// function BrunchPage() {
//   const { brunches } = useLoaderData();

//   return (
//     <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
//       <Await resolve={brunches}>
//         {(loadedBrunches) => <BrunchList brunches={loadedBrunches} />}
//       </Await>
//     </Suspense>
//   );
// }
// export default BrunchPage;

// async function loadBrunches() {

//   const token = localStorage.getItem('access_token'); 
//   if (!token) {
//     throw new Error('Token is missing. Please log in.');
//   }

//   const response = await fetch('http://127.0.0.1:8000/lab_manager/branchs/', {
//     headers: {
//       Authorization: `Bearer ${token}`, 
//       'Content-Type': 'application/json',
//     },
//   });
//   if (!response.ok) {
//     throw new Response(JSON.stringify({ message: 'Could not fetch brunches.' }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }

//   const data = await response.json();
//   return data;
// }

// export async function loader() {
//   const brunches = await loadBrunches();
//   return { brunches };
// }
import { Suspense } from 'react';
import { useLoaderData, Await } from 'react-router-dom';
import BrunchList from '../../components/Brunch/BrunchList';
function BrunchPage() {
  const { brunches } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <Await resolve={brunches}>
        {(loadedBrunches) => {
          if (loadedBrunches.length === 0) {
            return <p>No brunches available.</p>; 
          }
          return <BrunchList brunches={loadedBrunches} />;
        }}
      </Await>
    </Suspense>
  );
}

export default BrunchPage;

async function loadBrunches() {
  const token = localStorage.getItem('access_token');
  if (!token) {
    throw new Error('Token is missing. Please log in.');
  }

  try {
    const response = await fetch('http://127.0.0.1:8000/lab_manager/branchs/', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Could not fetch brunches.');
    }

    const data = await response.json();
    console.log(data);
    return data;
    
  } catch (error) {
    console.error("Error loading brunches:", error);
    throw new Error('Failed to load brunches. Please try again later.');
  }
}

export async function loader() {
  try {
    const brunches = await loadBrunches();
    return { brunches };
  } catch (error) {
    return { brunches: [] }; 
  }
}

