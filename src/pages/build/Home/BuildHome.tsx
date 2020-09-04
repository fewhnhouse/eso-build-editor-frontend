import React, { useState, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import Flex from '../../../components/Flex'
import { Collapse, Skeleton, Empty } from 'antd'
import { useQuery } from 'react-apollo'
import { BUILD_REVISIONS } from '../../home/UserHomeCard'
import { IBuildRevision, IBuild } from '../BuildStateContext'
import { Redirect } from 'react-router-dom'
import SimpleCard from '../../../components/SimpleCard'

const { Panel } = Collapse
const Container = styled(Flex)`
  padding: ${(props) => props.theme.paddings.medium};
  overflow: auto;
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

  const [activeKeys, setActiveKeys] = useState<string[]>([])
  const [redirect, setRedirect] = useState('')

  const builds: IBuild[] = useMemo(
    () =>
      data?.buildRevisions
        ?.map((revision: IBuildRevision) =>
          revision.builds.length ? revision.builds[0] : []
        )
        .flat() ?? [],
    [data]
  )

  useEffect(() => {
    if (builds) {
      const active = CLASSES.map((esoClass, index) => ({
        key: esoClass,
        index,
      }))
        .filter((esoClass) =>
          builds.find((build) => build.esoClass === esoClass.key)
        )
        .map((esoClass) => esoClass.index + '')
      setActiveKeys(active)
    }
  }, [builds])

  const handleRedirect = (path: string) => () => {
    setRedirect(path)
  }

  if (redirect) {
    return <Redirect push to={redirect} />
  }

  return (
    <Container fluid direction='column'>
      <Collapse
        onChange={(keys) => setActiveKeys(keys as string[])}
        activeKey={activeKeys}
        style={{ width: '100%' }}
      >
        {CLASSES.map((esoClass, index) => (
          <StyledPanel header={esoClass} key={index}>
            <Skeleton loading={loading}>
              <BuildsContainer fluid>
                {builds.filter((build) => build.esoClass === esoClass)
                  .length ? (
                  builds
                    .filter((build) => build.esoClass === esoClass)
                    .map((build) => (
                      <SimpleCard
                        key={build.id}
                        item={build}
                        onEditRedirect={handleRedirect(
                          `/editBuild/${build.id}/0`
                        )}
                        onOpenRedirect={handleRedirect(`/builds/${build.id}`)}
                        imageSrc={build.esoClass}
                      />
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
