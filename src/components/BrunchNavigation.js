import { NavLink, useRouteLoaderData } from 'react-router-dom';


function BrunchNavigation() {
  const token = useRouteLoaderData('root');

  return (
    <header>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/brunches"
             
              end
            >
              All brunches
            </NavLink>
          </li>
          {token && (
            <li>
              <NavLink
                to="/brunches/new"
    
              >
                New brunch
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default BrunchNavigation;