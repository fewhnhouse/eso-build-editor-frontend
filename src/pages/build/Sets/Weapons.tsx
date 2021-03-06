import React, { useContext, useState, useEffect } from 'react'
import { Divider, Radio, Checkbox, Spin } from 'antd'
import { RadioChangeEvent } from 'antd/lib/radio'
import Flex from '../../../components/Flex'
import styled from 'styled-components'
import { SelectValue } from 'antd/lib/select'
import { SelectWithTitle } from './CustomSelect'
import {
  BuildContext,
  Slot,
  IModification,
  WeaponType,
} from '../BuildStateContext'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'
import { specialWeaponSets } from './selectionDetails'

const StyledFlex = styled(Flex)`
  margin-top: 20px;
`

const StyledSelectWithTitle = styled(SelectWithTitle)`
  min-width: 350px;
  max-width: 350px;
  flex: 1;
  margin: 0px 10px;
`

const StyledCheckbox = styled(Checkbox)`
  margin: 20px 0px 10px 0px;
`

const StyledTwohandedFlex = styled(Flex)`
  width: 100%;
  min-height: 150px;
`

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

export default ({ bar }: { bar: 'frontbar' | 'backbar' }) => {
  const [state, dispatch] = useContext(BuildContext)
  const [shield, setShield] = useState(false)
  const [onehandedDisabled, setOnehandedDisabled] = useState(false)
  const [twohandedDisabled, setTwohandedDisabled] = useState(false)

  const { weaponType } = state!

  const [mainHand, setMainHand] = useState<any>(undefined)
  const [offHand, setOffHand] = useState<any>(undefined)

  const onChange = (e: RadioChangeEvent) => {
    dispatch!({
      type: 'SET_WEAPON_TYPE',
      payload: { weaponType: e.target.value },
    })
  }
  const { frontbarSelection, backbarSelection, selectedSet } = state!

  useEffect(() => {
    const specialWeaponSet: any = specialWeaponSets.find(
      (set) => selectedSet && selectedSet.name.includes(set.name)
    )

    if (specialWeaponSet && specialWeaponSet.type === 'onehanded') {
      setOnehandedDisabled(false)
      setTwohandedDisabled(true)
      dispatch!({
        type: 'SET_WEAPON_TYPE',
        payload: { weaponType: WeaponType.onehanded },
      })
    } else if (specialWeaponSet && specialWeaponSet.type === 'twohanded') {
      setOnehandedDisabled(true)
      setTwohandedDisabled(false)
      dispatch!({
        type: 'SET_WEAPON_TYPE',
        payload: { weaponType: WeaponType.twohanded },
      })
    } else {
      setTwohandedDisabled(false)
      setOnehandedDisabled(false)
    }

    setMainHand(
      [...(bar === 'frontbar' ? frontbarSelection : backbarSelection)].find(
        (slot) => slot.slot === Slot.mainHand
      )
    )
    setOffHand(
      [...(bar === 'frontbar' ? frontbarSelection : backbarSelection)].find(
        (slot) => slot.slot === Slot.offHand
      )
    )
  }, [selectedSet, frontbarSelection, backbarSelection, bar, dispatch])

  const weaponGlyphQuery = useQuery(GET_MODIFICATIONS, {
    variables: { where: { modificationType: 'glyph', itemType: 'weapon' } },
  })
  const weaponTraitQuery = useQuery(GET_MODIFICATIONS, {
    variables: { where: { modificationType: 'trait', itemType: 'weapon' } },
  })
  const armorGlyphQuery = useQuery(GET_MODIFICATIONS, {
    variables: { where: { modificationType: 'glyph', itemType: 'armor' } },
  })
  const armorTraitQuery = useQuery(GET_MODIFICATIONS, {
    variables: { where: { modificationType: 'trait', itemType: 'armor' } },
  })
  if (
    weaponGlyphQuery.loading ||
    weaponTraitQuery.loading ||
    armorGlyphQuery.loading ||
    armorTraitQuery.loading
  ) {
    return <Spin />
  } else if (
    weaponGlyphQuery.error ||
    weaponTraitQuery.error ||
    armorGlyphQuery.error ||
    armorTraitQuery.error
  ) {
    console.error(
      weaponGlyphQuery.error ||
        weaponTraitQuery.error ||
        armorGlyphQuery.error ||
        armorTraitQuery.error
    )
    return <div>Error</div>
  } else if (
    weaponGlyphQuery.data &&
    weaponTraitQuery.data &&
    armorGlyphQuery.data &&
    armorTraitQuery.data
  ) {
    const armorGlyphs: IModification[] = armorGlyphQuery.data.modifications
    const armorTraits: IModification[] = armorTraitQuery.data.modifications
    const weaponGlyphs: IModification[] = weaponGlyphQuery.data.modifications
    const weaponTraits: IModification[] = weaponTraitQuery.data.modifications

    const onChangeSelect = (
      slots: Slot[],
      actionType: string,
      type: 'selectedTraits' | 'selectedGlyphs',
      itemType: 'frontbar' | 'backbar'
    ) => (value: SelectValue) => {
      if (shield && slots[0] === Slot.offHand) {
        const itemValue =
          type === 'selectedTraits'
            ? armorTraits.find((trait) => trait.type === value)
            : armorGlyphs.find((glyph) => glyph.type === value)

        dispatch!({
          type: actionType,
          payload: {
            slots,
            value: itemValue,
            type,
            itemType,
          },
        })
      } else {
        const itemValue =
          type === 'selectedTraits'
            ? weaponTraits.find((trait) => trait.type === value)
            : weaponGlyphs.find((glyph) => glyph.type === value)

        dispatch!({
          type: actionType,
          payload: {
            slots,
            value: itemValue,
            type,
            itemType,
          },
        })
      }
    }
    const onChangeCheckbox = (
      setState: React.Dispatch<React.SetStateAction<boolean>>,
      type: 'selectedTraits' | 'selectedGlyphs',
      itemType: 'frontbar' | 'backbar'
    ) => (e: CheckboxChangeEvent) => {
      onChangeSelect(
        [Slot.offHand],
        'SET_WEAPON_STATS',
        'selectedGlyphs',
        itemType
      )('')
      onChangeSelect(
        [Slot.offHand],
        'SET_WEAPON_STATS',
        'selectedTraits',
        itemType
      )('')
      setState(e.target.checked)
    }

    return (
      <StyledFlex direction='column' justify='center' align='center'>
        <Radio.Group
          onChange={onChange}
          defaultValue={weaponType || WeaponType.onehanded}
        >
          <Radio.Button
            disabled={onehandedDisabled}
            value={WeaponType.onehanded}
          >
            One Handed
          </Radio.Button>
          <Radio.Button
            disabled={twohandedDisabled}
            value={WeaponType.twohanded}
          >
            Two Handed
          </Radio.Button>
        </Radio.Group>
        {weaponType === WeaponType.onehanded && (
          <StyledCheckbox
            onChange={onChangeCheckbox(setShield, 'selectedGlyphs', bar)}
            value={shield}
          >
            Use Shield
          </StyledCheckbox>
        )}
        <Divider>Enchants</Divider>

        {weaponType === WeaponType.twohanded ? (
          <StyledSelectWithTitle
            value={mainHand && mainHand.glyph ? mainHand.glyph.type : ''}
            onChange={onChangeSelect(
              [Slot.mainHand],
              'SET_WEAPON_STATS',
              'selectedGlyphs',
              bar
            )}
            title='Both Hands'
            items={weaponGlyphs}
          />
        ) : (
          <StyledTwohandedFlex
            wrap
            direction='row'
            justify='center'
            align='flex-start'
          >
            <StyledSelectWithTitle
              value={mainHand && mainHand.glyph ? mainHand.glyph.type : ''}
              onChange={onChangeSelect(
                [Slot.mainHand],
                'SET_WEAPON_STATS',
                'selectedGlyphs',
                bar
              )}
              title='Main Hand'
              items={weaponGlyphs}
            />
            <StyledSelectWithTitle
              value={offHand && offHand.glyph ? offHand.glyph.type : ''}
              onChange={onChangeSelect(
                [Slot.offHand],
                'SET_WEAPON_STATS',
                'selectedGlyphs',
                bar
              )}
              title='Off Hand'
              items={shield ? armorGlyphs : weaponGlyphs}
            />
          </StyledTwohandedFlex>
        )}

        <Divider>Traits</Divider>
        {weaponType === WeaponType.twohanded ? (
          <StyledSelectWithTitle
            value={mainHand && mainHand.trait ? mainHand.trait.type : ''}
            onChange={onChangeSelect(
              [Slot.mainHand],
              'SET_WEAPON_STATS',
              'selectedTraits',
              bar
            )}
            title='Both Hands'
            items={weaponTraits}
          />
        ) : (
          <StyledTwohandedFlex
            wrap
            direction='row'
            justify='center'
            align='flex-start'
          >
            <StyledSelectWithTitle
              value={mainHand && mainHand.trait ? mainHand.trait.type : ''}
              onChange={onChangeSelect(
                [Slot.mainHand],
                'SET_WEAPON_STATS',
                'selectedTraits',
                bar
              )}
              title='Main Hand'
              items={weaponTraits}
            />
            <StyledSelectWithTitle
              value={offHand && offHand.trait ? offHand.trait.type : ''}
              onChange={onChangeSelect(
                [Slot.offHand],
                'SET_WEAPON_STATS',
                'selectedTraits',
                bar
              )}
              title='Off Hand'
              items={shield ? armorTraits : weaponTraits}
            />
          </StyledTwohandedFlex>
        )}
      </StyledFlex>
    )
  } else {
    return null
  }
}
