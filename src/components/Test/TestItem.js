import { Link, useRouteLoaderData, useSubmit } from 'react-router-dom';


function TestItem({ test }) {
  const token = useRouteLoaderData('root');
  const submit = useSubmit();

  function startDeleteHandler() {
    const proceed = window.confirm('Are you sure?');

    if (proceed) {
      submit(null, { method: 'delete' });
    }
  }

  return (
    <article>
      <h1>{test .name}</h1>
      <time>{test .startdate}</time>
      <time>{test .enddate}</time>
      <p>{test .description}</p>
      {token && (
        <menu>
          <Link to="edit">Edit</Link>
          <button onClick={startDeleteHandler}>Delete</button>
        </menu>
      )}
    </article>
  );
}

export default TestItem;