import { Form, NavLink, useRouteLoaderData } from 'react-router-dom';



function MainNavigation() {
  const token = useRouteLoaderData('root');

  return (
    <header >
      <nav>
        <ul >

          {!token && (
            <li>
              <NavLink
                to="/auth"
                // className={({ isActive }) =>
                //   isActive ? classes.active : undefined
                // }
              >
                Authentication
              </NavLink>
            </li> 
          )}
          {token && (
            <li>
              <Form action="/logout" method="post">
                <button>Logout</button>
              </Form>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;