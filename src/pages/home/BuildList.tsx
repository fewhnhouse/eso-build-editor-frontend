import React, { useState } from 'react'
import { Avatar, Select } from 'antd'
import { Redirect } from 'react-router'
import { applicationAreas } from '../build/RaceAndClass/RaceClass'
import { useMediaQuery } from 'react-responsive'
import { IBuild, IBuildRevision } from '../build/BuildStateContext'
import {
  StyledScrollbars,
  StyledList,
  ListItem,
  ActionButton,
  ListMeta,
} from './StyledComponents'
import { classes, races } from '../build/RaceAndClass/data'
import { useQuery } from 'react-apollo'
import { titleCase } from '../raid/builds/BuildMenu'
import ListWrapper from './ListWrapper'
import { BUILD_REVISIONS } from './HorizontalBuildCards'

const { Option } = Select

interface IUserDataProps {
  data: IBuild[]
  loading: boolean
}

const BuildList = () => {
  const [search, setSearch] = useState('')
  const [selectedRaces, setSelectedRaces] = useState<string[]>([])
  const [selectedClasses, setSelectedClasses] = useState<string[]>([])
  const [expanded, setExpanded] = useState(false)

  const buildRevisionsQuery = useQuery(BUILD_REVISIONS, {
    variables: {
      where: {
        builds_some: {
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
              race_in: selectedRaces.length
                ? selectedRaces
                : races.map((race) => race.title),
            },
            {
              esoClass_in: selectedClasses.length
                ? selectedClasses
                : classes.map((esoClass) => esoClass.title),
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
  const handleClassSelectChange = (classes: string[]) => {
    setSelectedClasses(classes)
  }
  const handleRaceSelectChange = (races: string[]) => {
    setSelectedRaces(races)
  }

  return (
    <ListWrapper
      placeholder='Search for Groups...'
      expanded={expanded}
      handleExpandChange={handleExpandChange}
      search={search}
      handleSearchChange={handleSearchChange}
      InnerList={
        <InnerList
          loading={buildRevisionsQuery.loading}
          data={
            buildRevisionsQuery?.data?.buildRevisions
              .filter((revision: IBuildRevision) => revision.builds.length)
              .map((revision: IBuildRevision) => revision.builds[0]) ?? []
          }
        />
      }
    >
      {expanded && (
        <>
          <Select
            mode='multiple'
            style={{ width: '100%', marginTop: 10 }}
            placeholder='Filter by class...'
            onChange={handleClassSelectChange}
          >
            {classes.map((esoClass, index) => (
              <Option value={esoClass.title} key={esoClass.title}>
                {esoClass.title}
              </Option>
            ))}
          </Select>

          <Select
            mode='multiple'
            style={{ width: '100%', marginTop: 10 }}
            placeholder='Filter by race...'
            onChange={handleRaceSelectChange}
          >
            {races.map((race, index) => (
              <Option value={race.title} key={race.title}>
                {race.title}
              </Option>
            ))}
          </Select>
        </>
      )}
    </ListWrapper>
  )
}

const InnerList = ({ data, loading }: IUserDataProps) => {
  const [path, setRedirect] = useState('')

  const handleClick = (path: string) => () => {
    setRedirect(path)
  }
  const isMobile = useMediaQuery({ maxWidth: 800 })

  if (path !== '') {
    return <Redirect push to={`${path}`} />
  }

  return (
    <StyledScrollbars>
      <StyledList
        isMobile={isMobile}
        loading={loading}
        dataSource={data}
        renderItem={(_, index: number) => {
          const build = data[index]
          const applicationArea = applicationAreas.find(
            (area) => area.key === build.applicationArea
          )
          return (
            <ListItem
              actions={[
                <ActionButton
                  onClick={handleClick(`/editBuild/${build.id}/0`)}
                  size='small'
                  type='default'
                  key='list-edit'
                >
                  Edit
                </ActionButton>,
                <ActionButton
                  onClick={handleClick(`/builds/${build.id}`)}
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
                avatar={
                  <Avatar
                    src={`${process.env.REACT_APP_IMAGE_SERVICE}/classes/${build.esoClass}.png`}
                  />
                }
                title={build.name || ''}
                description={applicationArea?.label || ''}
              />
            </ListItem>
          )
        }}
      />
    </StyledScrollbars>
  )
}

export default BuildList
