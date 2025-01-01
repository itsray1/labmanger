
// import { Link } from 'react-router-dom';


// function BrunchList({brunches}) {


//   return (
//     <div >
//       <h1>All brunches</h1>
//       <ul >
//         {brunches.map((brunch) => (
//           <li key={brunch.id} >
//             <Link to={`/brunch/${brunch.id}`}>
//               <div >
//                 <h2>{brunch.name}</h2>
//                 <time>{brunch.phoneNumber}</time>
//               </div>
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default BrunchList;
import { Link } from 'react-router-dom';

function BrunchList({ brunches }) {

  if (brunches.length === 0) {
    return <p>No brunches available.</p>; // إذا كانت المصفوفة فارغة
  }

  return (
    <div>
      <h1>All brunches</h1>
      <ul>
        {brunches.map((brunch) => (
          <li key={brunch.id}>
            <Link to={`/brunch/${brunch.id}`}>
              <div>
                <h2>{brunch.name || 'No brunch Name'}</h2>
                <p>{brunch.phone_number || 'No Phone Number'}</p>
                <p>{brunch.address || 'No Address'}</p>
                  {brunch.location && (
                <a
                  href={brunch.location}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Lab Details
                </a>
              )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BrunchList;
