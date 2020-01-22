import React, { useState } from 'react'
import { ISetSelection } from '../../pages/build/BuildStateContext'
import styled from 'styled-components'
import {
  getImageSource,
  getGearSlot,
  getTypeColor,
  getItemType,
  getWeaponType,
} from './util'
import {
  GearFrame,
  GearImg,
  InnerDisplay,
  TextPrimary,
  TextSecondary,
  DisplayCard,
} from './GearSlot'
import { Modal, Popover } from 'antd'
import { GearCardContent } from './GearSlotCard'
import { useMediaQuery } from 'react-responsive'

const InnerSpan = styled.span`
  color: ${(props: { color: string }) => props.color};
`

interface IContentProps {
  slot: ISetSelection
  setSelectionCount: number
}

const MobileContent = ({ slot, setSelectionCount }: IContentProps) => {
  const [visible, setVisible] = useState(false)
  const toggleModal = () => {
    setVisible(visible => !visible)
  }
  return (
    <GearFrame
      onClick={toggleModal}
      size={'small'}
      hasIcon={slot.icon !== undefined}
      backgroundSource={getImageSource(slot.slot)}
    >
      <Modal
        bodyStyle={{ display: 'flex', justifyContent: 'center', margin: 0 }}
        visible={visible}
        footer={null}
        title='Set Details'
      >
        <GearCardContent setSelectionCount={setSelectionCount} gear={slot} />
      </Modal>
      {slot.selectedSet !== null && slot.selectedSet !== undefined ? (
        <GearImg size={'small'} src={getGearSlot(slot)} />
      ) : null}
    </GearFrame>
  )
}

const DesktopContent = ({ slot, setSelectionCount }: IContentProps) => {
  return (
    <Popover
      mouseEnterDelay={0.5}
      placement='left'
      content={
        <GearCardContent setSelectionCount={setSelectionCount} gear={slot} />
      }
    >
      <GearFrame
        size={'small'}
        hasIcon={slot.icon !== undefined}
        backgroundSource={getImageSource(slot.slot)}
      >
        {slot.selectedSet !== null && slot.selectedSet !== undefined ? (
          <GearImg size={'small'} src={getGearSlot(slot)} />
        ) : null}
      </GearFrame>
    </Popover>
  )
}

const DisplaySlot = ({
  slot,
  setSelectionCount,
  size,
}: {
  slot: ISetSelection
  setSelectionCount: number
  size: 'normal' | 'small'
}) => {
  const isMobile = useMediaQuery({ maxWidth: 800 })

  return (
    <DisplayCard>
      {isMobile ? (
        <MobileContent slot={slot} setSelectionCount={setSelectionCount} />
      ) : (
        <DesktopContent slot={slot} setSelectionCount={setSelectionCount} />
      )}
      <InnerDisplay
        direction='column'
        justify='space-between'
        align='flex-start'
      >
        <TextPrimary ellipsis strong>
          {slot.selectedSet ? slot.selectedSet.name : 'Set not selected.'}
        </TextPrimary>
        <TextPrimary ellipsis strong>
          <InnerSpan color={getTypeColor(slot.type)}>
            {getItemType(slot.type)}
          </InnerSpan>
          {slot.weaponType ? '-' : ''} {getWeaponType(slot.weaponType)}
        </TextPrimary>

        <TextSecondary ellipsis type='secondary'>
          {slot.glyph ? slot.glyph.type : 'Glyph not selected.'}
        </TextSecondary>
        <TextSecondary ellipsis type='secondary'>
          {slot.trait ? slot.trait.type : 'Trait not selected.'}
        </TextSecondary>
      </InnerDisplay>
    </DisplayCard>
  )
}

export default DisplaySlot
