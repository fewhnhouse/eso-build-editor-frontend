import React from 'react';
import BuildMenu from './BuildMenu';
import Roles from './Roles';

export default () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <BuildMenu />
      <Roles />
    </div>
  );
};
