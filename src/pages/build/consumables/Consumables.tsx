import React, { useContext, useEffect } from 'react';
import BuffMenu from './BuffMenu';
import MundusMenu from './MundusMenu';
import { BuildContext } from '../BuildStateContext';

export default ({ edit }: { edit: boolean }) => {
  const [state] = useContext(BuildContext);

  useEffect(() => {
    if (!edit) {
      localStorage.setItem('buildState', JSON.stringify(state));
    }
  }, [state]);
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <BuffMenu />
      <MundusMenu />
    </div>
  );
};
