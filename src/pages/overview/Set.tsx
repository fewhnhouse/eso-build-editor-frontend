import React from 'react'
import Flex from '../../components/Flex'
import { MenuCard, ContentCard } from './Overview'
import SetMenu from '../build/Sets/SetMenu'
import GearCard from '../../components/GearCard'
import { ISet } from '../../components/GearSlot'
import { Empty } from 'antd'

interface ISetProps {
  context: React.Context<any>
  selectedSet?: ISet
  isMobile: boolean
}
export default ({ context, selectedSet, isMobile }: ISetProps) => {
  return (
    <Flex
      direction='row'
      align='flex-start'
      style={{
        height: '100%',
        width: '100%',
        padding: isMobile ? 0 : 20
      }}
    >
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
            alignItems: 'center'
          }}
        >
          {selectedSet ? (
            <GearCard size='big' set={selectedSet} setSelectionCount={0} />
          ) : (
            <Empty
              style={{
                display: 'flex',
                justifyContent: 'center',
                flex: 2,
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              Select a Set to get started.
            </Empty>
          )}
        </ContentCard>
      )}
    </Flex>
  )
}
