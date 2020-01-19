import React, { useState } from 'react'
import styled from 'styled-components'
import Flex from '../../../components/Flex'
import { Card, Collapse, Skeleton, Empty, Icon } from 'antd'
import { useQuery } from 'react-apollo'
import { OWN_RAIDS } from '../../home/UserHomeCard'
import { Redirect } from 'react-router-dom'
import { applicationAreas } from '../general/RaidGeneral'
import { IRaidState } from '../RaidStateContext'

const { Panel } = Collapse
const Container = styled(Flex)`
  padding: ${props => props.theme.paddings.medium};
  overflow: auto;
`

const RaidCard = styled(Card)`
  margin: ${props => `0px ${props.theme.margins.small}`};
  width: 300px;
`

const RaidsContainer = styled(Flex)`
  overflow: auto;
`

const StyledPanel = styled(Panel)`
  width: 100%;
`

export default () => {
  const { loading, data } = useQuery(OWN_RAIDS)

  const [redirect, setRedirect] = useState('')
  const handleRedirect = (path: string) => () => {
    setRedirect(path)
  }
  const raids: IRaidState[] = data?.ownRaids ?? []

  if (redirect) {
    return <Redirect push to={redirect} />
  }

  const active = applicationAreas
    .map((area, index) => ({ ...area, index }))
    .filter(applicationArea =>
      raids.find(raid => raid.applicationArea === applicationArea.key)
    )
    .map(area => area.index + '')

  return (
    <Container fluid direction='column'>
      <Collapse activeKey={active} style={{ width: '100%' }}>
        {applicationAreas.map((applicationArea, index) => (
          <StyledPanel header={applicationArea.label} key={index}>
            <Skeleton loading={loading}>
              <RaidsContainer fluid>
                {raids.filter(
                  raid => raid.applicationArea === applicationArea.key
                ).length ? (
                  raids
                    .filter(
                      raid => raid.applicationArea === applicationArea.key
                    )
                    .map(raid => (
                      <RaidCard
                        actions={[
                          <Icon
                            onClick={handleRedirect(`/editRaid/${raid.id}/0`)}
                            key='build-edit'
                            type='edit'
                            title='Edit'
                          />,
                          <Icon
                            onClick={handleRedirect(`/raids/${raid.id}`)}
                            key='build-open'
                            type='select'
                            title='Open'
                          />,
                        ]}
                        key={raid.id}
                      >
                        <Card.Meta
                          title={raid.name}
                          description={raid.description}
                        />
                      </RaidCard>
                    ))
                ) : (
                  <Empty />
                )}
              </RaidsContainer>
            </Skeleton>
          </StyledPanel>
        ))}
      </Collapse>
    </Container>
  )
}
