import { UserAuth } from 'context/AuthContext';
import { redirect } from 'react-router';

export const PrivateRoute = ({ children }) => {
  const { user } = UserAuth();

  if (!user) {
    return <redirect to="/" />;
  }

  return children;
};
