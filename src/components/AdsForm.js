import {
  Form,
  useNavigate,
  useNavigation,
  useActionData,
  redirect
} from 'react-router-dom';
import { getAuthToken } from '../util/auth';


function AdsForm({ method, ads }) {
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
          defaultValue={ads ? ads.name : ''}
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          required
          defaultValue={ads ? ads.description : ''}
        />
      </p>
      <p>
        <label htmlFor="startdate">Start Date</label>
        <input
          id="startdate"
          type="date"
          name="startdate"
          required
          defaultValue={ads ? ads.startdate : ''}
        />
      </p>
      <p>
        <label htmlFor="enddate">End Date</label>
        <input
          id="enddate"
          type="date"
          name="enddate"
          required
          defaultValue={ads ? ads.enddate : ''}
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

export default AdsForm;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();

  const adsData = {
    name: data.get('name'),
    description: data.get('description'),
    startdate: data.get('startdate'),
    enddate: data.get('enddate'),
  };

  const labId = params.labId;
  let url = `http://localhost:8080/labs/${labId}/ads`;

  if (method === 'PATCH') {
    const adsId = params.adsId;
    url += `/${adsId}`;
  }

  const token = getAuthToken();
  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify(adsData),
  });

  if (response.status === 422) {
    return new Response(JSON.stringify({ message: 'Validation failed.' }), {
      status: 422,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Could not save ads.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return redirect(`/lab/${labId}/ads`);
}
