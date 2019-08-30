import React, { useState } from 'react'
import styled from 'styled-components'
import Flex from '../../../components/Flex'
import { Card, Typography, Divider, Button } from 'antd'
import { IRaidState, IRole } from '../RaidStateContext'
import { Redirect } from 'react-router'
import BuildCard from '../builds/BuildCard'
import InformationCard from '../../../components/InformationCard'
import { applicationAreas } from '../general/RaidGeneral'

const { Title } = Typography

const Wrapper = styled(Flex)`
  padding: 20px;
`

const RaidContent = styled(Flex)`
  width: 100%;
  flex-wrap: wrap;
  flex: 1;
  max-height: ${(props: { local?: boolean }) =>
    props.local ? '80%' : '90%'};
`

const BuildInformation = styled(Card)`
  flex: 2;
  flex-wrap: wrap;
  overflow: auto;
  height: 100%;
  min-width: 400px;
`
const CardList = styled(Flex)`
  flex-wrap: wrap;
`

const ExpandButton = styled(Button)`
  position: absolute;
  top: 10px;
  right: 10px;
`

interface IRaidReviewDetailsProps {
  loadedData: IRaidState
  local?: boolean
}

const RaidReviewDetails = ({ loadedData, local }: IRaidReviewDetailsProps) => {
  const { name, roles, applicationArea, description, published } = loadedData
  const [path] = useState('')
  const [expand, setExpand] = useState(true)
  const area = applicationAreas.find(area => area.key === applicationArea)
  const handleExpandChange = () => {
    setExpand(prev => !prev)
  }
  if (path !== '') {
    return <Redirect push to={`${path}`} />
  } else {
    return (
      <Wrapper direction='column' fluid justify='flex-start'>
        <Flex
          direction='column'
          align='center'
          justify='center'
          style={{ width: '100%' }}
        >
          <Typography.Title>{name}</Typography.Title>

          {local && (
            <Flex direction='row'>
              <InformationCard
                icon='edit'
                title='Description'
                description={description}
              />
              <Divider
                type='vertical'
                style={{ height: 50, margin: '0px 20px' }}
              />
              <InformationCard
                icon='environment'
                title='Application Area'
                description={area ? area.label : ''}
              />
              <Divider
                type='vertical'
                style={{ height: 50, margin: '0px 20px' }}
              />
              <InformationCard
                icon='team'
                title='Group Size'
                description={roles.reduce(
                  (prev: number, curr: IRole) => prev + curr.builds.length,
                  0
                )}
              />
              <Divider
                type='vertical'
                style={{ height: 50, margin: '0px 20px' }}
              />
              <InformationCard
                icon={published ? 'unlock' : 'lock'}
                title='Access Rights'
                description={published ? 'Public' : 'Private'}
              />
            </Flex>
          )}
        </Flex>
        <RaidContent local={local} direction='row' align='flex-start'>
          <BuildInformation title={<Title level={2}>Builds</Title>}>
            <ExpandButton
              onClick={handleExpandChange}
              icon={expand ? 'shrink' : 'arrows-alt'}
            ></ExpandButton>
            {roles.map((role, index) => {
              return (
                <React.Fragment key={index}>
                  <Divider>
                    <Title level={3}>{role.name}</Title>
                  </Divider>
                  <CardList direction='row' justify='space-around'>
                    {role.builds.map((build, index) => {
                      return (
                        <BuildCard
                          expand={expand}
                          item={build.build}
                          draggable={false}
                          key={index}
                        />
                      )
                    })}
                  </CardList>
                </React.Fragment>
              )
            })}
          </BuildInformation>
        </RaidContent>
      </Wrapper>
    )
  }
}
export default RaidReviewDetails
