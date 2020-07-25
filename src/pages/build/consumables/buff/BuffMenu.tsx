import React, { useState } from 'react'
import { Divider, Input, Button, Select } from 'antd'
import styled from 'styled-components'
import Flex from '../../../../components/Flex'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'
import { buff } from '../../../../util/fragments'
import { titleCase } from '../../../raid/builds/BuildMenu'
import BuffMenuList from './BuffMenuList'
import { ShrinkOutlined, ArrowsAltOutlined } from '@ant-design/icons'

const { Option } = Select

export interface ISpecialBuff {
  id?: string
  name: string
  buffDescription: string
  description: string
  duration: number
  notes: string
  icon: string
  type?: string
  buffType: string
  quality: 1 | 2 | 3 | 4
}

const GET_BUFFS = gql`
  query buffs($where: BuffWhereInput!) {
    buffs(where: $where) {
      ...Buff
    }
  }
  ${buff}
`
const ListContainer = styled.div`
  flex: 1;
  border: 1px solid rgb(217, 217, 217);
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: width 0.2s ease-in-out;
`

const StyledFlex = styled(Flex)`
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 6px 0px;
  padding: ${(props) => props.theme.paddings.mini};
  transition: opacity 0.2s ease-in-out;
`

const StyledInnerFlex = styled(Flex)`
  width: 100%;
`

const StyledExpandedFlex = styled(Flex)`
  margin: 0px ${(props) => props.theme.margins.small};
  overflow: auto;
  width: 100%;
`

const StyledInput = styled(Input)`
  margin: 10px;
  width: 100%;
`

export const StyledDivider = styled(Divider)`
  margin: ${(props) => props.theme.margins.small} 0px;
`

const buffTypes = [
  'Health Recovery',
  'Stamina Recovery',
  'Magicka Recovery',
  'Max Health',
  'Max Stamina',
  'Max Magicka',
]

const buffQualities = ['Standard', 'Difficult', 'Complex', 'Legendary']

interface IBuffMenuProps {
  context: React.Context<any>
}

export default ({ context }: IBuffMenuProps) => {
  const [expanded, setExpanded] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedQualities, setSelectedQualities] = useState<string[]>([])

  const handleExpandChange = () => {
    setExpanded((expanded) => !expanded)
  }
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }

  const handleTypeSelectChange = (types: string[]) => {
    setSelectedTypes(types)
  }
  const handleQualitySelectChange = (qualities: string[]) => {
    setSelectedQualities(qualities)
  }

  const { data, error, loading } = useQuery<{ buffs: ISpecialBuff[] }, {}>(
    GET_BUFFS,
    {
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
              quality_in: selectedQualities.length
                ? selectedQualities.map(
                    (v, index) => buffQualities.findIndex((q) => q === v) + 1
                  )
                : buffQualities.map((value, index) => index + 1),
            },
            ...selectedTypes.map((type) => ({
              buffDescription_contains: type,
            })),
          ],
        },
      },
    }
  )
  if (error) {
    return <div>Error.</div>
  }

  return (
    <ListContainer>
      <StyledFlex direction='column' justify='center' align='center'>
        <StyledInnerFlex direction='row' justify='center' align='center'>
          <StyledInput
            placeholder='Search for Food'
            allowClear
            value={searchText}
            onChange={handleSearchChange}
            size='large'
            type='text'
          />
          <Button
            size='large'
            icon={expanded ? <ShrinkOutlined /> : <ArrowsAltOutlined />}
            onClick={handleExpandChange}
          />
        </StyledInnerFlex>
        {expanded && (
          <>
            <StyledDivider />
            <StyledExpandedFlex direction='row' justify='center' align='center'>
              <Select
                mode='multiple'
                style={{ width: '100%', margin: '5px 10px' }}
                placeholder='Filter by type...'
                onChange={handleTypeSelectChange}
              >
                {buffTypes.map((type, index) => (
                  <Option key={type} value={type}>
                    {type}
                  </Option>
                ))}
              </Select>
            </StyledExpandedFlex>

            <StyledExpandedFlex direction='row' justify='center' align='center'>
              <Select
                mode='multiple'
                style={{ width: '100%', margin: '5px 10px' }}
                placeholder='Filter by quality...'
                onChange={handleQualitySelectChange}
              >
                {buffQualities.map((quality, index) => (
                  <Option value={quality} key={quality}>
                    {quality}
                  </Option>
                ))}
              </Select>
            </StyledExpandedFlex>
          </>
        )}
      </StyledFlex>
      <BuffMenuList
        context={context}
        buffs={(data && data.buffs) || []}
        searchText={searchText}
        loading={loading}
      />
    </ListContainer>
  )
}
