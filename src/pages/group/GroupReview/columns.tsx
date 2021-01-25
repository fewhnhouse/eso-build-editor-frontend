import { Typography, Divider, Tooltip, Tag } from 'antd'
import Flex from '../../../components/Flex'
import { Link } from 'react-router-dom'
import React from 'react'
import { IBuild } from '../../build/BuildStateContext'
import styled from 'styled-components'
import { ColumnFilterItem } from 'antd/lib/table/interface'

const Icon = styled.img`
  width: 20px;
  height: 20px;
  border-radius: ${(props) => props.theme.borderRadius};
`

const StyledText = styled(Typography.Text)`
  display: block;
  margin: 0px;
  max-width: 150px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  &:hover {
    color: black;
  }
`

export const getMemberColumns = (members: string[]) =>
  members.map((member, index) => ({
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

export const getColumns = (isMobile: boolean, members: string[]) => [
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
    onFilter: (value: any, record: any) => {
      return record.build.esoClass.toLowerCase() === value.toLowerCase()
    },
    render: (build?: IBuild) => {
      if (!build) {
        return null
      }

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
                  width={16}
                  height={16}
                  src={`${process.env.REACT_APP_IMAGE_SERVICE}/classes/${build.esoClass}.png`}
                />
                <Divider type='vertical' style={{ margin: '0px 5px' }} />

                <Tooltip title='Go to build'>
                  <Link to={`/builds/${build.id}`}>
                    <StyledText>{build.name}</StyledText>
                  </Link>
                </Tooltip>
              </Flex>
            </Flex>
          </Flex>
        )
      ) : null
    },
    width: isMobile ? 100 : 350,
    fixed: 'left' as any,
  },
  ...getMemberColumns(members),
]
