import React, { useState } from 'react'
import { List, Card, Typography, Divider, Icon } from 'antd'
import styled from 'styled-components'
import { Redirect } from 'react-router'
import { applicationAreas } from '../raid/general/RaidGeneral'
import Flex from '../../components/Flex'
import Scrollbars from 'react-custom-scrollbars'
import { useMediaQuery } from 'react-responsive'

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
  background: white;
  border-bottom-left-radius: ${(props: { isMobile: boolean }) =>
    props.isMobile ? '0px' : '10px'};
  border-bottom-right-radius: ${(props: { isMobile: boolean }) =>
    props.isMobile ? '0px' : '10px'};
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
  loading: boolean
}

const RaidCard = ({ data, loading }: IUserDataProps) => {
  const [path, setRedirect] = useState('')

  const handleClick = (path: string) => () => {
    setRedirect(path)
  }
  const isMobile = useMediaQuery({ maxWidth: 800 })

  if (path !== '') {
    return <Redirect push to={`${path}`} />
  }
  return (
    <Scrollbars style={{ height: 'calc(100% - 120px)' }}>
      <StyledList
        isMobile={isMobile}
        loading={loading}
        dataSource={data}
        renderItem={(item, index) => {
          const raid = data[index]
          const applicationArea = applicationAreas.find(
            area => area.key === raid.applicationArea
          )
          const size = raid.roles.reduce((prev, curr) => {
            return prev + curr.builds.length
          }, 0)
          return (
            <List.Item style={{ justifyContent: 'center' }}>
              <StyledCard
                key={raid.id}
                hoverable
                onClick={handleClick(`/raids/${raid.id}`)}
              >
                <Title>
                  <Flex direction='row' justify='space-between'>
                    {raid.name ? raid.name : 'Unnamed raid'}
                    <Text>
                      <Icon type='team' />
                      {size}
                    </Text>
                  </Flex>
                </Title>
                <Divider style={{ margin: '5px 0px' }} />
                <Description>
                  {applicationArea ? applicationArea.label : ''}
                </Description>
              </StyledCard>
            </List.Item>
          )
        }}
      />
    </Scrollbars>
  )
}

export default RaidCard
