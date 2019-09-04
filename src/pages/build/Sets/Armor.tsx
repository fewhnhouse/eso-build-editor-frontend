import React, { useContext, useState } from 'react'
import { Divider, Radio, Checkbox, Spin } from 'antd'
import { RadioChangeEvent } from 'antd/lib/radio'
import Flex from '../../../components/Flex'
import styled from 'styled-components'
import { SelectWithTitle } from './CustomSelect'
import {
  BuildContext,
  Slot,
  ISetSelection,
  IModification,
  ArmorType,
} from '../BuildStateContext'
import { SelectValue } from 'antd/lib/select'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'

const StyledFlex = styled(Flex)`
  margin-top: 20px;
`

interface IPiece {
  title: string
  slot: Slot
  value: ISetSelection | undefined
}

interface IPieceSelection {
  type: 'bigPieces' | 'smallPieces' | 'frontbar' | 'backbar'
  title: string
  pieces: IPiece[]
}

interface IMode {
  title: string
  type: 'selectedGlyphs' | 'selectedTraits'
}

const GET_MODIFICATIONS = gql`
  query modifications($where: ModificationWhereInput) {
    modifications(where: $where) {
      type
      itemType
      modificationType
      description
      icon
    }
  }
`

export default () => {
  const [state, dispatch] = useContext(BuildContext)
  const [enchantBigIndividual, setEnchantBigIndividual] = useState(false)
  const [enchantSmallIndividual, setEnchantSmallIndividual] = useState(false)
  const [traitBigIndividual, setTraitBigIndividual] = useState(false)
  const [traitSmallIndividual, setTraitSmallIndividual] = useState(false)
  const {
    armorType,
    selectedSet,
    bigPieceSelection,
    smallPieceSelection,
  } = state!

  const head = bigPieceSelection.find(slot => slot.slot === Slot.head)
  const legs = bigPieceSelection.find(slot => slot.slot === Slot.legs)
  const chest = bigPieceSelection.find(slot => slot.slot === Slot.chest)
  const hands = smallPieceSelection.find(slot => slot.slot === Slot.hands)
  const feet = smallPieceSelection.find(slot => slot.slot === Slot.feet)
  const shoulders = smallPieceSelection.find(
    slot => slot.slot === Slot.shoulders
  )
  const waist = smallPieceSelection.find(slot => slot.slot === Slot.waist)

  const bigPieces = [
    { title: 'Head', slot: Slot.head, value: head },
    { title: 'Chest', slot: Slot.chest, value: chest },
    { title: 'Legs', slot: Slot.legs, value: legs },
  ]
  const smallPieces = [
    { title: 'Hands', slot: Slot.hands, value: hands },
    { title: 'Feet', slot: Slot.feet, value: feet },
    { title: 'Shoulders', slot: Slot.shoulders, value: shoulders },
    { title: 'Waist', slot: Slot.waist, value: waist },
  ]

  const pieces: IPieceSelection[] = [
    { type: 'bigPieces', title: 'Big Pieces', pieces: bigPieces },
    { type: 'smallPieces', title: 'Small Pieces', pieces: smallPieces },
  ]

  const modes: IMode[] = [
    { title: 'Enchants', type: 'selectedGlyphs' },
    { title: 'Traits', type: 'selectedTraits' },
  ]

  const glyphQuery = useQuery(GET_MODIFICATIONS, {
    variables: { where: { modificationType: 'glyph', itemType: 'armor' } },
  })
  const traitQuery = useQuery(GET_MODIFICATIONS, {
    variables: { where: { modificationType: 'trait', itemType: 'armor' } },
  })
  if (glyphQuery.loading || traitQuery.loading) {
    return <Spin />
  } else if (glyphQuery.error || traitQuery.error) {
    console.error(glyphQuery.error || traitQuery.error)
    return <div>"Error"</div>
  } else if (glyphQuery.data && traitQuery.data) {
    const onChange = (e: RadioChangeEvent) => {
      dispatch!({
        type: 'SET_ARMOR_TYPE',
        payload: { armorType: e.target.value },
      })
    }

    const armorGlyphs: IModification[] = glyphQuery.data.modifications
    const armorTraits: IModification[] = traitQuery.data.modifications

    const onChangeSelect = (
      slots: Slot[],
      actionType: string,
      type: 'selectedTraits' | 'selectedGlyphs',
      itemType: 'bigPieces' | 'smallPieces' | 'frontbar' | 'backbar'
    ) => (value: SelectValue) => {
      dispatch!({
        type: actionType,
        payload: {
          slots,
          value:
            type === 'selectedTraits'
              ? armorTraits.find(trait => trait.type === value)
              : armorGlyphs.find(glyph => glyph.type === value),
          type,
          itemType,
        },
      })
    }

    const handleCheckboxChange = (
      setCheckbox: React.Dispatch<React.SetStateAction<boolean>>,
      resetSlots: Slot[],
      type: 'selectedTraits' | 'selectedGlyphs',
      itemType: 'bigPieces' | 'smallPieces' | 'frontbar' | 'backbar'
    ) => (e: CheckboxChangeEvent) => {
      onChangeSelect(resetSlots, 'SET_ARMOR_STATS', type, itemType)('')
      setCheckbox(checkbox => !checkbox)
    }

    return (
      <StyledFlex direction='column' justify='center' align='center'>
        <Radio.Group
          value={armorType}
          onChange={onChange}
          defaultValue={armorType || ArmorType.mediumArmor}
        >
          <Radio.Button
            disabled={selectedSet!.has_light_armor === 0}
            value={ArmorType.lightArmor}
          >
            Light Armor
          </Radio.Button>
          <Radio.Button
            disabled={selectedSet!.has_medium_armor === 0}
            value={ArmorType.mediumArmor}
          >
            Medium Armor
          </Radio.Button>
          <Radio.Button
            disabled={selectedSet!.has_heavy_armor === 0}
            value={ArmorType.heavyArmor}
          >
            Heavy Armor
          </Radio.Button>
        </Radio.Group>

        {modes.map(mode => (
          <div key={mode.type}>
            {pieces.map(piece => (
              <div key={mode.type + '-' + piece.type}>
                <Divider>{mode.title + ': ' + piece.title}</Divider>
                <Checkbox
                  value={
                    mode.type === 'selectedGlyphs'
                      ? piece.type === 'bigPieces'
                        ? enchantBigIndividual
                        : enchantSmallIndividual
                      : piece.type === 'bigPieces'
                      ? traitBigIndividual
                      : traitSmallIndividual
                  }
                  onChange={handleCheckboxChange(
                    mode.type === 'selectedGlyphs'
                      ? piece.type === 'bigPieces'
                        ? setEnchantBigIndividual
                        : setEnchantSmallIndividual
                      : piece.type === 'bigPieces'
                      ? setTraitBigIndividual
                      : setTraitSmallIndividual,
                    piece.type === 'bigPieces'
                      ? [Slot.head, Slot.chest, Slot.legs]
                      : [Slot.hands, Slot.feet, Slot.shoulders, Slot.waist],
                    mode.type,
                    piece.type
                  )}
                >
                  Select individually
                </Checkbox>
                <Flex
                  style={{ width: '100%', minHeight: 150, flexWrap: 'wrap' }}
                  direction='row'
                  justify='space-between'
                  align='flex-start'
                >
                  {(mode.type === 'selectedGlyphs' ? (
                    piece.type === 'bigPieces' ? (
                      enchantBigIndividual
                    ) : (
                      enchantSmallIndividual
                    )
                  ) : piece.type === 'bigPieces' ? (
                    traitBigIndividual
                  ) : (
                    traitSmallIndividual
                  )) ? (
                    piece.pieces.map(item => (
                      <StyledSelectWithTitle
                        value={
                          mode.type === 'selectedGlyphs'
                            ? item.value && item.value.glyph
                              ? item.value.glyph.type
                              : ''
                            : item.value && item.value.trait
                            ? item.value.trait.type
                            : ''
                        }
                        onChange={onChangeSelect(
                          [item.slot],
                          'SET_ARMOR_STATS',
                          mode.type,
                          piece.type
                        )}
                        items={
                          mode.type === 'selectedGlyphs'
                            ? armorGlyphs
                            : armorTraits
                        }
                        title={item.title}
                      />
                    ))
                  ) : (
                    <StyledSelectWithTitle
                      value={
                        piece.type === 'bigPieces'
                          ? head
                            ? mode.type === 'selectedGlyphs'
                              ? head.glyph
                                ? head.glyph.type
                                : ''
                              : head.trait
                              ? head.trait.type
                              : ''
                            : ''
                          : hands
                          ? mode.type === 'selectedGlyphs'
                            ? hands.glyph
                              ? hands.glyph.type
                              : ''
                            : hands.trait
                            ? hands.trait.type
                            : ''
                          : ''
                      }
                      onChange={onChangeSelect(
                        piece.type === 'bigPieces'
                          ? [Slot.head, Slot.chest, Slot.legs]
                          : [Slot.hands, Slot.feet, Slot.shoulders, Slot.waist],
                        'SET_ARMOR_STATS',
                        mode.type,
                        piece.type
                      )}
                      items={
                        mode.type === 'selectedGlyphs'
                          ? armorGlyphs
                          : armorTraits
                      }
                      title={piece.title}
                    />
                  )}
                </Flex>
              </div>
            ))}
          </div>
        ))}
      </StyledFlex>
    )
  } else {
    return null
  }
}

const StyledSelectWithTitle = styled(SelectWithTitle)`
  flex: 1;
  min-width: 320px;
  max-width: 320px;
  margin: 0px 10px;
`
