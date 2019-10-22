import React, { useEffect, useContext } from 'react'
import styled from 'styled-components'
import { GroupContext } from '../GroupStateContext'
import Flex from '../../../components/Flex'
import { Card, Divider } from 'antd'
import { applicationAreas } from '../../raid/general/RaidGeneral'
import { ISortedBuild } from '../../raid/RaidStateContext'

const ReviewContainer = styled.div`
  width: 100%;
  height: 100%;
`

const BuildsContainer = styled(Flex)`
  width: 100%;
  flex-wrap: wrap;
  padding: ${props => props.theme.paddings.medium};
`

const SimpleBuildCard = styled(Card)`
  margin: ${props => props.theme.margins.mini};
`

export default ({ edit }: { edit?: boolean }) => {
  const [state, dispatch] = useContext(GroupContext)
  const { buildsMembers, raids } = state!

  useEffect(() => {
    if (!edit) {
      localStorage.setItem('groupState', JSON.stringify(state))
    }
  }, [state, edit])

  const flattenedBuilds = raids
    .map(raid => raid.roles)
    .flat()
    .map(roles => roles.builds)
    .flat()

  const uniqueBuilds = flattenedBuilds.reduce<ISortedBuild[]>(
    (prev, curr) =>
      prev.find(build => build.build.id === curr.build.id)
        ? prev
        : [...prev, curr],
    []
  )

  return (
    <ReviewContainer>
      {applicationAreas.map(area => {
        const areaBuilds = uniqueBuilds.filter(
          build => build.build.applicationArea === area.key
        )
        return (
          <>
            <Divider>{area.label}</Divider>
            <BuildsContainer direction='row' justify='center'>
              {areaBuilds.map(build => {
                const buildMembers = buildsMembers.find(
                  member => member.buildId === build.id
                )
                return (
                  <SimpleBuildCard title={build.build.name} size='small'>
                    {buildMembers
                      ? buildMembers.members.map(member => {
                          return <p>{member}</p>
                        })
                      : 'No members.'}
                  </SimpleBuildCard>
                )
              })}
            </BuildsContainer>
          </>
        )
      })}
    </ReviewContainer>
  )
}
