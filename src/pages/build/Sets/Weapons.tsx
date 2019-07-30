import React, { useContext } from 'react'
import { Divider, Select, Radio } from 'antd'
import { RadioChangeEvent } from 'antd/lib/radio'
import Flex from '../../../components/Flex'
import styled from 'styled-components'

import { SelectValue } from 'antd/lib/select'
import { SelectWithTitle } from './CustomSelect'
import { BuildContext } from '../BuildStateContext'
import { selectIcon, Gear } from '../../../assets/gear'
import { weaponTypes, weaponGlyphs, weaponTraits } from './data'

const StyledFlex = styled(Flex)`
  margin-top: 20px;
`

const StyledSelectWithTitle = styled(SelectWithTitle)`
  min-width: 350px;
  max-width: 350px;
  flex: 1;
  margin: 0px 10px;
`

const StyledSelectContainer = styled(Flex)`
  margin: 20px;
  width: 100%;
  min-width: 250px;
  max-width: 250px;
  flex-wrap: wrap;
`

const OptionIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-left: 5px;
`

const { Option } = Select
export default () => {
  const onChange = (e: RadioChangeEvent) => {
    dispatch!({
      type: 'SET_WEAPON_TYPE',
      payload: { weaponType: e.target.value },
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
  const { weaponType, weapons, weaponStats } = state!
  return (
    <StyledFlex direction='column' justify='center' align='center'>
      <Radio.Group onChange={onChange} defaultValue={weaponType || 'onehanded'}>
        <Radio.Button value='onehanded'>One Handed</Radio.Button>
        <Radio.Button value='twohanded'>Two Handed</Radio.Button>
      </Radio.Group>
      <Divider />
      <StyledSelectContainer direction='row' justify='center' align='center'>
        {weaponType === 'onehanded' ? (
          <>
            <Select
              size='large'
              value={weapons[0]}
              onChange={onChangeSelect(0, 'SET_WEAPONS', 'selectedGlyphs')}
              placeholder='Select Mainhand'
              style={{ flex: 1, margin: '10px 10px', minWidth: 150 }}
            >
              {weaponTypes.oneHanded
                .filter(weapon => weapon.type !== 'shield')
                .map(weapon => (
                  <Option
                    value={`main-${weapon.type}`}
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    {weapon.label}
                    <OptionIcon src={selectIcon(weapon.type)} />
                  </Option>
                ))}
            </Select>
            <Select
              size='large'
              value={weapons[1]}
              onChange={onChangeSelect(1, 'SET_WEAPONS', 'selectedGlyphs')}
              placeholder='Select Off-Hand'
              style={{ flex: 1, margin: '0px 10px', minWidth: 150 }}
            >
              {weaponTypes.oneHanded.map(weapon => (
                <Option
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                  value={`off-${weapon.type}`}
                >
                  {weapon.label}
                  <OptionIcon src={selectIcon(weapon.type)} />
                </Option>
              ))}
            </Select>
          </>
        ) : (
          <Select
            size='large'
            value={weapons[0]}
            onChange={onChangeSelect(0, 'SET_WEAPONS', 'selectedGlyphs')}
            placeholder='Select a weapon'
            style={{ flex: 1, margin: '0px 10px' }}
          >
            {weaponTypes.twoHanded.map(weapon => (
              <Option
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
                value={`two-${weapon.type}`}
              >
                {weapon.label}
                <OptionIcon src={selectIcon(weapon.type)} />
              </Option>
            ))}
          </Select>
        )}
      </StyledSelectContainer>
      <Divider>Enchants</Divider>

      {weaponType === 'twohanded' ? (
        <StyledSelectWithTitle
          value={weaponStats.selectedGlyphs[0]}
          onChange={onChangeSelect(0, 'SET_WEAPON_STATS', 'selectedGlyphs')}
          title='Main Hand'
          items={weaponGlyphs}
        />
      ) : (
        <Flex
          style={{ width: '100%', minHeigt: 150, flexWrap: 'wrap' }}
          direction='row'
          justify='center'
          align='flex-start'
        >
          <StyledSelectWithTitle
            value={weaponStats.selectedGlyphs[0]}
            onChange={onChangeSelect(0, 'SET_WEAPON_STATS', 'selectedGlyphs')}
            title='Main Hand'
            items={weaponGlyphs}
          />
          <StyledSelectWithTitle
            value={weaponStats.selectedGlyphs[1]}
            onChange={onChangeSelect(1, 'SET_WEAPON_STATS', 'selectedGlyphs')}
            title='Off Hand'
            items={weaponGlyphs}
          />
        </Flex>
      )}

      <Divider>Traits</Divider>
      {weaponType === 'twohanded' ? (
        <StyledSelectWithTitle
          value={weaponStats.selectedTraits[0]}
          onChange={onChangeSelect(0, 'SET_WEAPON_STATS', 'selectedTraits')}
          title='Main Hand'
          items={weaponTraits}
        />
      ) : (
        <Flex
          style={{ width: '100%', minHeight: 150, flexWrap: 'wrap' }}
          direction='row'
          justify='center'
          align='flex-start'
        >
          <StyledSelectWithTitle
            value={weaponStats.selectedTraits[0]}
            onChange={onChangeSelect(0, 'SET_WEAPON_STATS', 'selectedTraits')}
            title='Main Hand'
            items={weaponTraits}
          />
          <StyledSelectWithTitle
            value={weaponStats.selectedTraits[1]}
            onChange={onChangeSelect(1, 'SET_WEAPON_STATS', 'selectedTraits')}
            title='Off Hand'
            items={weaponTraits}
          />
        </Flex>
      )}
    </StyledFlex>
  )
}
