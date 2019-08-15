import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { useQuery } from '@apollo/react-hooks';
import Build from './Build';
import { Spin, message } from 'antd';
import { defaultBuildState } from './BuildStateContext';
import gql from 'graphql-tag';

const GET_BUILD = gql`
  fragment SetSelection on SetSelection {
    id
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
    id
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
    id
    index
    skill {
      ...Skill
    }
  }

  query Build($id: ID!) {
    build(id: $id) {
      id
      owner {
        name
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
`;

interface IBuildWrapperProps
  extends RouteComponentProps<{ id: string; buildId: string }> {
  edit?: boolean;
}
export default ({ edit, match }: IBuildWrapperProps) => {
  const { id, buildId } = match.params;
  const pageIndex = parseInt(id || '0', 10);
  const { loading, error, data } = useQuery(GET_BUILD, {
    variables: { id: buildId },
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
        <Build
          edit
          path={`/editBuild/${buildId}`}
          build={{ ...defaultBuildState, ...data.build }}
          pageIndex={pageIndex}
        />
      );
    }
    return null;
  } else {
    const savedBuildState = localStorage.getItem('buildState');

    return <NewBuild savedBuildState={savedBuildState} pageIndex={pageIndex} />;
  }
};

const NewBuild = ({
  savedBuildState,
  pageIndex,
}: {
  savedBuildState: string | null;
  pageIndex: number;
}) => {
  useEffect(() => {
    try {
      const parsedBuildState = savedBuildState
        ? JSON.parse(savedBuildState)
        : false;
      if (parsedBuildState) {
        message.info('Your settings have been restored.');
      }
    } catch (e) {
      console.error(e);
    }
  }, []);
  try {
    const parsedBuildState = JSON.parse(savedBuildState || '');
    return (
      <Build path="/build" build={parsedBuildState} pageIndex={pageIndex} />
    );
  } catch (e) {
    return (
      <Build path="/build" build={defaultBuildState} pageIndex={pageIndex} />
    );
  }
};
