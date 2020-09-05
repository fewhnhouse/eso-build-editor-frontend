import React from 'react'
import { Input } from 'antd'
import { StyledFlexFull, StyledButton } from './StyledComponents'
import {
  ShrinkOutlined,
  ArrowsAltOutlined,
  SearchOutlined,
} from '@ant-design/icons'

interface Props {
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  search: string
  handleExpandChange?: () => void
  expanded: boolean
  placeholder?: string
  hasExpansion?: boolean
}

const Searchbar = ({
  handleSearchChange,
  search,
  hasExpansion = true,
  handleExpandChange,
  expanded,
  placeholder,
}: Props) => (
  <StyledFlexFull justify='space-between'>
    <Input
      placeholder={placeholder}
      value={search}
      onChange={handleSearchChange}
      addonAfter={<SearchOutlined />}
      defaultValue=''
    />
    {hasExpansion && (
      <StyledButton
        type='primary'
        icon={expanded ? <ShrinkOutlined /> : <ArrowsAltOutlined />}
        ghost={true}
        onClick={handleExpandChange}
      />
    )}
  </StyledFlexFull>
)

export default Searchbar
