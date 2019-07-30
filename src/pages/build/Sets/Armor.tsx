import React, { useContext } from 'react'
import { Divider, Radio } from 'antd'
import { RadioChangeEvent } from 'antd/lib/radio'
import Flex from '../../../components/Flex'
import styled from 'styled-components'
import { SelectWithTitle } from './CustomSelect'
import { BuildContext } from '../BuildStateContext'
import { SelectValue } from 'antd/lib/select'
import { armorGlyphs, armorTraits } from './data'

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
    index: number,
    actionType: string,
    type: 'selectedTraits' | 'selectedGlyphs'
  ) => (value: SelectValue) => {
    dispatch!({ type: actionType, payload: { index, value, type } })
  }
  const [state, dispatch] = useContext(BuildContext)
  const { armorType, armorStats, selectedSet } = state!
  console.log(selectedSet)
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
      <Flex
        style={{ width: '100%', minHeight: 150, flexWrap: 'wrap' }}
        direction='row'
        justify='space-between'
        align='flex-start'
      >
        <StyledSelectWithTitle
          value={armorStats.selectedGlyphs[0]}
          onChange={onChangeSelect(0, 'SET_ARMOR_STATS', 'selectedGlyphs')}
          items={armorGlyphs}
          title='Head'
        />
        <StyledSelectWithTitle
          value={armorStats.selectedGlyphs[1]}
          onChange={onChangeSelect(1, 'SET_ARMOR_STATS', 'selectedGlyphs')}
          items={armorGlyphs}
          title='Chest'
        />
        <StyledSelectWithTitle
          value={armorStats.selectedGlyphs[2]}
          onChange={onChangeSelect(2, 'SET_ARMOR_STATS', 'selectedGlyphs')}
          items={armorGlyphs}
          title='Legs'
        />
      </Flex>
      <Divider style={{ margin: '10px 0px' }} />
      <Flex
        style={{ width: '100%', minHeight: 150, flexWrap: 'wrap' }}
        direction='row'
        justify='space-between'
        align='flex-start'
      >
        <StyledSelectWithTitle
          value={armorStats.selectedGlyphs[3]}
          onChange={onChangeSelect(3, 'SET_ARMOR_STATS', 'selectedGlyphs')}
          items={armorGlyphs}
          title='Hands'
        />
        <StyledSelectWithTitle
          value={armorStats.selectedGlyphs[4]}
          onChange={onChangeSelect(4, 'SET_ARMOR_STATS', 'selectedGlyphs')}
          items={armorGlyphs}
          title='Feet'
        />
        <StyledSelectWithTitle
          value={armorStats.selectedGlyphs[5]}
          onChange={onChangeSelect(5, 'SET_ARMOR_STATS', 'selectedGlyphs')}
          items={armorGlyphs}
          title='Shoulders'
        />
        <StyledSelectWithTitle
          value={armorStats.selectedGlyphs[6]}
          onChange={onChangeSelect(6, 'SET_ARMOR_STATS', 'selectedGlyphs')}
          items={armorGlyphs}
          title='Belt'
        />
      </Flex>
      <Divider>Traits</Divider>
      <Flex
        style={{ width: '100%', minHeight: 150, flexWrap: 'wrap' }}
        direction='row'
        justify='space-between'
        align='flex-start'
      >
        <StyledSelectWithTitle
          value={armorStats.selectedTraits[0]}
          onChange={onChangeSelect(0, 'SET_ARMOR_STATS', 'selectedTraits')}
          title='Head'
          items={armorTraits}
        />
        <StyledSelectWithTitle
          value={armorStats.selectedTraits[1]}
          onChange={onChangeSelect(1, 'SET_ARMOR_STATS', 'selectedTraits')}
          title='Chest'
          items={armorTraits}
        />
        <StyledSelectWithTitle
          value={armorStats.selectedTraits[2]}
          onChange={onChangeSelect(2, 'SET_ARMOR_STATS', 'selectedTraits')}
          title='Legs'
          items={armorTraits}
        />
      </Flex>
      <Divider style={{ margin: '10px 0px' }} />
      <Flex
        style={{ width: '100%', minHeight: 150, flexWrap: 'wrap' }}
        direction='row'
        justify='space-between'
        align='flex-start'
      >
        <StyledSelectWithTitle
          value={armorStats.selectedTraits[3]}
          onChange={onChangeSelect(3, 'SET_ARMOR_STATS', 'selectedTraits')}
          title='Hands'
          items={armorTraits}
        />
        <StyledSelectWithTitle
          value={armorStats.selectedTraits[4]}
          onChange={onChangeSelect(4, 'SET_ARMOR_STATS', 'selectedTraits')}
          title='Feet'
          items={armorTraits}
        />
        <StyledSelectWithTitle
          value={armorStats.selectedTraits[5]}
          onChange={onChangeSelect(5, 'SET_ARMOR_STATS', 'selectedTraits')}
          title='Shoulders'
          items={armorTraits}
        />
        <StyledSelectWithTitle
          value={armorStats.selectedTraits[6]}
          onChange={onChangeSelect(6, 'SET_ARMOR_STATS', 'selectedTraits')}
          title='Belt'
          items={armorTraits}
        />
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
