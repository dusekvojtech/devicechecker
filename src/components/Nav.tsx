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
    <div>
      <nav
        className="navbar navbar-expand navbar-dark bg-dark"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%' }}
      >
        <div className="navbar-nav">
          <h1 className=" navbar-brand">Device Checker</h1>
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
              className="nav-item nav-link"
            >
              Logout
            </a>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
