import { NavLink, useRouteLoaderData } from 'react-router-dom';


function BrunchNavigation() {
  const token = useRouteLoaderData('root');

  return (
    <header >
      <nav>
        <ul>
          <li>
            <NavLink
              to="/ads"
             
              end
            >
              All Ads
            </NavLink>
          </li>
          {token && (
            <li>
              <NavLink
                to="/ads/new"
    
              >
                New ads
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default BrunchNavigation;