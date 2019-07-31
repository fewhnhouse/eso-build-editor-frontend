import React, { useContext, useState } from 'react'
import { Divider, Radio, Checkbox } from 'antd'
import { RadioChangeEvent } from 'antd/lib/radio'
import Flex from '../../../components/Flex'
import styled from 'styled-components'
import { SelectWithTitle } from './CustomSelect'
import { BuildContext } from '../BuildStateContext'
import { SelectValue } from 'antd/lib/select'
import { armorGlyphs, armorTraits } from './data'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'

const StyledFlex = styled(Flex)`
  margin-top: 20px;
`

export default () => {
  const onChange = (e: RadioChangeEvent) => {
    dispatch!({
      type: 'SET_ARMOR_TYPE',
      payload: { armorType: e.target.value },
    })
  }

  const onChangeSelect = (
    indices: number[],
    actionType: string,
    type: 'selectedTraits' | 'selectedGlyphs'
  ) => (value: SelectValue) => {
    dispatch!({ type: actionType, payload: { indices, value, type } })
  }
  const [state, dispatch] = useContext(BuildContext)
  const [enchantBigIndividual, setEnchantBigIndividual] = useState(false)
  const [enchantSmallIndividual, setEnchantSmallIndividual] = useState(false)
  const [traitBigIndividual, setTraitBigIndividual] = useState(false)
  const [traitSmallIndividual, setTraitSmallIndividual] = useState(false)

  const { armorType, armorStats, selectedSet } = state!
  const handleCheckboxChange = (
    setCheckbox: React.Dispatch<React.SetStateAction<boolean>>,
    resetIndices: number[],
    type: 'selectedTraits' | 'selectedGlyphs',
  ) => (e: CheckboxChangeEvent) => {
    //onChangeSelect(resetIndices, 'SET_ARMOR_TYPE', type)('')
    setCheckbox(checkbox => !checkbox)
  }
  return (
    <StyledFlex direction='column' justify='center' align='center'>
      <Radio.Group
        value={armorType}
        onChange={onChange}
        defaultValue={armorType}
      >
        <Radio.Button
          disabled={selectedSet!.has_light_armor === 0}
          value='lightarmor'
        >
          Light Armor
        </Radio.Button>
        <Radio.Button
          disabled={selectedSet!.has_medium_armor === 0}
          value='mediumarmor'
        >
          Medium Armor
        </Radio.Button>
        <Radio.Button
          disabled={selectedSet!.has_heavy_armor === 0}
          value='heavyarmor'
        >
          Heavy Armor
        </Radio.Button>
      </Radio.Group>

      <Divider>Enchants</Divider>
      <Checkbox
        value={enchantBigIndividual}
        onChange={handleCheckboxChange(
          setEnchantBigIndividual,
          [0, 1, 2],
          'selectedGlyphs'
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
        {enchantBigIndividual ? (
          <>
            <StyledSelectWithTitle
              value={armorStats.selectedGlyphs[0]}
              onChange={onChangeSelect(
                [0],
                'SET_ARMOR_STATS',
                'selectedGlyphs'
              )}
              items={armorGlyphs}
              title='Head'
            />
            <StyledSelectWithTitle
              value={armorStats.selectedGlyphs[1]}
              onChange={onChangeSelect(
                [1],
                'SET_ARMOR_STATS',
                'selectedGlyphs'
              )}
              items={armorGlyphs}
              title='Chest'
            />
            <StyledSelectWithTitle
              value={armorStats.selectedGlyphs[2]}
              onChange={onChangeSelect(
                [2],
                'SET_ARMOR_STATS',
                'selectedGlyphs'
              )}
              items={armorGlyphs}
              title='Legs'
            />
          </>
        ) : (
          <StyledSelectWithTitle
            value={armorStats.selectedGlyphs[0]}
            onChange={onChangeSelect(
              [0, 1, 2],
              'SET_ARMOR_STATS',
              'selectedGlyphs'
            )}
            items={armorGlyphs}
            title='Big Pieces'
          />
        )}
      </Flex>
      <Divider style={{ margin: '10px 0px' }} />
      <Checkbox
        value={enchantSmallIndividual}
        onChange={handleCheckboxChange(
          setEnchantSmallIndividual,
          [3, 4, 5, 6],
          'selectedGlyphs'
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
        {enchantSmallIndividual ? (
          <>
            <StyledSelectWithTitle
              value={armorStats.selectedGlyphs[3]}
              onChange={onChangeSelect(
                [3],
                'SET_ARMOR_STATS',
                'selectedGlyphs'
              )}
              items={armorGlyphs}
              title='Hands'
            />
            <StyledSelectWithTitle
              value={armorStats.selectedGlyphs[4]}
              onChange={onChangeSelect(
                [4],
                'SET_ARMOR_STATS',
                'selectedGlyphs'
              )}
              items={armorGlyphs}
              title='Feet'
            />
            <StyledSelectWithTitle
              value={armorStats.selectedGlyphs[5]}
              onChange={onChangeSelect(
                [5],
                'SET_ARMOR_STATS',
                'selectedGlyphs'
              )}
              items={armorGlyphs}
              title='Shoulders'
            />
            <StyledSelectWithTitle
              value={armorStats.selectedGlyphs[6]}
              onChange={onChangeSelect(
                [6],
                'SET_ARMOR_STATS',
                'selectedGlyphs'
              )}
              items={armorGlyphs}
              title='Belt'
            />
          </>
        ) : (
          <StyledSelectWithTitle
            value={armorStats.selectedGlyphs[6]}
            onChange={onChangeSelect(
              [3, 4, 5, 6],
              'SET_ARMOR_STATS',
              'selectedGlyphs'
            )}
            items={armorGlyphs}
            title='Small Pieces'
          />
        )}
      </Flex>
      <Divider>Traits</Divider>
      <Checkbox
        value={traitBigIndividual}
        onChange={handleCheckboxChange(
          setTraitBigIndividual,
          [0, 1, 2],
          'selectedTraits'
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
        {traitBigIndividual ? (
          <>
            <StyledSelectWithTitle
              value={armorStats.selectedTraits[0]}
              onChange={onChangeSelect(
                [0],
                'SET_ARMOR_STATS',
                'selectedTraits'
              )}
              title='Head'
              items={armorTraits}
            />
            <StyledSelectWithTitle
              value={armorStats.selectedTraits[1]}
              onChange={onChangeSelect(
                [1],
                'SET_ARMOR_STATS',
                'selectedTraits'
              )}
              title='Chest'
              items={armorTraits}
            />
            <StyledSelectWithTitle
              value={armorStats.selectedTraits[2]}
              onChange={onChangeSelect(
                [2],
                'SET_ARMOR_STATS',
                'selectedTraits'
              )}
              title='Legs'
              items={armorTraits}
            />
          </>
        ) : (
          <StyledSelectWithTitle
            value={armorStats.selectedTraits[2]}
            onChange={onChangeSelect(
              [0, 1, 2],
              'SET_ARMOR_STATS',
              'selectedTraits'
            )}
            title='Big Pieces'
            items={armorTraits}
          />
        )}
      </Flex>
      <Divider style={{ margin: '10px 0px' }} />
      <Checkbox
        value={traitSmallIndividual}
        onChange={handleCheckboxChange(
          setTraitSmallIndividual,
          [3, 4, 5, 6],
          'selectedTraits'
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
        {traitSmallIndividual ? (
          <>
            <StyledSelectWithTitle
              value={armorStats.selectedTraits[3]}
              onChange={onChangeSelect(
                [3],
                'SET_ARMOR_STATS',
                'selectedTraits'
              )}
              title='Hands'
              items={armorTraits}
            />
            <StyledSelectWithTitle
              value={armorStats.selectedTraits[4]}
              onChange={onChangeSelect(
                [4],
                'SET_ARMOR_STATS',
                'selectedTraits'
              )}
              title='Feet'
              items={armorTraits}
            />
            <StyledSelectWithTitle
              value={armorStats.selectedTraits[5]}
              onChange={onChangeSelect(
                [5],
                'SET_ARMOR_STATS',
                'selectedTraits'
              )}
              title='Shoulders'
              items={armorTraits}
            />
            <StyledSelectWithTitle
              value={armorStats.selectedTraits[6]}
              onChange={onChangeSelect(
                [6],
                'SET_ARMOR_STATS',
                'selectedTraits'
              )}
              title='Belt'
              items={armorTraits}
            />
          </>
        ) : (
          <StyledSelectWithTitle
            value={armorStats.selectedTraits[3]}
            onChange={onChangeSelect(
              [3, 4, 5, 6],
              'SET_ARMOR_STATS',
              'selectedTraits'
            )}
            title='Small Pieces'
            items={armorTraits}
          />
        )}
      </Flex>
    </StyledFlex>
  )
}

const StyledSelectWithTitle = styled(SelectWithTitle)`
  flex: 1;
  min-width: 250px;
  max-width: 250px;
  margin: 0px 10px;
`
