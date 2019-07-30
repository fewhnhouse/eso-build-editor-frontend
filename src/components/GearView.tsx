import React from 'react'
import styled from 'styled-components'
import GearSlot, { IGearSlotProps, IGearSlot } from '../components/GearSlot'

import { Typography } from 'antd'
import Flex from './Flex'

const GearView = styled.div``

const { Title } = Typography

export interface IGearSetup {
  label: string
  id: string
  data: IGearSlot[]
}
export default ({
  setups,
  droppable,
  disabled,
}: {
  setups: IGearSetup[]
  droppable?: boolean
  disabled?: boolean
}) => {
  return (
    <GearView>
      {setups.map((setup: IGearSetup) => (
        <>
          <Title level={4}>{setup.label}</Title>
          <Flex
            direction='row'
            justify='center'
            align='center'
            style={{ flexWrap: 'wrap' }}
          >
            {setup.data.map((slot: IGearSlot, index: number) => (
              <GearSlot
                disabled={disabled}
                draggable={slot.icon !== undefined}
                droppable={droppable}
                id={`${setup.id}-${slot.set ? slot.set.id : 0}`}
                slot={slot}
                index={index}
              />
            ))}
          </Flex>
        </>
      ))}
    </GearView>
  )
}
