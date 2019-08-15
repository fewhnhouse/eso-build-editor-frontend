import React, { useEffect } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { RouteComponentProps } from 'react-router';
import Raid from './Raid';
import { Spin, message } from 'antd';
import { defaultRaidState } from './RaidStateContext';

const GET_RAID = gql`
  fragment SetSelection on SetSelection {
    icon
    slot
    type
    weaponType
    selectedSet {
      name
      location
      type
      bonus_item_1
      bonus_item_2
      bonus_item_3
      bonus_item_4
      bonus_item_5
      has_jewels
      has_weapons
      has_heavy_armor
      has_light_armor
      has_medium_armor
    }
    trait {
      type
      description
      icon
    }
    glyph {
      type
      description
      icon
    }
  }

  fragment Skill on Skill {
    name
    skillId
    icon
    range
    type
    cost
    effect_1
    effect_2
    target
  }

  fragment SkillSelection on SkillSelection {
    index
    skill {
      ...Skill
    }
  }

  query raid($id: ID!) {
    raid(id: $id) {
      id
      name
      owner {
        id
        name
      }

      applicationArea
      roles {
        id
        name
        builds {
          id
          owner {
            name
            id
          }
          name
          applicationArea
          role
          race
          esoClass
          bigPieceSelection {
            ...SetSelection
          }
          smallPieceSelection {
            ...SetSelection
          }
          jewelrySelection {
            ...SetSelection
          }
          frontbarSelection {
            ...SetSelection
          }
          backbarSelection {
            ...SetSelection
          }
          newBarOne {
            ...SkillSelection
          }
          newBarTwo {
            ...SkillSelection
          }
          ultimateOne {
            ...Skill
          }
          ultimateTwo {
            ...Skill
          }
          mundusStone {
            name
            effect
            value
            icon
          }
          buff {
            name
            buffDescription
            icon
            buffType
          }
        }
      }
    }
  }
`;
interface IRaidWrapperProps
  extends RouteComponentProps<{ id: string; raidId: string }> {
  edit?: boolean;
}

export default ({ edit, match }: IRaidWrapperProps) => {
  const { id, raidId } = match.params;
  const pageIndex = parseInt(id || '0', 10);
  const { loading, error, data } = useQuery(GET_RAID, {
    variables: { id: raidId },
  });
  if (edit) {
    if (loading) {
      return <Spin />;
    }
    if (error) {
      return <div>Error.</div>;
    }
    if (data) {
      return (
        <Raid
          edit
          initialRoles={data.raid.roles}
          path={`/editRaid/${raidId}`}
          raid={{ ...defaultRaidState, ...data.raid }}
          pageIndex={pageIndex}
        />
      );
    }
    return null;
  } else {
    const savedRaidState = localStorage.getItem('buildState');

    return <NewRaid savedRaidState={savedRaidState} pageIndex={pageIndex} />;
  }
};
const NewRaid = ({
  savedRaidState,
  pageIndex,
}: {
  savedRaidState: string | null;
  pageIndex: number;
}) => {
  useEffect(() => {
    try {
      const parsedRaidState = savedRaidState
        ? JSON.parse(savedRaidState)
        : false;
      if (parsedRaidState) {
        message.info('Your settings have been restored.');
      }
    } catch (e) {
      console.error(e);
    }
  }, []);
  try {
    const parsedRaidState = JSON.parse(savedRaidState || '');
    return <Raid path="/raid" raid={parsedRaidState} pageIndex={pageIndex} />;
  } catch (e) {
    return <Raid path="/raid" raid={defaultRaidState} pageIndex={pageIndex} />;
  }
};
