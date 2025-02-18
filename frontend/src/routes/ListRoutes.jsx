import { Spinner } from 'components/Spinner';
import { Suspense } from 'react';
import { Route } from 'react-router';

import { PrivateRoute } from './PrivateRoute';

const ListRoutes = list => {
  return list.map((route, index) => {
    return (
      <Route
        key={index}
        path={route.path}
        element={
          <Suspense fallback={<Spinner />}>
            {route.private ? (
              <PrivateRoute>
                <route.element />
              </PrivateRoute>
            ) : (
              <route.element />
            )}
          </Suspense>
        }
      />
    );
  });
};

export default ListRoutes;
