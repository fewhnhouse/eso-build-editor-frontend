import React from 'react'
import Flex from '../../components/Flex'
import { MenuCard, ContentCard } from './Overview'
import SetMenu from '../build/Sets/SetMenu'
import GearCard from '../../components/gear/GearCard'
import { ISet } from '../../components/gear/GearSlot'
import { Empty } from 'antd'
import styled from 'styled-components'

const StyledFlex = styled(Flex)`
  height: 100%;
  width: 100%;
  padding: ${(props: { isMobile: boolean }) =>
    props.isMobile ? 0 : (props) => props.theme.paddings.medium};
`

const StyledEmpty = styled(Empty)`
  display: flex;
  justify-content: center;
  flex: 2;
  flex-direction: column;
  align-items: center;
`

interface ISetProps {
  context: React.Context<any>
  selectedSet?: ISet
  isMobile: boolean
}
export default ({ context, selectedSet, isMobile }: ISetProps) => {
  return (
    <StyledFlex direction='row' align='flex-start' isMobile={isMobile}>
      <MenuCard isMobile={isMobile}>
        <SetMenu collapsed={false} setCollapsed={() => {}} context={context} />
      </MenuCard>
      {isMobile ? (
        ''
      ) : (
        <ContentCard
          bodyStyle={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {selectedSet ? (
            <GearCard size='big' set={selectedSet} setSelectionCount={0} />
          ) : (
            <StyledEmpty>Select a Set to get started.</StyledEmpty>
          )}
        </ContentCard>
      )}
    </StyledFlex>
  )
}
