import { NavLink, useRouteLoaderData } from 'react-router-dom';
import { Form } from 'react-router-dom';


function LabNavigation() {
  const token = useRouteLoaderData('root');

  return (
    <header >
      <nav>
        <ul >
        
          {/* {token && (
            <li>
              <Form action="/logout" method="post">
                <button>Logout</button>
              </Form>
            </li>
          )} */}
            {/* 
              <li><NavLink
              to="/brunches"
             
              end
            >
              brunches
            </NavLink>
          </li>
          {token && (
            <li>
              <NavLink
                to="/ads"
    
              >
                
              </NavLink>*/}
            {/* </li>
          )}  */}
        </ul>
      </nav>
    </header>
  );
}

export default LabNavigation;