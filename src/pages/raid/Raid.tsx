import React, { useState, useReducer, useEffect } from 'react';
import styled from 'styled-components';
import {
  Layout,
  Icon,
  Button,
  Steps,
  Tooltip,
  message,
  notification,
} from 'antd';
import { RouteComponentProps, Redirect } from 'react-router';
import RaidGeneral from './general/RaidGeneral';
import { RaidContext, raidReducer, defaultRaidState } from './RaidStateContext';
import Builds from './builds/Builds';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import Flex from '../../components/Flex';
import RaidReview from './Review/RaidReview';
import { handleCreateSave, handleEditSave } from './util';

const { Footer, Content } = Layout;
const { Step } = Steps;

const Container = styled(Content)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  overflow: auto;
  height: calc(100vh - 178px);
  color: ${props => props.theme.mainBg};
`;

const TabButton = styled(Button)`
  margin: 0px 10px;
`;

const CREATE_RAID = gql`
  mutation createRaid($data: RaidCreateInput!) {
    createRaid(data: $data) {
      id
      name
    }
  }
`;

const CREATE_ROLE = gql`
  mutation createRole($name: String!, $buildIds: [ID!]!) {
    createRole(name: $name, buildIds: $buildIds) {
      id
    }
  }
`;

const UPDATE_RAID = gql`
  mutation updateRaid($where: RaidWhereUniqueInput!, $data: RaidUpdateInput!) {
    updateRaid(where: $where, data: $data) {
      id
    }
  }
`;

const UPDATE_ROLE = gql`
  mutation updateRole($where: RoleWhereUniqueInput!, $data: RoleUpdateInput!) {
    updateRole(where: $where, data: $data) {
      id
    }
  }
`;
interface IRaidProps {
  raid: any;
  pageIndex: number;
  path: string;
  edit?: boolean;
}

export default ({ raid, pageIndex, path, edit = false }: IRaidProps) => {
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const [state, dispatch] = useReducer(raidReducer, raid);
  const [tab, setTab] = useState(pageIndex || 0);
  const [redirect, setRedirect] = useState('');

  const handlePrevClick = () => {
    setTab(tabIndex => tabIndex - 1);
  };
  const [updateRaid] = useMutation<any, any>(UPDATE_RAID);
  const [updateRole] = useMutation<any, any>(UPDATE_ROLE);

  const createRoleMutation = useMutation<any, any>(CREATE_ROLE);
  const [createRole] = createRoleMutation;
  const createRaidMutation = useMutation<any, any>(CREATE_RAID);
  const [createRaid, { data }] = createRaidMutation;

  useEffect(() => {
    if (data && data.createRaid) {
      setRedirect(data.createRaid.id);
    }
  }, [data]);

  const handleSave = async () => {
    setLoading(true);
    if (edit) {
      try {
        await handleEditSave(state, updateRole, createRole, updateRaid);
        notification.success({
          message: 'Raid update successful',
          description: (
            <Flex direction="column" align="center" justify="center">
              <div>
                Your raid was successfully edited. You can now view it and share
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
      } catch (e) {
        console.error(e);
        notification.error({
          message: 'Raid Update failed',
          description: 'Your raid could not be updated. Try again later.',
        });
      }
    } else {
      try {
        handleCreateSave(state, createRole, createRaid);
        notification.success({
          message: 'Raid creation successful',
          description: (
            <Flex direction="column" align="center" justify="center">
              <div>
                Your raid was successfully saved. You can now view it and share
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
        localStorage.removeItem('raidState');
      } catch (e) {
        console.error(e);
        notification.error({
          message: 'Raid creation failed',
          description: 'Your raid could not be saved. Try again later.',
        });
      }
    }

    setLoading(false);
    setSaved(true);
  };

  const handleNextClick = () => {
    if (tab === 2) {
      console.log('save');
      handleSave();
    } else {
      setTab(tabIndex => tabIndex + 1);
    }
  };

  const setTooltipTitle = () => {
    switch (tab) {
      case 0:
        return 'Select some general Information.';
      case 1:
        return 'Select the builds of your Setup.';
      case 2:
        return 'Confirm and Save.';
    }
  };

  return (
    <RaidContext.Provider value={[state, dispatch]}>
      <Container>
        {pageIndex === 0 ? (
          <RaidGeneral edit={edit} />
        ) : pageIndex === 1 ? (
          <Builds edit={edit} />
        ) : pageIndex === 2 ? (
          <RaidReview local />
        ) : (
          <Redirect to={`${path}/0`} />
        )}
        {redirect !== '' ? (
          <Redirect to={`/raidreview/${data.createRaid.id}`} push />
        ) : (
          ''
        )}
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
            title="General Information"
            description="Add general Raid info."
          />
          <Step
            style={{ whiteSpace: 'nowrap' }}
            title="Builds"
            description="Add builds to your setup."
          />
          <Step
            title="Review"
            style={{ whiteSpace: 'nowrap' }}
            description="Review and save."
          />
        </Steps>
        <Tooltip title={setTooltipTitle()}>
          <TabButton
            onClick={handleNextClick}
            disabled={false || saved}
            size="large"
            type="primary"
            loading={loading}
          >
            <Icon type={tab === 2 ? 'save' : 'right'} />
            {tab === 2 ? 'Save' : 'Next'}
          </TabButton>
        </Tooltip>
        <Redirect to={`${path}/${tab}`} push />
      </Footer>
    </RaidContext.Provider>
  );
};
