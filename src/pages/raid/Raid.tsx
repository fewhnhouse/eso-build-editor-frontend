import React, { useState, useReducer, useEffect } from 'react';
import styled from 'styled-components';
import { Layout, Icon, Button, Steps, Tooltip, message } from 'antd';
import { RouteComponentProps, Redirect } from 'react-router';
import RaidGeneral from './general/RaidGeneral';
import { RaidContext, raidReducer, defaultRaidState } from './RaidStateContext';
import Builds from './builds/Builds';
import Review from './review/Review';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

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

export default ({ match }: RouteComponentProps<{ id: string }>) => {
  const savedRaidState = localStorage.getItem('raidState');

  useEffect(() => {
    const savedRaidState = localStorage.getItem('raidState');
    if (savedRaidState) {
      console.log(JSON.parse(savedRaidState));
      message.info('Your settings have been restored.');
    }
  }, []);
  const [state, dispatch] = useReducer(
    raidReducer,
    savedRaidState ? JSON.parse(savedRaidState) : defaultRaidState
  );
  //goggle.de?search=finland
  const { id } = match.params;
  const [tab, setTab] = useState(parseInt(id, 10));

  const handlePrevClick = () => {
    setTab(tabIndex => tabIndex - 1);
  };

  const createRoleMutation = useMutation<any, any>(CREATE_ROLE);
  const [createRole] = createRoleMutation;
  const createRaidMutation = useMutation<any, any>(CREATE_RAID);
  const [createRaid] = createRaidMutation;

  const handleSave = async () => {
    const {
      name,
      roles,
      applicationArea,
      canEdit,
      canView,
      published,
      builds,
    } = state!;
    console.log(roles);
    const createdRoles = await Promise.all(
      roles.map(
        async role =>
          await createRole({
            variables: {
              name: role.roleName,
              buildIds: role.builds.map(build => build.id),
            },
          })
      )
    );

    //make sure everyone who can edit can also view
    const enhancedCanView: string[] = [
      ...canView,
      ...canEdit.filter(editId => !canView.includes(editId)),
    ];

    console.log(createdRoles);

    const createdRaid = await createRaid({
      variables: {
        data: {
          name,
          applicationArea,
          canEdit: { connect: canEdit.map(id => ({ id })) },
          canView: { connect: enhancedCanView.map(id => ({ id })) },
          published,
          roles: {
            connect: createdRoles.map((createdRole: any) => ({
              id: createdRole.data.createRole.id,
            })),
          },
        },
      },
    });
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
        {id === '0' ? (
          <RaidGeneral />
        ) : id === '1' ? (
          <Builds />
        ) : id === '2' ? (
          <Review />
        ) : (
          <Redirect to="/raid/0" />
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
            disabled={false}
            size="large"
            type="primary"
          >
            <Icon type={tab === 2 ? 'save' : 'right'} />
            {tab === 2 ? 'Save' : 'Next'}
          </TabButton>
        </Tooltip>
        <Redirect to={`/raid/${tab}`} push />
      </Footer>
    </RaidContext.Provider>
  );
};
