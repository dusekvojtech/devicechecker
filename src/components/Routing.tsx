import React, { FC } from 'react';

import useAuthUser from '../hooks/useAuthUser';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from '../routing/PrivateRoute';
import PublicRoute from '../routing/PublicRoute';
import { ROLE } from '../routing/roles';
import { ROUTES } from '../routing/routes';

import Login from '../screens/Login';
import DeviceList from '../screens/DeviceList';
import DeviceCreate from '../screens/DeviceCreate';

const Routing: FC = () => {
  useAuthUser();
  return (
    <Routes>
      <Route
        path={ROUTES.Login}
        element={
          <PublicRoute defaultRoute={ROUTES.List}>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path={ROUTES.List}
        element={
          <PrivateRoute roles={[ROLE.Admin, ROLE.User]} defaultRoute={ROUTES.List}>
            <DeviceList />
          </PrivateRoute>
        }
      />
      <Route
        path={ROUTES.Create}
        element={
          <PrivateRoute roles={[ROLE.Admin]} defaultRoute={ROUTES.List}>
            <DeviceCreate />
          </PrivateRoute>
        }
      />
      <Route
        path="*"
        element={
          <PublicRoute defaultRoute={ROUTES.List}>
            <Login />
          </PublicRoute>
        }
      />
    </Routes>
  );
};

export default Routing;
