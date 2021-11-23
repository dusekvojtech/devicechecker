import { Navigate, useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { ROUTES } from './routes';

import userAtom from '../atoms/user';

type Props = {
  children: JSX.Element;
  defaultRoute: ROUTES;
};

const PublicRoute = (props: Props) => {
  const location = useLocation();
  const [user] = useRecoilState(userAtom);

  if (user) {
    return <Navigate to={props.defaultRoute} state={{ from: location }} />;
  }

  return props.children;
};

export default PublicRoute;
