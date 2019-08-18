import React, { useState } from 'react'
import { List, Card, Typography, Divider } from 'antd'
import styled from 'styled-components'
import { Redirect } from 'react-router'

const { Text } = Typography

const Description = styled.div`
  font-size: 14px;
  line-height: 1.5;
  color: ${(props: { newEffect?: boolean }) =>
    props.newEffect ? '#2ecc71' : 'rgba(0, 0, 0, 0.45)'};
  text-align: left;
`

const Title = styled.div`
  font-size: 16px;
  line-height: 1.5;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  margin-bottom: 8px;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: left;
`

const StyledCard = styled(Card)`
  border-color: rgb(232, 232, 232);
  background: 'white';
  border-width: 2px;
  margin: 10px;
  width: 90%;
  max-width: 400px;
`

const StyledList = styled(List)`
  overflow-y: scroll;
  height: 300px;
  background: white;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`

interface IOwnerProps {
  name: string
}

interface IBuildProps {
  id: number
  name: string
  esoClass: string
  race: string
  applicationArea: string
  owner: IOwnerProps
}

interface IRaidRoleProps {
  builds: IBuildProps[]
}

interface IRaidProps {
  id: number
  name: string
  applicationArea: string
  owner: IOwnerProps
  roles: IRaidRoleProps[]
}

interface IUserDataProps {
  data: IRaidProps[]
  filterText: string
}

const RaidCard = ({ data, filterText }: IUserDataProps) => {
  const [path, setRedirect] = useState('')

  const handleClick = (path: string) => {
    setRedirect(path)
  }

  if (path !== '') {
    return <Redirect push to={`${path}`} />
  }
  const filteredData = data.filter(raid => raid.name.includes(filterText))
  return (
    <StyledList
      dataSource={filteredData}
      renderItem={(item, index) => {
        const raid = filteredData[index]
        return (
          <List.Item style={{ justifyContent: 'center' }}>
            <StyledCard
              key={raid.id}
              hoverable
              onClick={() => handleClick(`/raidReview/${raid.id}`)}
            >
              <Title>
                {raid.name ? raid.name : 'Unnamed raid'}{' '}
                <Text style={{ fontWeight: 'normal' }}>
                  {raid.applicationArea}
                </Text>
              </Title>
              <Description>
                Group size:{' '}
                {raid.roles.reduce(
                  (prev, curr) => prev + curr.builds.length,
                  0
                )}
                <br />
                Created by {raid.owner.name}
              </Description>
            </StyledCard>
          </List.Item>
        )
      }}
    />
  )
}

export default RaidCard
