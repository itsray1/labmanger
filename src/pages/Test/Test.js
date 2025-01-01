
import { Suspense } from 'react';
import { useLoaderData, Await } from 'react-router-dom';

import TestList from '../../components/Test/TestList';

// function TestPage() {
//   const { test } = useLoaderData();

//   return (
//     <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
//     <Await resolve={test}>
//       {(loadedTest) =>{
//           if (loadedTest.length === 0) {
//             return <p>No test available.</p>; 
//           }
//           return<TestList test ={loadedTest} />;
//           }}
//     </Await>
//   </Suspense>
//   );
// }
function TestPage() {
  const { tests } = useLoaderData(); // تأكد من تطابق الاسم مع `loader`

  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <Await resolve={tests}>
        {(loadedTests) => {
          if (!loadedTests || loadedTests.length === 0) {
            return <p>No tests available.</p>;
          }
          return <TestList tests={loadedTests} />;
        }}
      </Await>
    </Suspense>
  );
}

export default TestPage;
// async function loadTest() {
//   const token = localStorage.getItem('access_token');
//   if (!token) {
//     throw new Error('Token is missing. Please log in.');
//   }

//   try {
//     const response = await fetch('http://127.0.0.1:8000/lab_manager/tests/', {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//     });

//     if (!response.ok) {
//       throw new Error('Could not fetch tests.');
//     }

//     const data = await response.json();
//     console.log(data);
//     return data;
    
//   } catch (error) {
//     console.error("Error loading test:", error);
//     throw new Error('Failed to load test. Please try again later.');
//   }
// }
async function loadTest() {
  const token = localStorage.getItem('access_token');
  if (!token) {
    throw new Error('Token is missing. Please log in.');
  }

  try {
    const response = await fetch('http://127.0.0.1:8000/lab_manager/tests/', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Could not fetch tests.');
    }

    const data = await response.json();
    return data || []; // إذا كانت البيانات غير موجودة، أعِدْ مصفوفة فارغة
  } catch (error) {
    console.error("Error loading tests:", error);
    return []; // عودة مصفوفة فارغة عند حدوث خطأ
  }
}
export async function loader() {
  try {
    const tests = await loadTest();
    return { tests: tests || [] }; // التأكد من إعادة مصفوفة فارغة عند الفشل
  } catch (error) {
    console.error("Loader error:", error);
    return { tests: [] }; 
  }
}


// export async function loader() {
//   try {
//     const tests = await loadTest();
//     return { tests };
//   } catch (error) {
//     return { tests: [] }; 
//   }
// }


