import React, { useState } from "react"
import styled from "styled-components"
import Flex from "../../components/Flex"
import { Typography, Button, Input, Icon, Select } from "antd"
import { Redirect } from "react-router"
import RaidCard from "./RaidCard"
import BuildCard from "./BuildCard"
import { useQuery } from "react-apollo"
import gql from "graphql-tag"
import { classes, races } from "../build/RaceAndClass/data"
import { titleCase } from "../raid/builds/BuildMenu"
import { applicationAreas } from "../raid/general/RaidGeneral"
import { useMediaQuery } from "react-responsive"

const { Title } = Typography

const { Option } = Select

const CardContainer = styled(Flex)`
  justify-content: center;
  flex: 1;
  height: ${(props: { isMobile: boolean }) =>
    props.isMobile ? "calc(100vh - 120px)" : "700px"};
`

const ListCard = styled.div`
  width: ${(props: { isMobile: boolean }) => (props.isMobile ? "100%" : "80%")};
  height: ${(props: { isMobile: boolean }) =>
    props.isMobile ? "100%" : "80%"};
  min-width: 400px;
  display: flex;
  flex-direction: column;
  max-width: 450px;
  margin: ${(props: { isMobile: boolean }) =>
    props.isMobile ? "0px" : "20px"};
  border-radius: ${(props: { isMobile: boolean }) =>
    props.isMobile ? "0px" : "10px"};
  box-shadow: ${(props: { isMobile: boolean }) =>
    props.isMobile ? "" : "0px 0px 5px 2px rgba(0, 0, 0, 0.2)"};
`
const CardTitle = styled(Title)`
  display: flex;
  margin-bottom: 0;
  width: 100%;
  justify-content: space-between;
`

const CardHeader = styled(Flex)`
  background-color: ${(props: { isMobile: boolean }) =>
    props.isMobile ? "transparent" : "#e8e8e8"};
  margin-bottom: 0;
  padding: 20px;
  border-top-left-radius: ${(props: { isMobile: boolean }) =>
    props.isMobile ? "0px" : "10px"};
  border-top-right-radius: ${(props: { isMobile: boolean }) =>
    props.isMobile ? "0px" : "10px"};
`
export const ME = gql`
  query {
    me {
      id
      name
      builds {
        id
        owner {
          id
          name
        }
        name
        esoClass
        race
        applicationArea
      }
      raids {
        id
        owner {
          id
          name
        }
        name
        applicationArea
        roles {
          id
          builds {
            id
          }
        }
      }
    }
  }
`

export const OWN_BUILDS = gql`
  query ownBuilds(
    $where: BuildWhereInput
    $orderBy: BuildOrderByInput
    $first: Int
    $last: Int
    $skip: Int
    $after: String
    $before: String
  ) {
    ownBuilds(
      where: $where
      orderBy: $orderBy
      first: $first
      last: $last
      skip: $skip
      after: $after
      before: $before
    ) {
      id
      owner {
        id
        name
      }
      name
      esoClass
      race
      applicationArea
    }
  }
`

export const OWN_RAIDS = gql`
  query ownRaids(
    $where: RaidWhereInput
    $orderBy: RaidOrderByInput
    $first: Int
    $last: Int
    $skip: Int
    $after: String
    $before: String
  ) {
    ownRaids(
      where: $where
      orderBy: $orderBy
      first: $first
      last: $last
      skip: $skip
      after: $after
      before: $before
    ) {
      id
      owner {
        id
        name
      }
      name
      applicationArea
      roles {
        id
        builds {
          id
        }
      }
    }
  }
`

export default ({ isBuild }: { isBuild: boolean }) => {
  const [redirect, setRedirect] = useState("")
  const [search, setSearch] = useState("")
  const [selectedRaces, setSelectedRaces] = useState<string[]>([])
  const [selectedApplicationAreas, setSelectedApplicationAreas] = useState<
    string[]
  >([])
  const [selectedClasses, setSelectedClasses] = useState<string[]>([])
  const [expanded, setExpanded] = useState(false)
  const isMobile = useMediaQuery({ maxWidth: 800 })

  const buildsQuery = useQuery(OWN_BUILDS, {
    variables: {
      where: {
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
              : races.map(race => race.title),
          },
          {
            esoClass_in: selectedClasses.length
              ? selectedClasses
              : classes.map(esoClass => esoClass.title),
          },
        ],
      },
    },
  })
  const raidsQuery = useQuery(OWN_RAIDS, {
    variables: {
      where: {
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
              : applicationAreas.map(area => area.key),
          },
        ],
      },
    },
  })
  const handleExpandChange = () => {
    setExpanded(expanded => !expanded)
  }
  const handleCreateClick = (path: string) => () => {
    setRedirect(path)
  }
  if (redirect !== "") {
    return <Redirect to={redirect} push />
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
  const handleAppAreaChange = (applicationAreas: string[]) => {
    setSelectedApplicationAreas(applicationAreas)
  }
  return (
    <CardContainer
      isMobile={isMobile}
      direction="column"
      justify="center"
      align="center"
    >
      <ListCard isMobile={isMobile}>
        <CardHeader
          isMobile={isMobile}
          direction="column"
          justify="center"
          align="center"
        >
          {!isMobile && (
            <CardTitle level={3}>
              {isBuild ? "My builds" : "My raids"}
              <div>
                <Button
                  type="primary"
                  ghost={true}
                  onClick={handleCreateClick(
                    isBuild ? "/buildEditor/0" : "/raidEditor/0"
                  )}
                >
                  Create
                </Button>
              </div>
            </CardTitle>
          )}
          <Flex style={{ width: "100%" }} justify="space-between">
            <Input
              placeholder={isBuild ? "Search for builds" : "Search for raids"}
              value={search}
              onChange={handleSearchChange}
              addonAfter={<Icon type="search" />}
              defaultValue="mysite"
            />
            <Button
              type="primary"
              icon={expanded ? "shrink" : "arrows-alt"}
              ghost={true}
              style={{ marginLeft: 5 }}
              onClick={handleExpandChange}
            ></Button>
          </Flex>
          {expanded &&
            (isBuild ? (
              <>
                <Select
                  mode="multiple"
                  style={{ width: "100%", marginTop: 10 }}
                  placeholder="Filter by class..."
                  onChange={handleClassSelectChange}
                >
                  {classes.map((esoClass, index) => (
                    <Option key={esoClass.title}>{esoClass.title}</Option>
                  ))}
                </Select>

                <Select
                  mode="multiple"
                  style={{ width: "100%", marginTop: 10 }}
                  placeholder="Filter by race..."
                  onChange={handleRaceSelectChange}
                >
                  {races.map((race, index) => (
                    <Option key={race.title}>{race.title}</Option>
                  ))}
                </Select>
              </>
            ) : (
              <Select
                mode="multiple"
                style={{ width: "100%", marginTop: 10 }}
                placeholder="Filter by Application Area..."
                onChange={handleAppAreaChange}
              >
                {applicationAreas.map((area, index) => (
                  <Option key={area.key}>{area.label}</Option>
                ))}
              </Select>
            ))}
        </CardHeader>
        {isBuild ? (
          <BuildCard
            loading={buildsQuery.loading}
            data={
              buildsQuery.data && buildsQuery.data.ownBuilds
                ? buildsQuery.data.ownBuilds
                : []
            }
          />
        ) : (
          <RaidCard
            loading={raidsQuery.loading}
            data={
              raidsQuery.data && raidsQuery.data.ownRaids
                ? raidsQuery.data.ownRaids
                : []
            }
          />
        )}
      </ListCard>
    </CardContainer>
  )
}
