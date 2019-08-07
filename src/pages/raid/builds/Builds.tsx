import React, { useContext, useEffect } from 'react';
import BuildMenu from './BuildMenu';
import Roles from './Roles';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { RaidContext } from '../RaidStateContext';

export default () => {
  const [state] = useContext(RaidContext);

  useEffect(() => {
    localStorage.setItem('raidState', JSON.stringify(state));
  }, [state]);
  return (
    <DndProvider backend={HTML5Backend}>
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
    </DndProvider>
  );
};
