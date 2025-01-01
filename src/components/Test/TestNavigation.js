import { NavLink, useRouteLoaderData } from 'react-router-dom';


function TestNavigation() {
  const token = useRouteLoaderData('root');

  return (
    <header >
      <nav>
        <ul>
          <li>
            <NavLink
              to="/test"
             
              end
            >
              All Tests
            </NavLink>
          </li>
          {token && (
            <li>
              <NavLink
                to="/test/new"
    
              >
                New Test
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default TestNavigation;