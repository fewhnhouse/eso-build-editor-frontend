import React, { useState } from 'react';
import styled from 'styled-components';
import Flex from '../../components/Flex';
import { Card, Typography, Divider } from 'antd';
import { IRaidState } from '../raid/RaidStateContext';
import { Redirect } from 'react-router';
import BuildCard from '../raid/builds/BuildCard';

const { Title, Text } = Typography;

const Wrapper = styled(Flex)`
  width: 100%;
  padding: 20px;
`;
const RaidHeader = styled(Flex)`
  flex: 1;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 10px;
`;
const RaidContent = styled(Flex)`
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
  max-height: 600px;
`;
const GeneralCard = styled(Card)`
  flex: 1;
  margin: 20px;
  height: 100%;
  min-width: 300px;
`;
const BuildsCard = styled(Card)`
  flex: 2;
  flex-wrap: wrap;
  margin: 20px;
  height: 100%;
  overflow-y: auto;
  min-width: 300px;
`;
const CardList = styled(Flex)`
  flex-wrap: wrap;
`;
const StyledCard = styled(Card)`
  width: 200px;
  margin: 10px;
`;

interface IRaidReviewDetailsProps {
  loadedData: IRaidState;
}

const RaidReviewDetails = ({ loadedData }: IRaidReviewDetailsProps) => {
  const { name, applicationArea, groupSize, description, roles } = loadedData;

  const [path, setRedirect] = useState('');
  const handleClick = (path: string) => {
    setRedirect(path);
  };

  if (path !== '') {
    return <Redirect push to={`${path}`} />;
  } else {
    return (
      <Wrapper direction="column">
        <RaidContent direction="row" align="flex-start">
          <GeneralCard title={<Title level={2}>General Information</Title>}>
            <Title level={2} style={{ textAlign: 'center' }}>
              {name}
            </Title>
            <Title level={3}>Group size:</Title>
            <Text>{groupSize}</Text>
            <Title level={3}>Application area:</Title>
            <Text>{applicationArea}</Text>
            <Title level={3}>Description:</Title>
            <Text>{description}</Text>
          </GeneralCard>
          <BuildsCard title={<Title level={2}>Builds</Title>}>
            {roles.map(role => {
              return (
                <>
                  <Divider>
                    <Title level={3}>{role.roleName}</Title>
                  </Divider>
                  <CardList direction="row">
                    {role.builds.map((build, index) => {
                      return (
                        <BuildCard item={build} draggable={false} key={index} />
                      );
                    })}
                  </CardList>
                </>
              );
            })}
          </BuildsCard>
        </RaidContent>
      </Wrapper>
    );
  }
};
export default RaidReviewDetails;
