import {
  Form,
  useNavigate,
  useNavigation,
  useActionData,
  redirect
} from 'react-router-dom';
import { getAuthToken } from '../util/auth';


function BrunchForm({ method, brunch}) {
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
        <label htmlFor="name">Brunch Name</label>
        <input
          id="name"
          type="text"
          name="name"
          required
          defaultValue={brunch ? brunch.name : ''}
        />
      </p>
      <p>
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          id="phoneNumber"
          type="text"
          name="phoneNumber"
          required
          defaultValue={brunch ? brunch.phoneNumber : ''}
        />
      </p>
      <p>
        <label htmlFor="location">Location</label>
        <input
          id="location"
          type="text"
          name="location"
          required
          defaultValue={brunch ? brunch.location : ''}
        />
      </p>
      <p>
        <label htmlFor="link">Location Link</label>
        <input
          id="link"
          type="url"
          name="link"
          required
          defaultValue={brunch ? brunch.link : ''}
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

export default BrunchForm;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();

  const brunchData = {
    name: data.get('name'),
    phoneNumber: data.get('phoneNumber'),
    location: data.get('location'),
    link: data.get('link'),
  };

  const labId = params.labId;
  let url = `http://localhost:8080/lab/${labId}/branches`;

  if (method === 'PATCH') {
    const branchId = params.branchId;
    url += `/${branchId}`;
  }

  const token = getAuthToken();
  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify(brunchData),
  });

  if (response.status === 422) {
    return new Response(JSON.stringify({ message: 'Validation failed.' }), {
      status: 422,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Could not save branch.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return redirect(`/branch`);
}
