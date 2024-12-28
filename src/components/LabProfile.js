// import { useLoaderData } from 'react-router-dom';
import { Link } from 'react-router-dom';



function LabProfile({lab}) {
  // const events = useLoaderData();

  return (
    <div >
            <Link to={`/lab/${lab.id}`}>
            <img src={lab.image} alt={lab.name} />
              <div >
                <h2>{lab.name}</h2>
                <p>{lab.description}</p>
              </div>
            </Link>
    </div>
  );
}

export default LabProfile;