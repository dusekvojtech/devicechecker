import { FC } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { createDevice } from '../services/rest';

const DeviceCreate: FC = () => {
  return (
    <div className="col-md-4 justify-content-center">
      <h2>Create new device</h2>
      <Formik
        initialValues={{
          code: '', //'AAA',
          model: '', //'iPhone X',
          osVersion: '', //'iOS 15',
          img: undefined, //'https://www.o2.cz/_pub/74/fa/3a/221267_453518_img_049.jpg',
          vendor: '', //'APPLE',
          os: '', //'IOS',
        }}
        validationSchema={Yup.object().shape({
          code: Yup.string().required('Code is required'),
          model: Yup.string().required('Model is required'),
          osVersion: Yup.string().required('OS Version is required'),
          img: Yup.string().url('Not valid URL'),
          vendor: Yup.string().required('Vendor is required'),
          os: Yup.string().required('OS is required'),
        })}
        onSubmit={(
          { code, model, osVersion, img, vendor, os },
          { setStatus, setSubmitting, resetForm }
        ) => {
          setStatus();
          createDevice(code, os, vendor, model, osVersion, img === '' ? undefined : img).then(
            (deviceData) => {
              if (deviceData.id) {
                resetForm();
                setStatus(`${deviceData.model} was created`);
                setSubmitting(false);
              }
            },
            (error) => {
              setSubmitting(false);
              setStatus(error);
            }
          );
        }}
      >
        {({ errors, status, touched, isSubmitting, handleChange, handleBlur }) => (
          <Form>
            <div className="form-group">
              <Field
                name="code"
                placeholder="Identifier"
                type="text"
                className={'form-control' + (errors.code && touched.code ? ' is-invalid' : '')}
                disabled={isSubmitting}
              />
              <ErrorMessage name="code" component="div" className="invalid-feedback" />
            </div>
            <div className="form-group">
              <select
                name="vendor"
                className={'custom-select form-control' + (errors.vendor ? ' is-invalid' : '')}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
              >
                <option value="" label="Select vendor" />
                <option value="APPLE" label="Apple" />
                <option value="SAMSUNG" label="Samsung" />
                <option value="HUAWEI" label="Huawei" />
              </select>
              <ErrorMessage name="vendor" component="div" className="invalid-feedback" />
            </div>
            <div className="form-group">
              <Field
                name="model"
                placeholder="Model"
                type="text"
                className={'form-control' + (errors.model && touched.model ? ' is-invalid' : '')}
                disabled={isSubmitting}
              />
              <ErrorMessage name="model" component="div" className="invalid-feedback" />
            </div>
            <div className="form-group">
              <select
                name="os"
                className={'custom-select form-control' + (errors.os ? ' is-invalid' : '')}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
              >
                <option value="" label="Select OS" />
                <option value="IOS" label="iOS" />
                <option value="ANDROID" label="Android" />
                <option value="WINDOWS" label="Windows" />
              </select>
              <ErrorMessage name="os" component="div" className="invalid-feedback" />
            </div>
            <div className="form-group">
              <Field
                name="osVersion"
                placeholder="OS version"
                type="text"
                className={
                  'form-control' + (errors.osVersion && touched.osVersion ? ' is-invalid' : '')
                }
                disabled={isSubmitting}
              />
              <ErrorMessage name="osVersion" component="div" className="invalid-feedback" />
            </div>
            <div className="form-group">
              <Field
                name="img"
                placeholder="Image url"
                type="text"
                className={'form-control' + (errors.img && touched.img ? ' is-invalid' : '')}
                disabled={isSubmitting}
              />
              <ErrorMessage name="img" component="div" className="invalid-feedback" />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                Create device
              </button>
              {isSubmitting && (
                <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
              )}
            </div>
            {status && <div className={'alert alert-success'}>{status}</div>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DeviceCreate;
