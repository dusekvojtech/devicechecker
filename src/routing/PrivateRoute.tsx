import { Navigate, useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import userAtom from '../atoms/user';
import { ROLE } from './roles';
import { ROUTES } from './routes';

type Props = {
  children: JSX.Element;
  roles: Array<ROLE>;
  defaultRoute: ROUTES;
};

const PrivateRoute = (props: Props) => {
  const location = useLocation();
  const [user] = useRecoilState(userAtom);

  if (!user?.id) {
    return <Navigate to={ROUTES.Login} state={{ from: location }} />;
  }

  if (user.id) {
    const userHasRequiredRole = props.roles.includes(user?.type) ? true : false;

    if (!userHasRequiredRole) {
      return <Navigate to={props.defaultRoute} state={{ from: location }} />;
    }
  }

  return props.children;
};

export default PrivateRoute;
