import React, { useState, useContext } from 'react'
import Flex from '../../../components/Flex'
import { Divider, Button, Empty, Input, Icon, Typography, Card } from 'antd'
import { RaidContext, IRole } from '../RaidStateContext'
import styled from 'styled-components'
import { useDrop } from 'react-dnd'
import BuildCard from './BuildCard'
import Scrollbars from 'react-custom-scrollbars'
const { Search } = Input

const RoleContainer = styled.div`
  width: 100%;
`

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
`

const StyledCard = styled(Card)`
  width: calc(100% - 40px);
  margin: ${props => props.theme.margins.medium};
`

const StyledButton = styled(Button)`
  margin: 0px 5px;
  width: 100px;
`

const StyledInput = styled(Input)`
  max-width: ${props => props.theme.widths.medium};
`

const StyledBuildCard = styled(BuildCard)`
  width: ${props => props.theme.widths.medium};
`

const StyledSearch = styled(Search)`
  width: ${props => props.theme.widths.medium};
`

const StyledIcon = styled(Icon)`
  width: 100px;
  height: 100px;
  font-size: 50px;
`

const StyledTitle = styled(Typography.Title)`
  color: #d9d9d9;
`

const StyledScrollbars = styled(Scrollbars)`
  min-width: 460px;
`

const StyledFlex = styled(Flex)`
  flex: 2;
`

const StyledFlexRoles = styled(Flex)`
  width: 100%;
`

const StyledEmpty = styled(Empty)`
  margin-top: 30%;
`

const RoleDropper = ({ role }: { role: IRole }) => {
  const [, dispatch] = useContext(RaidContext)
  const [, drop] = useDrop({
    accept: 'build',
    drop: (item: any, monitor) => {
      dispatch!({
        type: 'ADD_BUILD',
        payload: { name: role.name, build: item.build },
      })
    },
    collect: monitor => ({
      canDrop: !!monitor.canDrop(),
      isOver: !!monitor.isOver(),
    }),
  })

  return (
    <RoleContainer>
      <RoleDropContainer ref={drop}>
        <StyledIcon type='inbox' />
        <StyledTitle level={3}>Drag a build here</StyledTitle>
      </RoleDropContainer>
    </RoleContainer>
  )
}
export default () => {
  const [state, dispatch] = useContext(RaidContext)
  const { roles } = state!
  const [role, setRole] = useState('')
  const [edit, setEdit] = useState(false)
  const [editRole, setEditRole] = useState('')

  const handleBtnClick = () => {
    dispatch!({ type: 'ADD_ROLE', payload: { name: role } })
    setRole('')
  }

  const handleEditClick = (roleName: string) => () => {
    setEdit(true)
    setEditRole(roleName)
  }

  const handleDeleteClick = (roleName: string) => () => {
    dispatch!({
      type: 'REMOVE_ROLE',
      payload: { name: roleName },
    })
  }

  const handleSaveClick = (oldRoleName: string) => () => {
    dispatch!({
      type: 'EDIT_ROLE',
      payload: { oldRoleName, newRoleName: editRole },
    })
    setEdit(false)
  }

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRole(e.target.value)
  }

  const handleEditRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditRole(e.target.value)
  }

  const handleCancelClick = () => {
    setEdit(false)
  }

  return (
    <StyledScrollbars autoHide>
      <StyledFlex direction='column' justify='flex-start' align='center' fluid>
        {roles &&
          roles.length > 0 &&
          roles.map((role, index) => (
            <StyledCard
              key={'dropper-' + index}
              title={
                <Flex direction='row' justify='space-between'>
                  {edit ? (
                    <StyledInput
                      placeholder='Type a role name here...'
                      size='large'
                      value={editRole}
                      onChange={handleEditRoleChange}
                    />
                  ) : (
                    <Typography.Title level={2}>{role.name}</Typography.Title>
                  )}
                  <Flex direction='row'>
                    {edit ? (
                      <>
                        <StyledButton icon='close' onClick={handleCancelClick}>
                          Cancel
                        </StyledButton>
                        <StyledButton
                          icon='save'
                          ghost
                          type='primary'
                          onClick={handleSaveClick(role.name)}
                        >
                          Save
                        </StyledButton>
                      </>
                    ) : (
                      <>
                        <StyledButton
                          icon='delete'
                          ghost
                          type='danger'
                          onClick={handleDeleteClick(role.name)}
                        >
                          Delete
                        </StyledButton>
                        <StyledButton
                          icon='edit'
                          ghost
                          type='primary'
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
              <StyledFlexRoles
                direction='row'
                justify='space-between'
                align='center'
                wrap
              >
                {role.builds.map((build, buildIndex) => (
                  <StyledBuildCard
                    expand
                    draggable={false}
                    role={role}
                    key={`buildCard-${index}-${buildIndex}`}
                    item={build.build}
                  />
                ))}
              </StyledFlexRoles>
              <RoleDropper role={role} />
            </StyledCard>
          ))}
        <Divider>
          <StyledSearch
            value={role}
            size='large'
            onChange={handleRoleChange}
            type='text'
            onSearch={handleBtnClick}
            enterButton={
              <Button
                disabled={
                  role === '' ||
                  (roles &&
                    roles.find(
                      existingRole => existingRole && existingRole.name === role
                    ) !== undefined)
                }
                type='primary'
                icon='plus'
              >
                Add Role
              </Button>
            }
            placeholder='Type a role name here...'
          />
        </Divider>
        {roles && roles.length === 0 && (
          <StyledEmpty description='Add a new role to begin.' />
        )}
      </StyledFlex>
    </StyledScrollbars>
  )
}
