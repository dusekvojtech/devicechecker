import { FC } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRecoilState } from 'recoil';

import { handleLogin } from '../services/rest';
import userAtom from '../atoms/user';
import loadedApp from '../atoms/loadedApp';

const Login: FC = () => {
  const [, setUser] = useRecoilState(userAtom);
  const [loaded] = useRecoilState(loadedApp);
  return loaded ? (
    <div className="col-md-4 justify-content-center">
      <h2>Login</h2>
      <Formik
        initialValues={{
          username: 'gandalf.the.grey@etnetera.cz',
          password: 'wh1tew1zard',
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string().required('Email is required'),
          password: Yup.string().required('Password is required'),
        })}
        onSubmit={({ username, password }, { setStatus, setSubmitting }) => {
          setStatus();
          handleLogin(username, password).then(
            (userData) => {
              if (userData) {
                setUser(userData);
              }
            },
            (error) => {
              setSubmitting(false);
              setStatus(error);
            }
          );
        }}
      >
        {({ errors, status, touched, isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Field
                name="username"
                placeholder="Email"
                type="text"
                disabled={isSubmitting}
                className={
                  'form-control' + (errors.username && touched.username ? ' is-invalid' : '')
                }
              />
              <ErrorMessage name="username" component="div" className="invalid-feedback" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field
                name="password"
                placeholder="Password"
                type="password"
                disabled={isSubmitting}
                className={
                  'form-control' + (errors.password && touched.password ? ' is-invalid' : '')
                }
              />
              <ErrorMessage name="password" component="div" className="invalid-feedback" />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                Login
              </button>
              {isSubmitting && (
                <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
              )}
            </div>
            {status && <div className={'alert alert-danger'}>{status}</div>}
          </Form>
        )}
      </Formik>
    </div>
  ) : null;
};

export default Login;
