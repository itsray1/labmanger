import {
  Form,
  useNavigate,
  useNavigation,
  useActionData,
  redirect
} from 'react-router-dom';
import { getAuthToken } from '../util/auth';

function LabForm({ method, lab }) {
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
        <label htmlFor="name">Lab Name</label>
        <input
          id="name"
          type="text"
          name="name"
          required
          defaultValue={lab ? lab.name : ''}
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          required
          defaultValue={lab ? lab.description : ''}
        />
      </p>
      <p>
        <label htmlFor="image">Image URL</label>
        <input
          id="image"
          type="url"
          name="image"
          required
          defaultValue={lab ? lab.image : ''}
        />
      </p>
      <p>
        <label htmlFor="logo">Logo URL</label>
        <input
          id="logo"
          type="url"
          name="logo"
          required
          defaultValue={lab ? lab.logo : ''}
        />
      </p>
      <div >
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

export default LabForm;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();

  const labData = {
    name: data.get('name'),
    description: data.get('description'),
    image: data.get('image'),
    logo: data.get('logo'),
  };

  let url = 'http://localhost:8080/labs';

  if (method === 'PATCH') {
    const labId = params.labId;
    url += `/${labId}`;
  }

  const token = getAuthToken();
  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify(labData),
  });

  if (response.status === 422) {
    return new Response(JSON.stringify({ message: 'Validation failed.' }), {
      status: 422,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Could not save lab.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return redirect('/lab');
}