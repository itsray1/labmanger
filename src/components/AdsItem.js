import { Link, useRouteLoaderData, useSubmit } from 'react-router-dom';


function AdsItem({ Ads }) {
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
      <h1>{Ads.name}</h1>
      <time>{Ads.startdate}</time>
      <time>{Ads.enddate}</time>
      <p>{Ads.description}</p>
      {token && (
        <menu>
          <Link to="edit">Edit</Link>
          <button onClick={startDeleteHandler}>Delete</button>
        </menu>
      )}
    </article>
  );
}

export default AdsItem;