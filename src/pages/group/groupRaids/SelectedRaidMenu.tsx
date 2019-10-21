import React, { useState, useContext, CSSProperties } from 'react'
import styled from 'styled-components'
import { GroupContext } from '../GroupStateContext'
import { Divider, Button, Input, Select, Card, Typography } from 'antd'
import Flex from '../../../components/Flex'
import { applicationAreas } from '../../build/RaceAndClass/RaceClass'
import DroppableRaidsList from './DroppableRaidsList'
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

export default () => {
  const [selectedAppArea, setSelectedAppArea] = useState<string[]>([])
  const [expanded, setExpanded] = useState(false)
  const [searchText, setSearchText] = useState('')

  const [state, dispatch] = useContext(GroupContext)
  const { raids } = state!

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
        <DroppableRaidsList
          raids={raids}
          dropType={'addRaid'}
          dispatchType={'ADD_RAID'}
        />
      </>
    </ListContainer>
  )
}
