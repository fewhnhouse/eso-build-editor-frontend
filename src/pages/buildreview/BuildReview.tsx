import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { withTheme, ThemeProps } from 'styled-components';
import { ITheme } from '../../components/globalStyles';
import { IBuildState, defaultBuildState } from '../build/BuildStateContext';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import BuildReviewDetails from './BuildReviewDetails';

interface IBuildReview extends ThemeProps<ITheme>, RouteComponentProps<any> {
  local?: boolean
}

const buildByID = gql`
  query Builds($id: ID!){
    builds (where: {id: $id}) {
      owner {
        name
      }
      name
      applicationArea
      role
      race
      esoClass
      bigPieceSelection {
        icon
        slot
        type
        selectedSet {
          name
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
          itemType
          description
          icon
          modificationType
        }
        glyph {
          type
          itemType
          description
          icon
          modificationType
        }
      }
      smallPieceSelection {
        icon
        slot
        type
        selectedSet {
          name
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
          itemType
          description
          icon
          modificationType
        }
        glyph {
          type
          itemType
          description
          icon
          modificationType
        }
      }
      jewelrySelection {
        icon
        slot
        type
        selectedSet {
          name
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
          itemType
          description
          icon
          modificationType
        }
        glyph {
          type
          itemType
          description
          icon
          modificationType
        }
      }
      frontbarSelection {
        icon
        slot
        type
        selectedSet {
          name
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
          itemType
          description
          icon
          modificationType
        }
        glyph {
          type
          itemType
          description
          icon
          modificationType
        }
      }
      backbarSelection {
        icon
        slot
        type
        selectedSet {
          name
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
          itemType
          description
          icon
          modificationType
        }
        glyph {
          type
          itemType
          description
          icon
          modificationType
        }
      }
      newBarOne {
        index
        skill {
          skillId
          target
          cast_time
          cost
          effect_1
          effect_2
          icon
          name
          type
        }
      }
      newBarTwo {
        index
        skill {
          skillId
          target
          cast_time
          cost
          effect_1
          effect_2
          icon
          name
          type
        }
      }
      ultimateOne {
        skillId
        target
        cast_time
        cost
        effect_1
        effect_2
        icon
        name
        type
      }
      ultimateTwo {
        skillId
        target
        cast_time
        cost
        effect_1
        effect_2
        icon
        name
        type
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
`

const BuildReview = ({ match, theme, local }: IBuildReview) => {

  const { id } = match.params;
  const buildState = localStorage.getItem('buildState');
  const parsedBuildState: IBuildState = buildState
    ? JSON.parse(buildState)
    : defaultBuildState;
  const { loading, error, data } = useQuery(buildByID, {variables: {id}});

  if (!local) {
    if ( data && data.builds ) {
      return <BuildReviewDetails loadedData={data.builds[0]} />
    } else {
      return <>{console.log("Data loading...")}</>
    }
  } else {
    return <BuildReviewDetails loadedData={parsedBuildState} />
  }
}

export default withTheme(withRouter(BuildReview));

/*
const StatsView = styled.div`
  text-align: left;
`;

const StyledStatLabel = styled.span`
  float: right;
  color: ${(props: { color: string }) => props.color || ""};
`;

const stats = [
  {
    name: "Resources",
    data: [
      { label: "Health", value: 25670 },
      { label: "Stamina", value: 21500 },
      { label: "Magicka", value: 25999 }
    ]
  },
  {
    name: "Revocery",
    data: [
      { label: "Health recovery", value: 555 },
      { label: "Stamina recovery", value: 1455 },
      { label: "Magicka recovery", value: 1000 }
    ]
  },
  {
    name: "Damage",
    data: [
      { label: "Weapon damage", value: 1234 },
      { label: "Weapon critical", value: 1234 },
      { label: "Spell damage", value: 234 },
      { label: "Spell critical", value: 2342 }
    ]
  },
  {
    name: "Resistance",
    data: [
      { label: "Physical resistance", value: 15899 },
      { label: "Spell resistance", value: 12400 },
      { label: "Critical resistance", value: 1750 }
    ]
  }
];

const statColor = (label: string, theme: ITheme) => {
  if (label.includes("Health")) {
    return theme.baseStatColors.healthRed;
  } else if (label.includes("Magicka") || label.includes("Spell")) {
    return theme.baseStatColors.magBlue;
  } else if (
    label.includes("Stamina") ||
    label.includes("Weapon") ||
    label.includes("Physical")
  ) {
    return theme.baseStatColors.stamGreen;
  } else if (label.includes("resistance")) {
    return theme.statsRes;
  } else return "";
};

  <StatsView>
    <StyledTitle level={3}>Stats</StyledTitle>
    <Divider />
    {stats.map((stat, index) => (
      <div key={index}>
        {stat.data.map((innerStats, innerIndex) => (
          <div key={innerIndex}>
            <Title level={4}>
              {innerStats.label}
              <StyledStatLabel color={statColor(innerStats.label, theme)}>
                {innerStats.value}
              </StyledStatLabel>
            </Title>
          </div>
        ))}
        <Divider />
      </div>
    ))}
  </StatsView>

*/
