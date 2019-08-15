import React, { useState, useReducer, useEffect } from 'react';
import {
  BuildContext,
  buildReducer,
  SlotType,
  TwohandedWeapon,
  OnehandedWeapon,
  WeaponType,
} from './BuildStateContext';
import { Redirect } from 'react-router';
import {
  Layout,
  Button,
  Steps,
  Icon,
  message,
  Tooltip,
  notification,
} from 'antd';
import styled from 'styled-components';
import Consumables from './consumables/Consumables';
import Sets from './Sets/Sets';
import Skills from './Skills/Skills';
import RaceClass from './RaceAndClass/RaceClass';
import BuildReview from './Review/BuildReview';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import Flex from '../../components/Flex';
import { handleCreateSave, handleEditSave } from './util';

const { Footer, Content } = Layout;

const Container = styled(Content)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  overflow: auto;
  height: calc(100vh - 178px);
  color: rgb(155, 155, 155);
`;
const TabButton = styled(Button)`
  margin: 0px 10px;
`;

const CREATE_BUILD = gql`
  mutation createBuild($data: BuildCreateInput!) {
    createBuild(data: $data) {
      id
      name
    }
  }
`;

interface ISetSelectionData {
  slots: string[];
  glyphDescriptions: string[];
  traitDescriptions: string[];
  setIds: number[];
  types: (SlotType | '' | undefined)[];
  weaponTypes: (OnehandedWeapon | TwohandedWeapon | '' | undefined)[];
}

const CREATE_SET_SELECTIONS = gql`
  mutation createSetSelections(
    $slots: [String!]!
    $glyphDescriptions: [String!]!
    $traitDescriptions: [String!]!
    $setIds: [Int!]!
    $types: [String!]!
    $weaponTypes: [String!]!
  ) {
    createSetSelections(
      slots: $slots
      glyphDescriptions: $glyphDescriptions
      traitDescriptions: $traitDescriptions
      setIds: $setIds
      types: $types
      weaponTypes: $weaponTypes
    ) {
      id
    }
  }
`;

interface ISkillSelectionData {
  skillIds: number[];
  indices: number[];
}

const CREATE_SKILL_SELECTIONS = gql`
  mutation createSkillSelections($skillIds: [Int!]!, $indices: [Int!]!) {
    createSkillSelections(skillIds: $skillIds, indices: $indices) {
      id
    }
  }
`;

const UPDATE_SKILL_SELECTION = gql`
  mutation updateSkillSelection(
    $where: SkillSelectionWhereUniqueInput!
    $data: SkillSelectionUpdateInput!
  ) {
    updateSkillSelection(where: $where, data: $data) {
      id
    }
  }
`;

const UPDATE_SET_SELECTION = gql`
  mutation updateSetSelection(
    $where: SetSelectionWhereUniqueInput!
    $data: SetSelectionUpdateInput!
  ) {
    updateSetSelection(where: $where, data: $data) {
      id
    }
  }
`;

const UPDATE_BUILD = gql`
  mutation updateBuild(
    $where: BuildWhereUniqueInput!
    $data: BuildUpdateInput!
  ) {
    updateBuild(where: $where, data: $data) {
      id
    }
  }
