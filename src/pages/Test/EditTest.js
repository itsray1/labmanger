import { useRouteLoaderData } from 'react-router-dom';

import TestForm from '../../components/Test/TestForm';

function EditTestPage() {
  const data = useRouteLoaderData('test-detail');

  return <TestForm method="patch" Test={data.Test} />;
}

export default EditTestPage;