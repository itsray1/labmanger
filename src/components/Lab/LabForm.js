
import {
  Form,
  useNavigate,
  useNavigation,
  useActionData,
  redirect
} from 'react-router-dom';
import { getAuthToken } from '../../util/auth';


/**
 * A form for creating or editing a Lab.
 *
 * @param {Object} props
 * @param {string} props.method - The HTTP method to use for the form submission.
 * @param {Object} [props.lab] - The lab data to prefill the form with.
 * @returns {React.ReactElement} A `Form` component with fields for the lab's
 *     name, description, and image.
 */

function LabForm({ method, lab }) {
  const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';

  function cancelHandler() {
    navigate('..');
  }

  return (
    <Form method={method} encType="multipart/form-data">
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
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="file"
          name="image"
          accept="image/*"
        />
      </p>
      <p>
        <label htmlFor="logo">Logo</label>
        <input
          id="logo"
          type="file"
          name="logo"
          accept="image/*"
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


/**
 * Handles the form submission for creating or updating a lab.
 *
 * @param {import('react-router-dom').Request} request - The request object.
 *
 * @returns {Promise<import('react-router-dom').Response>} - The response object.
 */

export async function action({ request}) {
  const method = request.method;
  console.log('Action function initiated');
  const data = await request.formData();
  console.log(data);

  const labData = {
    name: data.get('name'),
    description: data.get('description'),
  };

  const imageFile = data.get('image');
  const logoFile = data.get('logo');


  const formData = new FormData();
  formData.append('name', labData.name);
  formData.append('description', labData.description);

  if (imageFile) formData.append('image', imageFile);
  if (logoFile) formData.append('logo', logoFile);

  
  console.log(formData);

  
  let  url = 'http://127.0.0.1:8000/lab_manager/update_lab/';
  

  if (method !== 'PATCH') {
   
     url = 'http://127.0.0.1:8000/lab_manager/lab/';
     
  }
  

  const token = getAuthToken();
  console.log("token:", token);

  const response = await fetch(url, {
    method: method,
    headers: {
      'Authorization': 'Bearer ' + token
    },
    body: formData, 
  });

  if (response.status === 422) {
    console.log("validation failed");

    return new Response(JSON.stringify({ message: 'Validation failed.' }), {
      status: 422,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!response.ok) {
    console.log("could not save lab");
    throw new Response(JSON.stringify({ message: 'Could not save lab.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return redirect('/lab');
}
