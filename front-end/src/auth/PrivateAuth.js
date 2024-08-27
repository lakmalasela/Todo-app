// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const PrivateRoute = ({ component: Component }) => {
//   const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

//   return isLoggedIn ? <Component /> : <Navigate to="/login" replace />;
// };

// export default PrivateRoute;
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  return isLoggedIn ? <Element {...rest} /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
