import React, { useState } from 'react'
import { Select, Avatar, List, Button } from 'antd'
import styled from 'styled-components'
import { Redirect } from 'react-router-dom'
import { IGroupBuild } from '../GroupStateContext'

const ActionButton = styled(Button)`
  width: 50px;
`

const SinglePlayerContainer = styled.div`
  width: 100%;
  max-width: 700px;
  height: 100%;
`

const StyledList = styled(List)`
  overflow: auto;
  height: calc(100% - 30px);
`

const ListMeta = styled(List.Item.Meta)`
  padding: ${(props) => props.theme.paddings.small};
  text-align: start;
`

const ListItem = styled(List.Item)`
  padding: 0;
  margin: ${(props) => props.theme.margins.small};
`

interface ISingleGroupReviewProps {
  members: string[]
  groupBuilds: IGroupBuild[]
}

export default ({ members, groupBuilds }: ISingleGroupReviewProps) => {
  const [redirect, setRedirect] = useState('')

  const [selectedMember, setSelectedMember] = useState<string | undefined>(
    undefined
  )

  const onChange = (value: string) => {
    setSelectedMember(value)
  }

  const handleClick = (path: string) => () => {
    setRedirect(path)
  }

  if (redirect) {
    return <Redirect push to={redirect} />
  }
  return (
    <SinglePlayerContainer>
      <Select
        showSearch
        value={selectedMember}
        size='large'
        style={{ width: '100%' }}
        placeholder='Select a person'
        optionFilterProp='children'
        onChange={onChange}
        filterOption
      >
        {members.map((member, index) => (
          <Select.Option key={index} value={member}>
            {member}
          </Select.Option>
        ))}
      </Select>
      <StyledList
        dataSource={groupBuilds.filter(
          (build) => selectedMember && build.members.includes(selectedMember)
        )}
        renderItem={(build: any, index: number) => {
          const actualBuild = build.build
          return (
            <ListItem
              actions={[
                <ActionButton
                  onClick={handleClick(`/editBuild/${actualBuild.id}/0`)}
                  size='small'
                  type='default'
                  key='list-edit'
                >
                  Edit
                </ActionButton>,
                <ActionButton
                  onClick={handleClick(`/builds/${actualBuild.id}`)}
                  size='small'
                  type='primary'
                  key='list-view'
                >
                  View
                </ActionButton>,
              ]}
            >
              <ListMeta
                style={{ textAlign: 'start' }}
                avatar={
                  <Avatar
                    src={`${process.env.REACT_APP_IMAGE_SERVICE}/classes/${actualBuild.esoClass}.png`}
                  />
                }
                title={actualBuild.name}
                description={actualBuild.description}
              />
            </ListItem>
          )
        }}
      />
    </SinglePlayerContainer>
  )
}
