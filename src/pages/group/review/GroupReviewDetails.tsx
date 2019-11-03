import React from 'react'
import styled from 'styled-components'
import { IGroupState } from '../GroupStateContext'
import Flex from '../../../components/Flex'
import { Divider, Table, Tag, Typography, Tooltip, Button } from 'antd'
import { ISortedBuild } from '../../raid/RaidStateContext'
import { IBuild, ISetSelection } from '../../build/BuildStateContext'
import { ISet } from '../../../components/GearSlot'
import { useMediaQuery } from 'react-responsive'
import { ColumnFilterItem } from 'antd/lib/table'
import { Link } from 'react-router-dom'
import Scrollbars from 'react-custom-scrollbars'

const ReviewContainer = styled.div`
  width: 100%;
  height: calc(100% - 140px);
  padding: ${props => props.theme.paddings.medium};
`

const Icon = styled.img`
  width: ${props => props.theme.smallIcon.width};
  height: ${props => props.theme.smallIcon.height};
  border-radius: ${props => props.theme.borderRadius};
`

interface IGroupReviewDetailsProps {
  local?: boolean
  loadedData: IGroupState
}
export default ({ loadedData }: IGroupReviewDetailsProps) => {
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
    key: index + 1,
    dataIndex: member,
    title: (
      <div
        style={{
          width: 80,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {member}
      </div>
    ),
    sorter: (a: any, b: any) => {
      return a[member].length - b[member].length
    },
    render: (tag: any) => (
      <div style={{ width: 100 }}>
        <Tag
          style={{ marginLeft: 20 }}
          color={tag === 'yes' ? 'green' : 'red'}
          key={tag}
        >
          {tag}
        </Tag>
      </div>
    ),
  }))

  const columns = [
    {
      key: 0,
      dataIndex: 'build',
      title: <div style={{ width: isMobile ? 100 : 310 }}>Build</div>,
      filters: [
        {
          text: 'Sorcerer',
          value: 'sorcerer',
        },
        {
          text: 'Templar',
          value: 'templar',
        },
        {
          text: 'Dragonknight',
          value: 'dragonknight',
        },
        {
          text: 'Necromancer',
          value: 'necromancer',
        },
        {
          text: 'Warden',
          value: 'warden',
        },
        {
          text: 'Nightblade',
          value: 'nightblade',
        },
      ] as ColumnFilterItem[],
      onFilter: (value: string, record: any) => {
        return record.build.esoClass.toLowerCase() === value.toLowerCase()
      },
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
            <Typography.Text style={{ margin: 0 }} strong>
              {build.name}
            </Typography.Text>
          ) : (
            <Flex direction='column' style={{ maxWidth: 310 }}>
              <Flex
                align='center'
                justify='space-between'
                style={{ width: '100%' }}
              >
                <Flex
                  justify='flex-start'
                  align='center'
                  style={{ width: '100%', maxWidth: 250 }}
                >
                  <Icon
                    src={`${process.env.REACT_APP_IMAGE_SERVICE}/classes/${build.esoClass}.png`}
                  />
                  <Divider type='vertical' style={{ margin: '0px 5px' }} />

                  <Icon
                    src={`${process.env.REACT_APP_IMAGE_SERVICE}/races/${build.race}.png`}
                  />
                  <Divider type='vertical' style={{ margin: '0px 5px' }} />

                  <Typography.Title
                    style={{
                      margin: 0,
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                    }}
                    level={4}
                  >
                    {build.name}
                  </Typography.Title>
                </Flex>
                <Tooltip title='Go to build'>
                  <Link to={`/builds/${build.id}`}>
                    <Button ghost icon='select' type='primary' />
                  </Link>
                </Tooltip>
              </Flex>
              <Scrollbars autoHide style={{ width: '100%', height: '40px' }}>
                <Flex
                  align='center'
                  style={{
                    width: '100%',
                    maxWidth: '310px',
                  }}
                >
                  {sets.map(set => (
                    <Tag style={{ margin: 5 }}>{set.name}</Tag>
                  ))}
                </Flex>
              </Scrollbars>
            </Flex>
          )
        ) : null
      },
      width: isMobile ? 100 : 350,
      fixed: 'left' as any,
    },
    ...memberColumns,
  ]

  const memberSource = groupBuilds.map((build, index) => {
    const finalMembers = members.reduce((prev, curr) => {
      const found = build.members.find(buildMember => buildMember === curr)
      return found ? { ...prev, [curr]: 'yes' } : { ...prev, [curr]: 'no' }
    }, {})
    const actualBuild = uniqueBuilds.find(
      uniqueBuild => uniqueBuild.build.id === build.build.id
    )
    return {
      key: index,
      build: actualBuild ? actualBuild.build : undefined,
      ...finalMembers,
    }
  })

  return (
    <ReviewContainer>
      <Table
        dataSource={memberSource}
        columns={columns}
        scroll={{
          x: true,
          y: document.body.clientHeight - 280,
        }}
      />
    </ReviewContainer>
  )
}
