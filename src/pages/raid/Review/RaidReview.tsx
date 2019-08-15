import React from 'react';
import { IRaidState, defaultRaidState } from '../RaidStateContext';
import RaidReviewDetails from './RaidReviewDetails';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { RouteComponentProps, withRouter } from 'react-router';

const RAID = gql`
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

  query Raids($id: ID!) {
    raid(id: $id) {
      name
      owner {
        name
      }

      applicationArea
      roles {
        name
        builds {
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

interface IRaidOverviewProps extends RouteComponentProps<any> {
  local?: boolean;
}

const RaidOverview = ({ match, local }: IRaidOverviewProps) => {
  const { id } = match.params;
  const raidState = localStorage.getItem('raidState');
  const parsedRaidState: IRaidState = raidState
    ? JSON.parse(raidState)
    : defaultRaidState;

  const { loading, error, data } = useQuery(RAID, { variables: { id } });

  if (!local) {
    if (loading) {
      return <div>Loading...</div>;
    }
    if (data && data.raid) {
      console.log(data.raid);
      return <RaidReviewDetails loadedData={data.raid} />;
    } else {
      return null;
    }
  } else {
    return <RaidReviewDetails loadedData={parsedRaidState} />;
  }
};

export default withRouter(RaidOverview);
