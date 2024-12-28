import { useRouteLoaderData } from 'react-router-dom';

import AdsForm from '../components/AdsForm';

function EditAdsPage() {
  const data = useRouteLoaderData('ads-detail');

  return <AdsForm method="patch" ads={data.ads} />;
}

export default EditAdsPage;