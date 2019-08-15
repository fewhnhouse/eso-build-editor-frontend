import React, { useState } from 'react';
import styled from 'styled-components';
import Flex from '../../../components/Flex';
import { Card, Typography, Divider, Descriptions, Icon } from 'antd';
import { IRaidState } from '../RaidStateContext';
import { Redirect } from 'react-router';
import BuildCard from '../builds/BuildCard';
import GearCard from '../../build/Sets/GearCard';

const { Title, Text } = Typography;

const Wrapper = styled(Flex)`
  width: 100%;
  height: 100%;
  padding: 20px;
`;

const RaidContent = styled(Flex)`
  width: 100%;
  flex-wrap: wrap;
  max-height: 600px;
`;
const GeneralInformation = styled(Card)`
  flex: 1;
  margin: 20px;
  height: 100%;
  height: 100%;
  min-width: 300px;
`;
const BuildInformation = styled(Card)`
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

interface IRaidReviewDetailsProps {
  loadedData: IRaidState;
}

const RaidReviewDetails = ({ loadedData }: IRaidReviewDetailsProps) => {
  const { name, applicationArea, groupSize, description, roles } = loadedData;

  const [path, setRedirect] = useState('');
  const handleClick = (path: string) => {
    setRedirect(path);
  };

  console.log(loadedData)

  if (path !== '') {
    return <Redirect push to={`${path}`} />;
  } else {
    return (
      <Wrapper direction="column">
        <RaidContent direction="row" align="flex-start">
          <GeneralInformation title={<Title level={2}>{name}</Title>}>
            <Title level={4}>Group size:</Title>
            <Text>{groupSize}</Text>
            <Divider />
            <Title level={4}>Application area:</Title>
            <Text>{applicationArea}</Text>
            <Divider />
            <Title level={4}>Description:</Title>
            <Text>{description}</Text>
          </GeneralInformation>
          <BuildInformation title={<Title level={2}>Builds</Title>}>
            {roles.map(role => {
              return (
                <>
                  <Divider>
                    <Title level={3}>{role.name}</Title>
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
          </BuildInformation>
        </RaidContent>
      </Wrapper>
    );
  }
};
export default RaidReviewDetails;
