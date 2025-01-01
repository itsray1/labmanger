
import { Link } from 'react-router-dom';

function LabProfile({ lab }) {

  if (!lab) {
    return <p style={{ textAlign: 'center', color: 'red' }}>No lab details available.</p>;
  }

  return (
    <div>
      <Link to={`/lab/${lab.id}`}>
        {/* تحديث المسار للصورة بناءً على البيانات المدخلة */}
        <img src={lab.logo} alt={lab.name} style={{ width: '100px', height: '100px' }} />
        <div>
          <h2>{lab.name}</h2>
          <p>{lab.description}</p>
        </div>
      </Link>
    </div>
  );
}

export default LabProfile;
