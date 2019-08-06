import React, { useState, useContext } from 'react';
import Flex from '../../../components/Flex';
import { Divider, Button, Empty, Input, Icon, Typography } from 'antd';
import { RaidContext } from '../RaidStateContext';
import styled from 'styled-components';
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
export default () => {
  const [state, dispatch] = useContext(RaidContext);
  const { roles } = state!;
  const [role, setRole] = useState('');
  console.log(roles);

  const handleBtnClick = () => {
    console.log('reducing', role);

    dispatch!({ type: 'ADD_ROLE', payload: { role } });
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
      style={{ flex: 1, overflowY: "auto" }}
    >
      {roles &&
        roles.length > 0 &&
        roles.map(role => (
          <RoleContainer>
            <Divider>{role}</Divider>
            <RoleDropContainer>
              <Icon
                style={{ width: 100, height: 100, fontSize: 50 }}
                type="inbox"
              />
              <Typography.Title style={{color: "#d9d9d9"}} level={3}>Drag a build here</Typography.Title>
            </RoleDropContainer>
          </RoleContainer>
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
