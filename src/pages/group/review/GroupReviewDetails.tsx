import React, { useEffect, useContext } from 'react'
import styled from 'styled-components'
import { GroupContext, IGroupState } from '../GroupStateContext'
import Flex from '../../../components/Flex'
import { Divider, Table, Tag, Typography } from 'antd'
import { ISortedBuild } from '../../raid/RaidStateContext'
import { IBuild, ISetSelection } from '../../build/BuildStateContext'
import { ISet } from '../../../components/GearSlot'
import { useMediaQuery } from 'react-responsive'

const ReviewContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: ${props => props.theme.paddings.medium};
`

const Icon = styled.img`
  width: ${props => props.theme.smallIcon.width};
  height: ${props => props.theme.smallIcon.height};
  margin-right: ${props => props.theme.margins.mini};
  border-radius: ${props => props.theme.borderRadius};
`

interface IGroupReviewDetailsProps {
  local?: boolean
  loadedData: IGroupState
}
export default ({ local, loadedData }: IGroupReviewDetailsProps) => {
  const { groupBuilds, raids, members } = loadedData!
  const flattenedBuilds = raids
    .map(raid => raid.roles)
    .flat()
    .map(roles => roles.builds)
    .flat()
  const isMobile = useMediaQuery({ maxWidth: 800 })

  const uniqueBuilds = flattenedBuilds.reduce<ISortedBuild[]>(
    (prev, curr) =>
      prev.find(build => build.build.id === curr.build.id)
        ? prev
        : [...prev, curr],
    []
  )

  const memberColumns = members.map((member, index) => ({
    key: index,
    dataIndex: member,
    title: member,
    render: (tag: any) =>
      tag ? (
        <Tag color='green' key={tag}>
          {tag}
        </Tag>
      ) : (
        <Tag color='red'>No</Tag>
      ),
  }))

  const columns = [
    {
      key: -1,
      dataIndex: 'build',
      title: 'Build',
      render: (build: IBuild) => {
        const {
          frontbarSelection,
          backbarSelection,
          smallPieceSelection,
          bigPieceSelection,
          jewelrySelection,
        } = build
        const concat = frontbarSelection.concat(
          backbarSelection,
          smallPieceSelection,
          bigPieceSelection,
          jewelrySelection
        )

        const sets = concat.reduce(
          (prev: ISet[], curr: ISetSelection) => {
            const isExisting = prev.find(
              set =>
                set && curr.selectedSet && set.name === curr.selectedSet.name
            )
            if (!isExisting) {
              return curr.selectedSet ? [...prev, curr.selectedSet] : prev
            } else {
              return prev
            }
          },
          [] as ISet[]
        )
        return build ? (
          isMobile ? (
            <Typography.Title style={{ margin: 0 }} level={4}>
              {build.name}
            </Typography.Title>
          ) : (
            <Flex direction='column'>
              <Flex align='center'>
                <Icon
                  src={`${process.env.REACT_APP_IMAGE_SERVICE}/classes/${build.esoClass}.png`}
                />
                <Divider type='vertical' />

                <Icon
                  src={`${process.env.REACT_APP_IMAGE_SERVICE}/races/${build.race}.png`}
                />
                <Divider type='vertical' />

                <Typography.Title style={{ margin: 0 }} level={3}>
                  {build.name}
                </Typography.Title>
              </Flex>
              <Flex align='center'>
                {sets.map(set => (
                  <Tag style={{ margin: 5 }}>{set.name}</Tag>
                ))}
              </Flex>
            </Flex>
          )
        ) : null
      },
      width: isMobile ? 100 : 250,
      fixed: 'left' as any,
    },
    ...memberColumns,
  ]

  const memberSource = groupBuilds.map((build, index) => {
    const members = build.members.reduce(
      (prev, curr) => ({ ...prev, [curr]: 'Yes' }),
      {}
    )
    const actualBuild = uniqueBuilds.find(
      uniqueBuild => uniqueBuild.build.id === build.build.id
    )
    return {
      key: index,
      build: actualBuild ? actualBuild.build : undefined,
      ...members,
    }
  })

  return (
    <ReviewContainer>
      <Table
        dataSource={memberSource}
        columns={columns}
        scroll={{ x: document.body.clientWidth }}
      />
    </ReviewContainer>
  )
}
