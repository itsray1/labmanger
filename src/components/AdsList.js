// import { useLoaderData } from 'react-router-dom';
import { Link } from 'react-router-dom';



function AdsList({ads}) {
  // const events = useLoaderData();

  return (
    <div >
      <h1>All Ads</h1>
      <ul >
        {ads.map((ad) => (
          <li key={ad.id} >
            <Link to={`/ads/${ad.id}`}>
              <div >
                <h2>{ad.name}</h2>
                <time>{ad.startdate}</time>
                <time>{ad.enddate}</time>

              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdsList;