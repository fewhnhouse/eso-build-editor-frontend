import React, { useContext, useState, useEffect } from 'react';
import { Divider, Radio, Checkbox, Spin } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import Flex from '../../../components/Flex';
import styled from 'styled-components';
import { SelectValue } from 'antd/lib/select';
import { SelectWithTitle } from './CustomSelect';
import { BuildContext, Slot, IModification } from '../BuildStateContext';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const StyledFlex = styled(Flex)`
  margin-top: 20px;
`;

const StyledSelectWithTitle = styled(SelectWithTitle)`
  min-width: 350px;
  max-width: 350px;
  flex: 1;
  margin: 0px 10px;
`;

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
`;

export default ({ bar }: { bar: 'frontbar' | 'backbar' }) => {
  const [state, dispatch] = useContext(BuildContext);
  const [shield, setShield] = useState(false);
  const { weaponType } = state!;

  const [mainHand, setMainHand] = useState<any>(undefined);
  const [offHand, setOffHand] = useState<any>(undefined);

  const onChange = (e: RadioChangeEvent) => {
    dispatch!({
      type: 'SET_WEAPON_TYPE',
      payload: { weaponType: e.target.value },
    });
  };

  useEffect(() => {
    console.log('state update');
    const { frontbarSelection, backbarSelection } = state!;
    setMainHand(
      [...(bar === 'frontbar' ? frontbarSelection : backbarSelection)].find(
        slot => slot.slot === Slot.mainHand
      )
    );
    setOffHand(
      [...(bar === 'frontbar' ? frontbarSelection : backbarSelection)].find(
        slot => slot.slot === Slot.offHand
      )
    );
  }, [state]);

  const weaponGlyphQuery = useQuery(GET_MODIFICATIONS, {
    variables: { where: { modificationType: 'glyph', itemType: 'weapon' } },
  });
  const weaponTraitQuery = useQuery(GET_MODIFICATIONS, {
    variables: { where: { modificationType: 'trait', itemType: 'weapon' } },
  });
  const armorGlyphQuery = useQuery(GET_MODIFICATIONS, {
    variables: { where: { modificationType: 'glyph', itemType: 'armor' } },
  });
  const armorTraitQuery = useQuery(GET_MODIFICATIONS, {
    variables: { where: { modificationType: 'trait', itemType: 'armor' } },
  });
  if (
    weaponGlyphQuery.loading ||
    weaponTraitQuery.loading ||
    armorGlyphQuery.loading ||
    armorTraitQuery.loading
  ) {
    return <Spin />;
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
    );
    return <div>"Error"</div>;
  } else if (
    weaponGlyphQuery.data &&
    weaponTraitQuery.data &&
    armorGlyphQuery.data &&
    armorTraitQuery.data
  ) {
    const armorGlyphs: IModification[] = armorGlyphQuery.data.modifications;
    const armorTraits: IModification[] = armorTraitQuery.data.modifications;
    const weaponGlyphs: IModification[] = weaponGlyphQuery.data.modifications;
    const weaponTraits: IModification[] = weaponTraitQuery.data.modifications;

    const onChangeSelect = (
      slots: Slot[],
      actionType: string,
      type: 'selectedTraits' | 'selectedGlyphs',
      itemType: 'frontbar' | 'backbar'
    ) => (value: SelectValue) => {
      if (shield && slots[0] === Slot.offHand) {
        const itemValue =
          type === 'selectedTraits'
            ? armorTraits.find(trait => trait.type === value)
            : armorGlyphs.find(glyph => glyph.type === value);

        dispatch!({
          type: actionType,
          payload: {
            slots,
            value: itemValue,
            type,
            itemType,
          },
        });
      } else {
        const itemValue =
          type === 'selectedTraits'
            ? weaponTraits.find(trait => trait.type === value)
            : weaponGlyphs.find(glyph => glyph.type === value);

        dispatch!({
          type: actionType,
          payload: {
            slots,
            value: itemValue,
            type,
            itemType,
          },
        });
      }
    };
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
      )('');
      onChangeSelect(
        [Slot.offHand],
        'SET_WEAPON_STATS',
        'selectedTraits',
        itemType
      )('');
      setState(e.target.checked);
    };

    return (
      <StyledFlex direction="column" justify="center" align="center">
        <Radio.Group
          onChange={onChange}
          defaultValue={weaponType || 'onehanded'}
        >
          <Radio.Button value="onehanded">One Handed</Radio.Button>
          <Radio.Button value="twohanded">Two Handed</Radio.Button>
        </Radio.Group>
        {weaponType !== 'twohanded' && (
          <Checkbox
            style={{ margin: '20px 0px 10px 0px' }}
            onChange={onChangeCheckbox(setShield, 'selectedGlyphs', bar)}
            value={shield}
          >
            Use Shield
          </Checkbox>
        )}
        <Divider>Enchants</Divider>

        {weaponType === 'twohanded' ? (
          <StyledSelectWithTitle
            value={mainHand && mainHand.glyph ? mainHand.glyph.type : ''}
            onChange={onChangeSelect(
              [Slot.mainHand],
              'SET_WEAPON_STATS',
              'selectedGlyphs',
              bar
            )}
            title="Both Hands"
            items={weaponGlyphs}
          />
        ) : (
          <Flex
            style={{ width: '100%', minHeigt: 150, flexWrap: 'wrap' }}
            direction="row"
            justify="center"
            align="flex-start"
          >
            <StyledSelectWithTitle
              value={mainHand && mainHand.glyph ? mainHand.glyph.type : ''}
              onChange={onChangeSelect(
                [Slot.mainHand],
                'SET_WEAPON_STATS',
                'selectedGlyphs',
                bar
              )}
              title="Main Hand"
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
              title="Off Hand"
              items={shield ? armorGlyphs : weaponGlyphs}
            />
          </Flex>
        )}

        <Divider>Traits</Divider>
        {weaponType === 'twohanded' ? (
          <StyledSelectWithTitle
            value={mainHand && mainHand.trait ? mainHand.trait.type : ''}
            onChange={onChangeSelect(
              [Slot.mainHand],
              'SET_WEAPON_STATS',
              'selectedTraits',
              bar
            )}
            title="Both Hands"
            items={weaponTraits}
          />
        ) : (
          <Flex
            style={{ width: '100%', minHeight: 150, flexWrap: 'wrap' }}
            direction="row"
            justify="center"
            align="flex-start"
          >
            <StyledSelectWithTitle
              value={mainHand && mainHand.trait ? mainHand.trait.type : ''}
              onChange={onChangeSelect(
                [Slot.mainHand],
                'SET_WEAPON_STATS',
                'selectedTraits',
                bar
              )}
              title="Main Hand"
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
              title="Off Hand"
              items={shield ? armorTraits : weaponTraits}
            />
          </Flex>
        )}
      </StyledFlex>
    );
  } else {
    return null;
  }
};
