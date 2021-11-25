import { FC, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import userAtom from '../atoms/user';
import { Device, getDevices, bookDevice, returnDevice } from '../services/rest';
import DeviceItem from '../components/DeviceItem';

type Filter = {
  os: string;
  vendor: string;
};

const DeviceList: FC = () => {
  const [user] = useRecoilState(userAtom);
  const [devices, setDevices] = useState<Device[]>([]);
  const [originalDevices, setOriginalDevices] = useState<Device[]>([]);
  const [filter, setFilter] = useState<Filter>({ os: '', vendor: '' });

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const name = e.target.name;

    setFilter((state) => ({
      ...state,
      [name]: value,
    }));
  };

  useEffect(() => {
    const filteredDevices = originalDevices
      .filter((item) => (filter.os !== '' ? item.os === filter.os : true))
      .filter((item) => (filter.vendor !== '' ? item.vendor === filter.vendor : true));

    setDevices(filteredDevices);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  useEffect(() => {
    const fetchDevices = async () => {
      const data = await getDevices();
      setDevices(data);
      setOriginalDevices(data);
    };
    void fetchDevices();
  }, []);

  const updateDevice = (device: Device) => {
    // update rendered state
    const index = devices.findIndex((item) => item.id === device.id);
    const newDevices = [...devices];
    newDevices[index] = device;
    setDevices(newDevices);

    // update backup state
    const originalIndex = originalDevices.findIndex((item) => item.id === device.id);
    const newOriginalDevices = [...originalDevices];
    newOriginalDevices[originalIndex] = device;
    setOriginalDevices(newOriginalDevices);
  };

  return (
    <div className="container">
      <section className="p-3 rounded shadow">
        <form>
          <select
            name="os"
            className={'custom-select form-control col-md-3 m-1'}
            onChange={handleFilter}
          >
            <option value="" label="Filter by OS" />
            <option value="IOS" label="iOS" />
            <option value="ANDROID" label="Android" />
            <option value="WINDOWS" label="Windows" />
          </select>
          <select
            name="vendor"
            className={'custom-select form-control col-md-3 m-1'}
            onChange={handleFilter}
          >
            <option value="" label="Filter by vendor" />
            <option value="APPLE" label="Apple" />
            <option value="SAMSUNG" label="Samsung" />
            <option value="HUAWEI" label="Huawei" />
            <option value="XIAOMI" label="Xiaomi" />
          </select>
        </form>
      </section>
      <section className="row py-3">
        {devices.map((device) => {
          return (
            <DeviceItem
              device={device}
              key={device.id}
              bookAction={async () => {
                if (user?.id) {
                  const updatedDevice = await bookDevice(user?.id, device.id);
                  updateDevice(updatedDevice);
                }
              }}
              returnAction={async () => {
                if (user?.id) {
                  const updatedDevice = await returnDevice(user?.id, device.id);
                  updateDevice(updatedDevice);
                }
              }}
            />
          );
        })}
      </section>
    </div>
  );
};

export default DeviceList;
