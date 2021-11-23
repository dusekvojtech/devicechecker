import { FC } from 'react';
import { useRecoilState } from 'recoil';

import userAtom from '../atoms/user';

const DeviceList: FC = () => {
  const [user] = useRecoilState(userAtom);
  return (
    <div>
      <h2>Device List {user?.name}</h2>
    </div>
  );
};

export default DeviceList;
