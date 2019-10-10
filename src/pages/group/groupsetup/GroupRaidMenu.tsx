import React, { useState } from 'react'
import styled from 'styled-components'
import Flex from '../../../components/Flex'
import { Input, Icon } from 'antd'
import RaidCard from '../../home/RaidList'
import { OWN_RAIDS } from '../../home/UserHomeCard'
import { useQuery } from 'react-apollo'
import { titleCase } from '../../raid/builds/BuildMenu'
import { applicationAreas } from '../../raid/general/RaidGeneral'

const ListContainer = styled.div`
  border: 1px solid rgb(217, 217, 217);
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: width 0.2s ease-in-out;
  min-width: 300px;
`

const StyledFlex = styled(Flex)`
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 6px 0px;
  padding: ${props => props.theme.paddings.mini};
  transition: opacity 0.2s ease-in-out;
`

const StyledFlexFull = styled(Flex)`
  width: 100%;
`

export default ({ selectRaid }: any) => {
  const [search, setSearch] = useState('')

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleEditorClick = (id: string) => () => {
    //const raidQuery = useQuery(RAID, { variables: { id } })
    selectRaid(id)
  }

  const [selectedApplicationAreas, setSelectedApplicationAreas] = useState<
    string[]
  >([])

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

  return (
    <ListContainer>
      <h3>Select a raid for group:</h3>
      <StyledFlex direction='column' justify='center' align='center'>
        <StyledFlexFull justify='space-between'>
          <Input
            placeholder={'Search for raids'}
            value={search}
            onChange={handleSearchChange}
            addonAfter={<Icon type='search' />}
            defaultValue='mysite'
          />
        </StyledFlexFull>
      </StyledFlex>
      <RaidCard
        onCardClick={handleEditorClick}
        loading={raidsQuery.loading}
        data={
          raidsQuery.data && raidsQuery.data.ownRaids
            ? raidsQuery.data.ownRaids
            : []
        }
      />
    </ListContainer>
  )
}
