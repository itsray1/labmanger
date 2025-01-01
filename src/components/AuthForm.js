import {
    Form,
    
    useActionData,
    useNavigation,
  } from 'react-router-dom';
  

  
  function AuthForm() {
    const data = useActionData();
    const navigation = useNavigation();
  


    const isSubmitting = navigation.state === 'submitting';
  
    return (
      <>
        <Form method="post" >
          <h1> Log in  </h1>
          {data && data.errors && (
            <ul>
              {Object.values(data.errors).map((err) => (
                <li key={err}>{err}</li>
              ))}
            </ul>
          )}
          {data && data.message && <p>{data.message}</p>}
          <p>
            <label htmlFor="username">username</label>
            <input id="username" type="text" name="username" required />
          </p>
          <p>
            <label htmlFor="image">Password</label>
            <input id="password" type="password" name="password" required />
          </p>
          <div >
            <button disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Save'}
            </button>
          </div>
        </Form>
      </>
    );
  }
  
  export default AuthForm;