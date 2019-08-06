import React, { useState, useContext } from 'react';
import Flex from '../../../components/Flex';
import { Divider, Button, Empty, Input, Icon, Typography } from 'antd';
import { RaidContext, IRole } from '../RaidStateContext';
import styled from 'styled-components';
import { useDrop } from 'react-dnd';
import BuildCard from './BuildCard';
const { Search } = Input;

const RoleContainer = styled.div`
  width: 100%;
  padding: 20px;
`;

const RoleDropContainer = styled.div`
  width: 100%;
  height: 200px;
  text-align: center;
  background: #fafafa;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px dashed #d9d9d9;
`;

const RoleDropper = ({ role }: { role: IRole }) => {
  const [state, dispatch] = useContext(RaidContext);
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: 'build',
    drop: (item: any, monitor) => {
      console.log(item);
      dispatch!({
        type: 'ADD_BUILD',
        payload: { roleName: role.roleName, build: item.build },
      });
    },
    collect: monitor => ({
      canDrop: !!monitor.canDrop(),
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <RoleContainer>
      <RoleDropContainer ref={drop}>
        <Icon style={{ width: 100, height: 100, fontSize: 50 }} type="inbox" />
        <Typography.Title style={{ color: '#d9d9d9' }} level={3}>
          Drag a build here
        </Typography.Title>
      </RoleDropContainer>
    </RoleContainer>
  );
};
export default () => {
  const [state, dispatch] = useContext(RaidContext);
  const { roles } = state!;
  const [role, setRole] = useState('');

  const handleBtnClick = () => {
    dispatch!({ type: 'ADD_ROLE', payload: { role } });
    setRole('');
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRole(e.target.value);
  };
  return (
    <Flex
      direction="column"
      justify="flex-start"
      align="center"
      fluid
      style={{ flex: 2, overflowY: 'auto' }}
    >
      {roles &&
        roles.length > 0 &&
        roles.map((role, index) => (
          <React.Fragment key={'dropper-' + index}>
            <Divider>{role.roleName}</Divider>
            <Flex
              direction="row"
              justify="space-between"
              style={{ flexWrap: 'wrap', width: "100%", padding: 20 }}
              align="center"
            >
              {role.builds.map((build, buildIndex) => (
                <BuildCard
                  style={{ width: 400 }}
                  key={`buildCard-${index}-${buildIndex}`}
                  item={build}
                />
              ))}
            </Flex>
            <RoleDropper role={role} />
          </React.Fragment>
        ))}
      <Divider>
        <Search
          value={role}
          onChange={handleRoleChange}
          style={{ width: 400 }}
          type="text"
          onSearch={handleBtnClick}
          enterButton={
            <Button disabled={role === ''} type="primary" icon="plus">
              Add Role
            </Button>
          }
          placeholder="Type a role name here..."
        />
      </Divider>
      {roles && roles.length === 0 && (
        <Empty
          style={{ marginTop: '30%' }}
          description="Add a new role to begin."
        />
      )}
    </Flex>
  );
};
