import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { Divider, Typography, Select, Input, Icon, Radio } from 'antd'
import Flex from '../../../components/Flex'
import { GroupContext } from '../GroupStateContext'
import { accessRightOptions } from '../../build/RaceAndClass/RaceClass'
import { RadioChangeEvent } from 'antd/lib/radio'
import TextArea from 'antd/lib/input/TextArea'

const RadioIcon = styled(Icon)`
  margin-right: 5px;
`

const GeneralContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
`

const StyledFlex = styled(Flex)`
  width: ${props => props.theme.widths.medium};
  margin: ${props => props.theme.margins.small};
`

const StyledWideFlex = styled(Flex)`
  width: ${props => props.theme.widths.medium};
  flex: 1;
`

const StyledArea = styled(TextArea)`
  width: ${props => props.theme.widths.medium};
`

const StyledInput = styled(Input)`
  width: ${props => props.theme.widths.medium};
`

interface IGroupGeneralProps {
  edit?: boolean
}

export default ({ edit }: IGroupGeneralProps) => {
  const [state, dispatch] = useContext(GroupContext)
  const { name, description, accessRights, members } = state!

  useEffect(() => {
    if (!edit) {
      localStorage.setItem('groupState', JSON.stringify(state))
    }
  }, [state, edit])

  const handleGroupNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch!({ type: 'SET_GROUP_NAME', payload: { name: e.target.value } })
  }

  const handleGroupDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    dispatch!({
      type: 'SET_GROUP_DESCRIPTION',
      payload: { description: e.target.value },
    })
  }

  const handleAccessRightsChange = (e: RadioChangeEvent) => {
    dispatch!({
      type: 'SET_GROUP_ACCESS_RIGHTS',
      payload: { accessRights: e.target.value },
    })
  }

  function handleMembersChange(members: string[]) {
    dispatch!({
      type: 'SET_GROUP_MEMBERS',
      payload: { members },
    })
  }

  return (
    <>
      <Divider>General Information</Divider>
      <GeneralContainer>
        <Flex direction='column' justify='space-around' align='center'>
          <StyledFlex
            direction='column'
            justify='flex-start'
            align='flex-start'
          >
            <Typography.Text strong>Group name</Typography.Text>
            <StyledInput
              size='large'
              placeholder='Type name...'
              value={name}
              onChange={handleGroupNameChange}
            />
          </StyledFlex>
          <StyledWideFlex
            direction='column'
            justify='flex-start'
            align='flex-start'
          >
            <Typography.Text strong>Description</Typography.Text>
            <StyledArea
              placeholder='Type description...'
              value={description}
              onChange={handleGroupDescriptionChange}
            />
          </StyledWideFlex>
          <StyledFlex
            direction='column'
            justify='flex-start'
            align='flex-start'
          >
            <Typography.Text strong>Group Members</Typography.Text>
            <Select
              size='large'
              mode='tags'
              value={members}
              placeholder='Add members by typing and separating by comma or space'
              style={{ width: '100%' }}
              onChange={handleMembersChange}
              tokenSeparators={[',', ' ']}
            ></Select>
          </StyledFlex>
          <Divider>Access Rights</Divider>
          <Radio.Group
            size='large'
            value={accessRights}
            onChange={handleAccessRightsChange}
            defaultValue={accessRights}
            buttonStyle='solid'
          >
            {accessRightOptions.map(el => (
              <Radio.Button value={el.key}>
                <RadioIcon type={el.icon} />
                {el.label}
              </Radio.Button>
            ))}
          </Radio.Group>{' '}
        </Flex>
      </GeneralContainer>
    </>
  )
}
