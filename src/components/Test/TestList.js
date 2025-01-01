// import { useLoaderData } from 'react-router-dom';
import { Link } from 'react-router-dom';



// function TestList({tests}) {
//   // const events = useLoaderData();

//   return (
//     <div >
//       <h1>All Tests</h1>
//       <ul >
//         {tests.map((test) => (
//           <li key={test.id} >
//             <Link to={`/test/${test.id}`}>
//               <div >
//                 <h2>{test.name}</h2>
               
//               </div>
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default TestList;
function TestList({ tests }) {
  if (!tests || tests.length === 0) {
    return <p>No tests available.</p>;
  }

  return (
    <div>
      <h1>All Tests</h1>
      <ul>
        {tests.map((test) => (
          <li key={test.id}>
            <Link to={`/test/${test.id}`}>
              <div>
                <h2>{test.name || 'No Name Available'}</h2>
                <p>{test.description || 'No Description Available'}</p>
                <p>{test.price || 'No Price Available'}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TestList;
