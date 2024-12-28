
import { Link } from 'react-router-dom';


function BrunchList({brunches}) {


  return (
    <div >
      <h1>All brunches</h1>
      <ul >
        {brunches.map((brunch) => (
          <li key={brunch.id} >
            <Link to={`/brunches/${brunch.id}`}>
              <div >
                <h2>{brunch.name}</h2>
                <time>{brunch.phoneNumber}</time>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BrunchList;