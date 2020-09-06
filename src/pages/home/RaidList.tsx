import React, { useState } from 'react'
import { Divider, Select } from 'antd'
import { applicationAreas } from '../raid/general/RaidGeneral'
import { useMediaQuery } from 'react-responsive'
import { Redirect } from 'react-router'
import { TeamOutlined } from '@ant-design/icons'
import {
  StyledScrollbars,
  StyledList,
  ListItem,
  ActionButton,
  ListMeta,
} from './StyledComponents'
import { useQuery } from 'react-apollo'
import { titleCase } from '../raid/builds/BuildMenu'
import ListWrapper from './ListWrapper'
import { IRaidRevision } from '../raid/RaidStateContext'
import { RAID_REVISIONS } from './HorizontalRaidCards'

const { Option } = Select

interface IOwner {
  name: string
}

interface IBuild {
  id: number
  name: string
  esoClass: string
  race: string
  applicationArea: string
  owner: IOwner
}

interface IRaidRoleProps {
  builds: IBuild[]
}

interface IRaidProps {
  id: number
  name: string
  applicationArea: string
  owner: IOwner
  roles: IRaidRoleProps[]
}

interface IUserDataProps {
  data: IRaidProps[]
  loading: boolean
  onCardClick?: any
}

const RaidList = () => {
  const [search, setSearch] = useState('')
  const [selectedApplicationAreas, setSelectedApplicationAreas] = useState<
    string[]
  >([])
  const [expanded, setExpanded] = useState(false)

  const raidRevisionsQuery = useQuery(RAID_REVISIONS, {
    variables: {
      where: {
        raids_some: {
          AND: [
            {
              OR: [
                { name_contains: search },
                { name_contains: search.toLowerCase() },
                { name_contains: search.toUpperCase() },
                { name_contains: titleCase(search) },
              ],
            },
            {
              applicationArea_in: selectedApplicationAreas.length
                ? selectedApplicationAreas
                : applicationAreas.map((area) => area.key),
            },
          ],
        },
      },
    },
  })

  const handleExpandChange = () => {
    setExpanded((expanded) => !expanded)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleAppAreaChange = (applicationAreas: string[]) => {
    setSelectedApplicationAreas(applicationAreas)
  }

  return (
    <ListWrapper
      placeholder='Search for Raids...'
      expanded={expanded}
      handleExpandChange={handleExpandChange}
      search={search}
      handleSearchChange={handleSearchChange}
      InnerList={
        <InnerList
          loading={raidRevisionsQuery.loading}
          data={
            raidRevisionsQuery?.data?.raidRevisions
              .filter((revision: IRaidRevision) => revision.raids.length)
              .map((revision: IRaidRevision) => revision.raids[0]) ?? []
          }
        />
      }
    >
      {expanded && (
        <Select
          mode='multiple'
          style={{ width: '100%', marginTop: 10 }}
          placeholder='Filter by Application Area...'
          onChange={handleAppAreaChange}
        >
          {applicationAreas.map((area, index) => (
            <Option value={area.key} key={area.key}>
              {area.label}
            </Option>
          ))}
        </Select>
      )}
    </ListWrapper>
  )
}

const InnerList = ({ data, loading }: IUserDataProps) => {
  const isMobile = useMediaQuery({ maxWidth: 800 })
  const [path, setRedirect] = useState('')

  const handleClick = (path: string) => () => {
    setRedirect(path)
  }

  if (path) {
    return <Redirect push to={`${path}`} />
  }
  return (
    <StyledScrollbars>
      <StyledList
        isMobile={isMobile}
        loading={loading}
        dataSource={data}
        renderItem={(item, index) => {
          const raid = data[index]
          const applicationArea = applicationAreas.find(
            (area) => area.key === raid.applicationArea
          )
          const size = raid.roles.reduce((prev, curr) => {
            return prev + curr.builds.length
          }, 0)
          return (
            <ListItem
              actions={[
                <ActionButton
                  onClick={handleClick(`/editRaid/${raid.id}/0`)}
                  size='small'
                  type='default'
                  key='list-edit'
                >
                  Edit
                </ActionButton>,
                <ActionButton
                  onClick={handleClick(`/raids/${raid.id}`)}
                  size='small'
                  type='primary'
                  key='list-view'
                >
                  View
                </ActionButton>,
              ]}
            >
              <ListMeta
                style={{ textAlign: 'start' }}
                title={
                  <>
                    <TeamOutlined />
                    {size}
                    <Divider type='vertical' />
                    {raid.name || ''}
                  </>
                }
                description={applicationArea?.label || ''}
              />
            </ListItem>
          )
        }}
      />
    </StyledScrollbars>
  )
}

export default RaidList
