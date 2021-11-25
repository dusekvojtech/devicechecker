import moment from 'moment';
import { useRecoilState } from 'recoil';

import userAtom from '../atoms/user';
import { Device } from '../services/rest';

import noImage from '../assets/no-image.png';

export type Props = {
  device: Device;
  bookAction: () => void;
  returnAction: () => void;
};

const DeviceItem = (props: Props) => {
  const [user] = useRecoilState(userAtom);

  const getDeviceDetail = (): { title: string; class: string; action: () => void } => {
    const id = props.device.borrowed?.user.id;
    if (id) {
      if (id === user?.id) {
        return { title: 'Return', class: 'btn-dark', action: props.returnAction };
      }
      return { title: 'Booked', class: 'disabled btn-outline-secondary', action: () => null };
    }
    return { title: 'Book', class: 'btn-primary', action: props.bookAction };
  };

  return (
    <div className="col-md-4">
      <div className="card mb-4 shadow">
        <img
          className="card-img-top"
          src={props.device.image ?? noImage}
          alt={props.device.model}
          style={{ height: 250, objectFit: 'contain', padding: 10 }}
        />
        <div className="card-body" style={{ minHeight: 200 }}>
          <h5 className="card-title">{props.device.model}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{props.device.vendor}</h6>
          <p className="card-text">{`${props.device.os ?? ''} / ${
            props.device.osVersion ?? ''
          }`}</p>
          <div className="d-flex justify-content-between align-items-center">
            <button
              type="button"
              className={`btn btn-sm box ${getDeviceDetail().class}`}
              onClick={() => getDeviceDetail().action()}
            >
              {getDeviceDetail().title}
            </button>
            {props.device.borrowed && (
              <small className="text-muted">{`${props.device.borrowed?.user.name}, ${
                props.device.borrowed?.date
                  ? moment(props.device.borrowed?.date).format('D.M.Y')
                  : null
              }`}</small>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceItem;
