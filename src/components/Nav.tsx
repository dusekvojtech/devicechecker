import { FC } from 'react';
import { useRecoilState } from 'recoil';
import { NavLink } from 'react-router-dom';

import { ROUTES } from '../routing/routes';
import { ROLE } from '../routing/roles';
import { handleLogout } from '../services/rest';

import userAtom from '../atoms/user';

const Navigation: FC = () => {
  const [user, setUser] = useRecoilState(userAtom);
  return (
    <nav className="navbar navbar-expand navbar-dark fixed-top bg-dark">
      <div className="navbar-nav container">
        <h1 className="navbar-brand mb-0">Device Checker</h1>
        {user?.id && (
          <NavLink to={ROUTES.List} className="nav-item nav-link">
            List
          </NavLink>
        )}
        {user?.type === ROLE.Admin && (
          <NavLink to={ROUTES.Create} className="nav-item nav-link">
            Create
          </NavLink>
        )}
        {user?.id && (
          <a
            onClick={() => {
              setUser(null);
              handleLogout();
            }}
            className="nav-item nav-link ml-auto btn btn-outline-secondary p-1"
          >
            Logout
          </a>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
