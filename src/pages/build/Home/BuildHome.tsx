import React, { useState } from 'react'
import styled from 'styled-components'
import Flex from '../../../components/Flex'
import { Card, Collapse, Skeleton, Empty, Icon, Avatar } from 'antd'
import { useQuery } from 'react-apollo'
import { BUILD_REVISIONS } from '../../home/UserHomeCard'
import { IBuildRevision, IBuild } from '../BuildStateContext'
import { Redirect } from 'react-router-dom'

const { Panel } = Collapse
const Container = styled(Flex)`
  padding: ${props => props.theme.paddings.medium};
  overflow: auto;
`

const BuildCard = styled(Card)`
  margin: ${props => `0px ${props.theme.margins.small}`};
  width: 300px;
`

const BuildsContainer = styled(Flex)`
  overflow: auto;
`

const StyledPanel = styled(Panel)`
  width: 100%;
`

const CLASSES = [
  'Sorcerer',
  'Templar',
  'Nightblade',
  'Dragonknight',
  'Warden',
  'Necromancer',
]
export default () => {
  const { loading, data } = useQuery(BUILD_REVISIONS)

  const [redirect, setRedirect] = useState('')
  const handleRedirect = (path: string) => () => {
    setRedirect(path)
  }
  const builds: IBuild[] =
    data?.buildRevisions
      ?.map((revision: IBuildRevision) =>
        revision.builds.length ? revision.builds[0] : []
      )
      .flat() ?? []

  if (redirect) {
    return <Redirect push to={redirect} />
  }

  const active = CLASSES.map((esoClass, index) => ({ key: esoClass, index }))
    .filter(esoClass => builds.find(build => build.esoClass === esoClass.key))
    .map(esoClass => esoClass.index + '')

  return (
    <Container fluid direction='column'>
      <Collapse activeKey={active} style={{ width: '100%' }}>
        {CLASSES.map((esoClass, index) => (
          <StyledPanel header={esoClass} key={index}>
            <Skeleton loading={loading}>
              <BuildsContainer fluid>
                {builds.filter(build => build.esoClass === esoClass).length ? (
                  builds
                    .filter(build => build.esoClass === esoClass)
                    .map(build => (
                      <BuildCard
                        actions={[
                          <Icon
                            onClick={handleRedirect(`/editBuild/${build.id}/0`)}
                            key='build-edit'
                            type='edit'
                            title='Edit'
                          />,
                          <Icon
                            onClick={handleRedirect(`/builds/${build.id}`)}
                            key='build-open'
                            type='select'
                            title='Open'
                          />,
                        ]}
                        key={build.id}
                      >
                        <Card.Meta
                          avatar={
                            <Avatar
                              src={`${process.env.REACT_APP_IMAGE_SERVICE}/classes/${build.esoClass}.png`}
                            />
                          }
                          title={build.name}
                          description={build.description}
                        />
                      </BuildCard>
                    ))
                ) : (
                  <Empty />
                )}
              </BuildsContainer>
            </Skeleton>
          </StyledPanel>
        ))}
      </Collapse>
    </Container>
  )
}
