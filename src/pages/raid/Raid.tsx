import React, { useState, useReducer, useEffect } from 'react';
import styled from 'styled-components';
import {
  Layout,
  Icon,
  Button,
  Steps,
  Tooltip,
  message,
} from 'antd';
import { RouteComponentProps, Redirect } from 'react-router';
import RaidGeneral from './general/RaidGeneral';
import { RaidContext, raidReducer, defaultRaidState } from './RaidStateContext';
import Builds from './builds/Builds';

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

export default ({
  match
}: RouteComponentProps<{ id: string }>) => {
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

  const handleNextClick = () => {
    setTab(tabIndex => tabIndex + 1);
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
            <Icon type="right" />
            Next
          </TabButton>
        </Tooltip>
        <Redirect to={`/raid/${tab}`} push />
      </Footer>
    </RaidContext.Provider>
  );
};
