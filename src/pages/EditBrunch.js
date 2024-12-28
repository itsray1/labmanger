import { useRouteLoaderData } from 'react-router-dom';

import BrunchForm from '../components/BrunchForm';

function BrunchEditPage() {
  const data = useRouteLoaderData('brunch-detail');

  return <BrunchForm method="patch" brunch={data.brunch} />;
}

export default BrunchEditPage;