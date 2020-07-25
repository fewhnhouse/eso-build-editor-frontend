import React, { useContext } from 'react'
import styled from 'styled-components'
import Flex from '../../../components/Flex'
import { Select, Divider } from 'antd'
import BuildCard from '../../raid/builds/BuildCard'
import { classes } from '../../build/RaceAndClass/data'
import { GroupContext } from '../GroupStateContext'

const { Option } = Select

const StyledSelect = styled(Select)`
  width: 100%;
`
const AssignmentContainer = styled.div`
  width: 100%;
  height: 100%;
`

const BuildsContainer = styled(Flex)`
  width: 100%;
  overflow: auto;
`

const MembersContainer = styled(Flex)`
  width: 100%;
  height: 100px;
  overflow: auto;
  margin-bottom: ${(props) => props.theme.margins.medium};
`

export default () => {
  const [state] = useContext(GroupContext)
  const { groupBuilds } = state!

  return (
    <AssignmentContainer>
      {classes.map((esoClass) => {
        const classBuilds = groupBuilds.filter(
          (groupBuild) => groupBuild.build.esoClass === esoClass.title
        )

        return classBuilds.length ? (
          <>
            <Divider>{esoClass.title}</Divider>
            <BuildsContainer
              direction='row'
              justify='flex-start'
              align='center'
            >
              {classBuilds.map((groupBuild) => (
                <BuildCard
                  key={groupBuild.build.id}
                  item={groupBuild.build}
                  draggable={false}
                  additionalContent={
                    <MemberSelector id={groupBuild.build.id || ''} />
                  }
                />
              ))}
            </BuildsContainer>
          </>
        ) : null
      })}
    </AssignmentContainer>
  )
}

const MemberSelector = ({ id }: { id: string }) => {
  const [state, dispatch] = useContext(GroupContext)
  const { members, groupBuilds } = state!

  const groupBuild = groupBuilds.find((build) => build.build.id === id)

  const handleSelectChange = (values: unknown) => {
    dispatch!({
      type: 'SET_BUILD_MEMBERS',
      payload: { members: values, buildId: id },
    })
  }
  return (
    <MembersContainer align='center' direction='column'>
      <Divider>Members</Divider>
      <StyledSelect
        value={groupBuild ? groupBuild.members : []}
        onChange={handleSelectChange}
        size='large'
        mode='multiple'
      >
        {members.map((member) => (
          <Option value={member} key={member}>
            {member}
          </Option>
        ))}
      </StyledSelect>
    </MembersContainer>
  )
}