`;
const { Step } = Steps;

interface IBuildProps {
  build: any;
  pageIndex: number;
  path: string;
  edit?: boolean;
}

export default ({ build, pageIndex, path, edit = false }: IBuildProps) => {
  const [state, dispatch] = useReducer(buildReducer, build);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [tab, setTab] = useState(pageIndex || 0);
  const [redirect, setRedirect] = useState('');

  const handlePrevClick = () => {
    setTab(tabIndex => tabIndex - 1);
  };
  const [updateBuild] = useMutation<any, any>(UPDATE_BUILD);

  const [updateSetSelection] = useMutation<any, any>(UPDATE_SET_SELECTION);
  const [updateSkillSelection] = useMutation<any, any>(UPDATE_SKILL_SELECTION);

  const [createSkillSelections] = useMutation<any, ISkillSelectionData>(
    CREATE_SKILL_SELECTIONS
  );
  const [createSetSelections] = useMutation<any, ISetSelectionData>(
    CREATE_SET_SELECTIONS
  );
  const [createBuild, { data }] = useMutation<any, any>(CREATE_BUILD);

  const { mundusStone, buff, ultimateOne, ultimateTwo } = state!;

  useEffect(() => {
    if (data && data.createBuild) {
      setRedirect(data.createBuild.id);
    }
  }, [data]);

  const handleSave = async () => {
    setLoading(true);
    if (edit) {
      try {
        await handleEditSave(
          updateSkillSelection,
          updateSetSelection,
          updateBuild,
          state,
          mundusStone,
          buff,
          ultimateOne,
          ultimateTwo
        );
        notification.success({
          message: 'Build update successful',
          description: (
            <Flex direction="column" align="center" justify="center">
              <div>
                Your build was successfully edited. You can now view it and
                share it with others!
              </div>
              <Flex
                style={{ width: '100%', marginTop: 10 }}
                direction="row"
                align="center"
                justify="space-between"
              >
                <Button icon="share-alt">Share link</Button>
              </Flex>
            </Flex>
          ),
        });
      } catch (e) {
        notification.error({
          message: 'Build update failed',
          description: 'Your build could not be saved. Try again later.',
        });
      }
    } else {
      try {
        await handleCreateSave(
          createSkillSelections,
          createSetSelections,
          createBuild,
          state!,
          mundusStone,
          buff,
          ultimateOne,
          ultimateTwo
        );
        notification.success({
          message: 'Build creation successful',
          description: (
            <Flex direction="column" align="center" justify="center">
              <div>
                Your build was successfully saved. You can now view it and share
                it with others!
              </div>
              <Flex
                style={{ width: '100%', marginTop: 10 }}
                direction="row"
                align="center"
                justify="space-between"
              >
                <Button icon="share-alt">Share link</Button>
              </Flex>
            </Flex>
          ),
        });

        localStorage.removeItem('buildState');
      } catch (e) {
        notification.error({
          message: 'Build creation failed',
          description: 'Your build could not be saved. Try again later.',
        });
      }
    }
    setLoading(false);
    setSaved(true);
  };

  const handleNextClick = () => {
    if (tab === 4) {
      console.log('save');
      handleSave();
    } else {
      setTab(tabIndex => tabIndex + 1);
    }
  };

  const {
    frontbarSelection,
    backbarSelection,
    bigPieceSelection,
    smallPieceSelection,
    jewelrySelection,
    newBarOne,
    newBarTwo,
  } = state!;

  const hasValidFrontbar = frontbarSelection[0].selectedSet
    ? frontbarSelection[0].type === WeaponType.onehanded
      ? frontbarSelection[1].selectedSet
        ? true
        : false
      : true
    : false;
  const hasValidBackbar = backbarSelection[0].selectedSet
    ? backbarSelection[0].type === WeaponType.onehanded
      ? backbarSelection[1].selectedSet
        ? true
        : false
      : true
    : false;

  const hasValidBigPieces = bigPieceSelection.reduce(
    (prev, curr) => (prev && curr.selectedSet ? true : false),
    true
  );
  const hasValidSmallPieces = smallPieceSelection.reduce(
    (prev, curr) => (prev && curr.selectedSet ? true : false),
    true
  );
  const hasValidJewelry = jewelrySelection.reduce(
    (prev, curr) => (prev && curr.selectedSet ? true : false),
    true
  );

  const hasValidSkillBarOne = newBarOne.reduce(
    (prev, curr) =>
      prev && curr.skill && curr.skill.skillId !== 0 ? true : false,
    true
  );
  const hasValidSkillBarTwo = newBarTwo.reduce(
    (prev, curr) =>
      prev && curr.skill && curr.skill.skillId !== 0 ? true : false,
    true
  );
  const hasValidUltimateOne = ultimateOne && ultimateOne.skillId !== 0;
  const hasValidUltimateTwo = ultimateTwo && ultimateTwo.skillId !== 0;

  const isDisabled =
    (tab === 0 && (state.race === '' || state.esoClass === '')) ||
    (tab === 1 &&
      !(
        hasValidSkillBarOne &&
        hasValidSkillBarTwo &&
        hasValidUltimateOne &&
        hasValidUltimateTwo
      )) ||
    (tab === 2 &&
      !(
        hasValidJewelry &&
        hasValidBigPieces &&
        hasValidSmallPieces &&
        hasValidFrontbar &&
        hasValidBackbar
      ));

  const setTooltipTitle = () => {
    if (!isDisabled) {
      return '';
    }
    switch (tab) {
      case 0:
        return 'Select a Race and a Class to progress.';
      case 1:
        return 'Slot Skills and Ultimates to progress.';
      case 2:
        return 'Slot Armor, Weapons and Jewelry to progress.';
    }
  };

  return (
    <BuildContext.Provider value={[state, dispatch]}>
      <Container>
        {pageIndex === 0 ? (
          <RaceClass edit={edit} />
        ) : pageIndex === 1 ? (
          <Skills edit={edit} />
        ) : pageIndex === 2 ? (
          <Sets edit={edit} />
        ) : pageIndex === 3 ? (
          <Consumables edit={edit} />
        ) : pageIndex === 4 ? (
          <BuildReview local={true} />
        ) : (
          <Redirect to={`${path}/0`} />
        )}
        {redirect && <Redirect to={`/buildreview/${redirect}`} push />}
      </Container>

      <Footer
        style={{
          display: 'flex',
          zIndex: 100,
          alignItems: 'center',
          boxShadow: '0 -2px 6px 0 rgba(0, 0, 0, 0.1)',
        }}
      >
        <TabButton
          onClick={handlePrevClick}
          disabled={tab === 0}
          size="large"
          type="primary"
        >
          <Icon type="left" />
          Prev
        </TabButton>
        <Steps progressDot current={tab}>
          <Step
            style={{ whiteSpace: 'nowrap' }}
            title="Race & Class"
            description="Select race and class."
          />
          <Step
            style={{ whiteSpace: 'nowrap' }}
            title="Skills"
            description="Select skills."
          />
          <Step
            style={{ whiteSpace: 'nowrap' }}
            title="Sets"
            description="Select sets."
          />
          <Step
            title="Consumables"
            style={{ whiteSpace: 'nowrap' }}
            description="Select mundus, potions, food."
          />
          <Step title="Review" description="Review and save." />
        </Steps>
        <Tooltip title={setTooltipTitle()}>
          <TabButton
            // style={{minWidth: 120}}
            loading={loading}
            onClick={handleNextClick}
            disabled={isDisabled || saved}
            size="large"
            type="primary"
          >
            {tab === 4 ? 'Save' : 'Next'}
            <Icon type={tab === 4 ? (loading ? '' : 'save') : 'right'} />
          </TabButton>
        </Tooltip>
        <Redirect to={`${path}/${tab}`} push />
      </Footer>
    </BuildContext.Provider>
  );
};
