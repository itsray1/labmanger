import {
  Form,
  useNavigate,
  useNavigation,
  useActionData,
  redirect
} from 'react-router-dom';
import { getAuthToken } from '../../util/auth';


function TestForm({ method, test}) {
  const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';

  function cancelHandler() {
    navigate('..');
  }

  return (
    <Form method={method} >
      {data && data.errors && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      <p>
        <label htmlFor="name">Title</label>
        <input
          id="name"
          type="text"
          name="name"
          required
          defaultValue={test ? test.name : ''}
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          required
          defaultValue={test ? test.description : ''}
        />
      </p>
      
      <div>   
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Save'}
        </button>
      </div>
    </Form>
  );
}

export default TestForm;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();

  const testData = {
    name: data.get('name'),
    description: data.get('description'),
    
  };

  
  let url = 'http://127.0.0.1:8000/lab_manager/add_test/';////

  if (method === 'PATCH') {
    url = 'http://127.0.0.1:8000/lab_manager/update_test/';
   
  }

  const token = getAuthToken();
  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify(testData),
  });

  if (response.status === 422) {
    return new Response(JSON.stringify({ message: 'Validation failed.' }), {
      status: 422,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Could not save test.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return redirect(`test`);
}
