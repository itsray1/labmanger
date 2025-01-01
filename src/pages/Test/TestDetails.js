
import { Suspense } from 'react';
import { useRouteLoaderData, redirect ,Await} from 'react-router-dom';

import TestItem from '../../components/Test/TestItem';
import TestList from '../../components/Test/TestList'; 
import { getAuthToken } from '../../util/auth';

function TestDetailPage() {
  const { test, tests } = useRouteLoaderData('test-detail');

  return (
    <>
       <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={test}>
          {(loadedTest) => <TestItem test={loadedTest} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={tests}>
          {(loadedTests) => <TestList tests={loadedTests} />}
        </Await>
      </Suspense>
    </>
  );
}

export default TestDetailPage;

async function loadTest(id) {
  const response = await fetch(`http://127.0.0.1:8000/lab_manager/update_test/+${id}`);//need to change the url

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Could not fetch test details.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }else {
    const resData = await response.json();
    return resData;
}
}

async function loadTests() {
  const response = await fetch('http://127.0.0.1:8000/lab_manager/update_test/');

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Could not fetch test.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }else {
      const resData = await response.json();
      return resData;
  }
}

export async function loader({ params }) {
  const { testId } = params;
  const test = await loadTest(testId);
  const tests= await loadTests();

  return { test, tests };
}

export async function action({ params, request }) {
  const {testId} = params;
  const token = getAuthToken();

  const response = await fetch(`http://127.0.0.1:8000/lab_manager/delete_test/${testId}`, {
    method: request.method,
    headers: {
      'Authorization': 'Bearer' + token,
    },
  });

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Could not delete test' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return redirect('/test');
}
