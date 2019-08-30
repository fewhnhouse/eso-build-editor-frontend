import React from 'react'
import Flex from '../../components/Flex'
import { MenuCard, ContentCard } from './Overview'
import SetMenu from '../build/Sets/SetMenu'
import GearCard from '../../components/GearCard'
import { ISet } from '../../components/GearSlot'
import { Empty } from 'antd';

interface ISetProps {
  context: React.Context<any>
  selectedSet?: ISet
}
export default ({ context, selectedSet }: ISetProps) => {
  return (
    <Flex
      direction='row'
      align='flex-start'
      style={{
        height: 'calc(100vh - 100px)',
        width: '100%',
        padding: 20,
      }}
    >
      <MenuCard>
        <SetMenu collapsed={false} setCollapsed={() => {}} context={context} />
      </MenuCard>
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
          <Empty
            style={{
              display: 'flex',
              justifyContent: 'center',
              flex: 2,
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            Select a Set to get started.
          </Empty>
        )}
      </ContentCard>
    </Flex>
  )
}
