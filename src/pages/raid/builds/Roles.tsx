import React, { useState, useContext } from 'react';
import Flex from '../../../components/Flex';
import { Divider, Button, Empty, Input, Icon, Typography, Card } from 'antd';
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

const StyledButton = styled(Button)`
  margin: 0px 5px;
  width: 100px;
`;

const RoleDropper = ({ role }: { role: IRole }) => {
  const [, dispatch] = useContext(RaidContext);
  const [, drop] = useDrop({
    accept: 'build',
    drop: (item: any, monitor) => {
      console.log(item);
      dispatch!({
        type: 'ADD_BUILD',
        payload: { name: role.name, build: item.build },
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
  const [edit, setEdit] = useState(false);
  const [editRole, setEditRole] = useState('');

  const handleBtnClick = () => {
    dispatch!({ type: 'ADD_ROLE', payload: { name: role } });
    setRole('');
  };

  const handleEditClick = (roleName: string) => () => {
    setEdit(true);
    setEditRole(roleName);
  };

  const handleDeleteClick = (roleName: string) => () => {
    dispatch!({
      type: 'REMOVE_ROLE',
      payload: { name: roleName },
    });
  };

  const handleSaveClick = (oldRoleName: string) => () => {
    dispatch!({
      type: 'EDIT_ROLE',
      payload: { oldRoleName, newRoleName: editRole },
    });
    setEdit(false);
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRole(e.target.value);
  };

  const handleEditRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditRole(e.target.value);
  };

  const handleCancelClick = () => {
    setEdit(false);
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
          <Card
            style={{ width: '80%', margin: 20 }}
            key={'dropper-' + index}
            title={
              <Flex direction="row" justify="space-between">
                {edit ? (
                  <Input
                    style={{ maxWidth: 400 }}
                    placeholder="Type a role name here..."
                    size="large"
                    value={editRole}
                    onChange={handleEditRoleChange}
                  />
                ) : (
                  <Typography.Title level={2}>{role.name}</Typography.Title>
                )}
                <Flex direction="row">
                  {edit ? (
                    <>
                      <StyledButton icon="close" onClick={handleCancelClick}>
                        Cancel
                      </StyledButton>
                      <StyledButton
                        icon="save"
                        ghost
                        type="primary"
                        onClick={handleSaveClick(role.name)}
                      >
                        Save
                      </StyledButton>
                    </>
                  ) : (
                    <>
                      <StyledButton
                        icon="delete"
                        ghost
                        type="danger"
                        onClick={handleDeleteClick(role.name)}
                      >
                        Delete
                      </StyledButton>
                      <StyledButton
                        icon="edit"
                        ghost
                        type="primary"
                        onClick={handleEditClick(role.name)}
                      >
                        Edit
                      </StyledButton>
                    </>
                  )}
                </Flex>
              </Flex>
            }
          >
            <Flex
              direction="row"
              justify="space-between"
              style={{ flexWrap: 'wrap', width: '100%', padding: 20 }}
              align="center"
            >
              {role.builds.map((build, buildIndex) => (
                <BuildCard
                  draggable={false}
                  role={role}
                  style={{ width: 400 }}
                  key={`buildCard-${index}-${buildIndex}`}
                  item={build}
                />
              ))}
            </Flex>
            <RoleDropper role={role} />
          </Card>
        ))}
      <Divider>
        <Search
          value={role}
          size="large"
          onChange={handleRoleChange}
          style={{ width: 400 }}
          type="text"
          onSearch={handleBtnClick}
          enterButton={
            <Button
              disabled={
                role === '' ||
                roles && roles.find(
                  existingRole => existingRole && existingRole.name === role
                ) !== undefined
              }
              type="primary"
              icon="plus"
            >
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
