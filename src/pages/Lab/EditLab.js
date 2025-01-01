import { useRouteLoaderData } from 'react-router-dom';

import LabForm from '../../components/Lab/LabForm';

function EditLabPage() {
  const data = useRouteLoaderData('lab-detail');

  return <LabForm method="patch" lab={data.lab} />;
}

export default EditLabPage;