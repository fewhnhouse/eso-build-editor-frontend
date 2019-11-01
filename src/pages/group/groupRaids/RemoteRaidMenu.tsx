import React, { useState, useContext, useEffect } from 'react'
import { Divider, Input, Select, Button } from 'antd'
import styled from 'styled-components'
import Flex from '../../../components/Flex'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'
import { IRaidState } from '../../raid/RaidStateContext'
import { applicationAreas } from '../../build/RaceAndClass/RaceClass'
import { GroupContext } from '../GroupStateContext'
import DroppableRaidsList from './DroppableRaidsList'
import { variableRaid, linearBuild } from '../../../util/fragments'
const { Option } = Select

const ListContainer = styled.div`
  width: 100%;
  max-width: 420px;
  min-width: 370px;
  border: 1px solid rgb(217, 217, 217);
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: width 0.2s ease-in-out;
`

const StyledFlexOuter = styled(Flex)`
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 6px 0px;
  padding: ${props => props.theme.paddings.mini};
  transition: opacity 0.2s ease-in-out;
`

const StyledFlexInner = styled(Flex)`
  width: 100%;
`

const StyledInput = styled(Input)`
  width: 100%;
  margin: ${props => props.theme.paddings.small};
`

const StyledDivider = styled(Divider)`
  margin: ${props => props.theme.paddings.small} 0px;
`

const StyledFlexExpanded = styled(Flex)`
  margin: 0px ${props => props.theme.paddings.small};
  overflow: auto;
  width: 100%;
`

export function titleCase(str: string): string {
  let string = str.toLowerCase().split(' ')
  for (var i = 0; i < string.length; i++) {
    string[i] = string[i].charAt(0).toUpperCase() + string[i].slice(1)
  }
  return string.join(' ')
}

export const GET_RAIDS = gql`
  query raids(
    $where: RaidWhereInput
    $orderBy: RaidOrderByInput
    $first: Int
    $last: Int
    $skip: Int
    $after: String
    $before: String
  ) {
    raids(
      where: $where
      orderBy: $orderBy
      first: $first
      last: $last
      skip: $skip
      after: $after
      before: $before
    ) {
      ...Raid
    }
  }
  ${variableRaid(linearBuild)}
`

export default () => {
  const [selectedAppArea, setSelectedAppArea] = useState<string[]>([])
  const [state] = useContext(GroupContext)
  const { raids } = state!

  const [expanded, setExpanded] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [remoteRaids, setRemoteRaids] = useState<IRaidState[]>([])

  // const [, dispatch] = useContext(RaidContext);
  const { loading, data } = useQuery<{ raids: IRaidState[] }, {}>(GET_RAIDS, {
    variables: {
      where: {
        AND: [
          {
            OR: [
              { name_contains: searchText },
              { name_contains: searchText.toLowerCase() },
              { name_contains: searchText.toUpperCase() },
              { name_contains: titleCase(searchText) },
            ],
          },
          {
            applicationArea_in: selectedAppArea.length
              ? selectedAppArea
              : applicationAreas.map(appArea => appArea.key),
          },
        ],
      },
    },
  })

  useEffect(() => {
    if (data && data.raids) {
      const newRaids = data.raids.filter(remoteRaid => {
        const exists = raids.find(raid => raid.id === remoteRaid.id)
        return exists === undefined
      })
      setRemoteRaids(newRaids)
    }
  }, [raids, data])

  const handleAreaSelectChange = (classes: string[]) => {
    setSelectedAppArea(classes)
  }

  const handleExpandChange = () => {
    setExpanded(expanded => !expanded)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }
  return (
    <ListContainer>
      <>
        <StyledFlexOuter direction='column' justify='center' align='center'>
          <StyledFlexInner direction='row' justify='center' align='center'>
            <StyledInput
              placeholder='Search for Raids'
              allowClear
              value={searchText}
              onChange={handleSearchChange}
              size='large'
              type='text'
            />
            <Button
              size='large'
              icon={expanded ? 'shrink' : 'arrows-alt'}
              onClick={handleExpandChange}
            />
          </StyledFlexInner>
          {expanded && (
            <>
              <StyledDivider />
              <StyledFlexExpanded
                direction='row'
                justify='center'
                align='center'
              >
                <Select
                  mode='multiple'
                  style={{ width: '100%', margin: '5px 10px' }}
                  placeholder='Filter by Application Area...'
                  onChange={handleAreaSelectChange}
                >
                  {applicationAreas.map((applicationArea, index) => (
                    <Option key={applicationArea.key}>
                      {applicationArea.label}
                    </Option>
                  ))}
                </Select>
              </StyledFlexExpanded>
            </>
          )}
        </StyledFlexOuter>
        {data && data.raids && (
          <DroppableRaidsList
            raids={remoteRaids}
            loading={loading}
            dropType={'removeRaid'}
            dispatchType={'REMOVE_RAID'}
          />
        )}
      </>
    </ListContainer>
  )
}
