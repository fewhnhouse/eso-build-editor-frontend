import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Flex from '../../../components/Flex'
import { Collapse, Skeleton, Empty } from 'antd'
import { useQuery } from 'react-apollo'
import { OWN_RAIDS } from '../../home/UserHomeCard'
import { Redirect } from 'react-router-dom'
import { applicationAreas } from '../general/RaidGeneral'
import { IRaidState } from '../RaidStateContext'
import SimpleCard from '../../../components/SimpleCard'

const { Panel } = Collapse
const Container = styled(Flex)`
  padding: ${props => props.theme.paddings.medium};
  overflow: auto;
`

const RaidsContainer = styled(Flex)`
  overflow: auto;
`

const StyledPanel = styled(Panel)`
  width: 100%;
`

export default () => {
  const { loading, data } = useQuery(OWN_RAIDS)

  const [activeKeys, setActiveKeys] = useState<string[]>([])
  const [redirect, setRedirect] = useState('')

  const raids: IRaidState[] = data?.ownRaids ?? []

  useEffect(() => {
    if (raids) {
      const active = applicationAreas
        .map((area, index) => ({ ...area, index }))
        .filter(applicationArea =>
          raids.find(raid => raid.applicationArea === applicationArea.key)
        )
        .map(area => area.index + '')
      setActiveKeys(active)
    }
  }, [raids])

  const handleRedirect = (path: string) => () => {
    setRedirect(path)
  }

  if (redirect) {
    return <Redirect push to={redirect} />
  }

  return (
    <Container fluid direction='column'>
      <Collapse
        onChange={keys => setActiveKeys(keys as string[])}
        activeKey={activeKeys}
        style={{ width: '100%' }}
      >
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
                      <SimpleCard
                        key={raid.id}
                        onEditRedirect={handleRedirect(
                          `/editRaid/${raid.id}/0`
                        )}
                        onOpenRedirect={handleRedirect(`/raids/${raid.id}`)}
                        item={raid}
                      />
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
