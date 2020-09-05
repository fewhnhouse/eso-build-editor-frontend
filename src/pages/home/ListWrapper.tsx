import React from 'react'
import { useMediaQuery } from 'react-responsive'
import { CardContainer, CardHeader, ListCard } from './StyledComponents'
import Searchbar from './SearchBar'

interface Props {
  children?: React.ReactNode
  InnerList: React.ReactNode
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  search: string
  handleExpandChange?: () => void
  expanded: boolean
  hasExpansion?: boolean
  placeholder?: string
}

const ListWrapper = ({ children, hasExpansion, InnerList, ...rest }: Props) => {
  const isMobile = useMediaQuery({ maxWidth: 800 })
  return (
    <CardContainer
      isMobile={isMobile}
      direction='column'
      justify='flex-start'
      align='center'
    >
      <ListCard
        bordered={!isMobile}
        bodyStyle={{
          padding: 0,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
        isMobile={isMobile}
      >
        <CardHeader
          isMobile={isMobile}
          direction='column'
          justify='center'
          align='center'
        >
          <Searchbar hasExpansion={hasExpansion} {...rest} />
          {children}
        </CardHeader>
        {InnerList}
      </ListCard>
    </CardContainer>
  )
}

export default ListWrapper
