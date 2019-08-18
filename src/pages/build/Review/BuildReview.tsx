import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps, withRouter, Redirect } from 'react-router';
import styled, { withTheme, ThemeProps } from 'styled-components';
import { ITheme } from '../../../components/globalStyles';
import { BuildContext } from '../BuildStateContext';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import BuildReviewDetails from './BuildReviewDetails';
import {
  Layout,
  Typography,
  Button,
  Spin,
  Popconfirm,
  notification,
} from 'antd';
const { Content, Footer } = Layout;

interface IBuildReview extends ThemeProps<ITheme>, RouteComponentProps<any> {
  local?: boolean;
}

const BUILD = gql`
  fragment SetSelection on SetSelection {
    id
    icon
    slot
    type
    weaponType
    selectedSet {
      id
      name
      location
      type
      slug
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
`;

const ME = gql`
  query {
    me {
      id
    }
  }
`;

const DELETE_BUILD = gql`
  mutation deleteBuild($id: ID!) {
    deleteBuild(id: $id) {
      id
    }
  }
`;

const ActionButton = styled(Button)`
  width: 100px;
  margin: 10px;
`;

const Container = styled(Content)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  overflow: auto;
  height: calc(100vh - 144px);
  color: rgb(155, 155, 155);
`;

const BuildReview = ({ match, theme, local }: IBuildReview) => {
  const { id } = match.params;

  const [state] = useContext(BuildContext);
  const buildQuery = useQuery(BUILD, { variables: { id } });
  const meQuery = useQuery(ME);
  const [deleteMutation, { data, error }] = useMutation(DELETE_BUILD, {
    variables: { id },
  });
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    if (data) {
      notification.success({
        message: 'Build Deletion',
        description: 'Build successfully deleted.',
      });
    } else if (error) {
      notification.error({
        message: 'Build Deletion',
        description: 'Error while deleting build. Try again later.',
      });
    }
  }, [data, error]);
  if (!local) {
    if (buildQuery.loading || meQuery.loading) {
      return <Spin />;
    }
    if (
      buildQuery.data &&
      buildQuery.data.build &&
      meQuery.data &&
      meQuery.data.me
    ) {
      const handleDeleteConfirm = () => {
        deleteMutation({ variables: { id } });
      };

      const handleEditClick = () => {
        setRedirect(true);
      };
      if (redirect) {
        return <Redirect to={`/editBuild/${id}/0`} push />;
      }
      return (
        <>
          <Container>
            <BuildReviewDetails loadedData={buildQuery.data.build} />
          </Container>
          <Footer
            style={{
              height: 80,
              display: 'flex',
              justifyContent: 'space-between',
              zIndex: 100,
              alignItems: 'center',
              boxShadow: '0 -2px 6px 0 rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography.Title level={3}>
              Owner: {buildQuery.data.build.owner.name}
            </Typography.Title>
            {buildQuery.data.build.owner.id === meQuery.data.me.id && (
              <div>
                <ActionButton
                  onClick={handleEditClick}
                  icon="edit"
                  size="large"
                  type="primary"
                >
                  Edit
                </ActionButton>
                <Popconfirm
                  title="Are you sure you want to delete this build?"
                  onConfirm={handleDeleteConfirm}
                  okText="Yes"
                  cancelText="No"
                >
                  <ActionButton icon="delete" size="large" type="danger">
                    Delete
                  </ActionButton>
                </Popconfirm>
              </div>
            )}
          </Footer>
        </>
      );
    } else {
      return null;
    }
  } else {
    return <BuildReviewDetails loadedData={state!} />;
  }
};

export default withTheme(withRouter(BuildReview));
