import { Suspense } from 'react';
import { useLoaderData, Await } from 'react-router-dom';
import LabProfile from '../../components/Lab/LabProfile';

/** 
 * LabPage component fetches lab data using `useLoaderData`, and displays
 * it within a `LabProfile` component. It uses `Suspense` and `Await` to handle
 * asynchronous loading of the lab data.
 *
 * Returns a fallback message while loading and an error message if loading fails.
 * /**
 * Fetches lab details for the currently logged-in lab manager.
 *
 * Throws an error if the token is missing, or if the request fails.
 *
 */
function LabPage() {
  const { lab } = useLoaderData();

  return (
  <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <Await
        resolve={lab}
        errorElement={<p style={{ textAlign: 'center', color: 'red' }}>Failed to load lab details.</p>}
      >
        {(loadedLab) => <LabProfile lab={loadedLab} />}
      </Await>
    </Suspense>
     );
}
export default LabPage;

/**
* @throws {Error} If the token is missing or invalid.
* @throws {Error} If the request fails.
* @returns {Promise<Object>} The lab details.
*/

async function loadLab() {
  const token = localStorage.getItem('access_token'); 
  if (!token) {
    throw new Error('Token is missing. Please log in.');
  }

  const response = await fetch('http://127.0.0.1:8000/lab_manager/lab_details/', {
    headers: {
      Authorization: `Bearer ${token}`, 
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Unauthorized! Please log in again.');
    } else {
      throw new Error('Failed to fetch lab details. Status: ' + response.status);
    }
  }
  const data = await response.json();
  return data;
}


/**
 * Loads the current lab's details.
 * 
 * @returns {{lab: Lab}} A promise which resolves to an object containing the lab's details.
 */

export async function loader() {
  const lab = await loadLab();
  return { lab };
}