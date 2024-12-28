import { Link, useRouteLoaderData, useSubmit } from 'react-router-dom';


function BrunchItem({ brunch }) {
  const token = useRouteLoaderData('root');
  const submit = useSubmit();

  function startDeleteHandler() {
    const proceed = window.confirm('Are you sure?');

    if (proceed) {
      submit(null, { method: 'delete' });
    }
  }

  return (
    <article >
      <img src={brunch.image} alt={brunch.title} />
      <h1>{brunch.name }</h1>
      <p>{brunch.location}</p>
      <a href={brunch.link}>{brunch.link}</a>
      <p>{brunch.location}</p>
      {token && (
        <menu >
          <Link to="edit">Edit</Link>
          <button onClick={startDeleteHandler}>Delete</button>
        </menu>
      )}
    </article>
  );
}

export default BrunchItem;