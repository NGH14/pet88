import { redirect } from 'react-router';

import { UserAuth } from 'context/AuthContext';

export const PrivateRoute = ({ children }) => {
  const { user } = UserAuth();

  if (!user) {
    return <redirect to="/" />;
  }

  return children;
};
