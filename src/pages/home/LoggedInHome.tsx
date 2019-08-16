import React, { useState } from 'react';
import styled from 'styled-components';
import { Typography, Button, Divider, Input } from 'antd';
import Flex from '../../components/Flex';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import UserHomeCard from './UserHomeCard';
import { Redirect } from 'react-router';
import { wcdt } from '../../assets/backgrounds/index';

const { Search } = Input;
const { Title } = Typography;

const OuterWrapper = styled(Flex)`
  width: 100%;
`;
const Wrapper = styled(Flex)`
  padding: 40px;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 600px;
  z-index: 20;
  background: white;
  box-shadow: 0px -5px 5px 0px rgba(0, 0, 0, 0.35);
`;

const LeftSide = styled(Flex)`
  justify-content: center;
  flex: 1;
  min-height: 300px;
`;

const Center = styled(Flex)`
  justify-content: center;
  flex: 1;
  min-height: 300px;
`;
const InputContainer = styled(Flex)`
  width: 100%;
  z-index: 1;
  position: fixed;
  top: 100px;
  min-height: 150px;
  padding: 20px;
`;

const ListCard = styled.div`
  width: 60%;
  min-width: 300px;
  margin: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.2);
  min-height: 300px;
`;

const RightSide = styled(Flex)`
  height: 100%;
  z-index: 30;
  box-shadow: -2px 0px 5px 0px rgba(0, 0, 0, 0.35);
  flex: 1;
`;

const RightWrapper = styled.div`
  height: 100%;
  box-shadow: -5px 0px 2px -2px rgba(0, 0, 0, 0.2);
  min-width: 300px;
`;

const StyledTitle = styled(Flex)`
  background-color: #e8e8e8;
  margin-bottom: 0;
  padding: 20px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const CardTitle = styled(Title)`
  display: flex;
  margin-bottom: 0;
  width: 100%;
  justify-content: space-between;
`;

const InnerContainer = styled(Flex)`
  width: 100%;
  padding-top: 50px;
  height: 100%;
  overflow: auto;
  background-image: url(${wcdt});
  background-size: contain;
`;
const StyledSearch = styled(Search)`
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.35);
`;

const ME = gql`
  query {
    me {
      name
      builds {
        owner {
          name
        }
        id
        name
        esoClass
        race
        applicationArea
      }
      raids {
        owner {
          name
        }
        id
        name
        applicationArea
        roles {
          builds {
            role
          }
        }
      }
    }
  }
`;

export default () => {
  const { data } = useQuery<any, any>(ME);
  const [redirect, setRedirect] = useState('');

  const handleCreateClick = (path: string) => () => {
    setRedirect(path);
  };
  if (redirect !== '') {
    return <Redirect to={redirect} push />;
  }

  return (
    <OuterWrapper
      direction="row"
      justify="space-between"
      align="center"
      wrap
      fluid
    >
      <InnerContainer
        direction="column"
        justify="center"
        align="center"
        wrap
        fluid
      >
        <InputContainer direction="row" align="center" justify="center">
          <StyledSearch
            size="large"
            placeholder="Search for raids"
            style={{ width: 400 }}
          />
        </InputContainer>
        <Wrapper direction={'row'} justify="center" align="center" wrap>
          <LeftSide direction={'column'} justify={'center'} align="center">
            <ListCard>
              <StyledTitle direction={'column'} justify="center" align="center">
                <CardTitle level={3}>
                  My builds
                  <Button
                    type="primary"
                    ghost={true}
                    onClick={handleCreateClick('/build/0')}
                  >
                    Create
                  </Button>
                </CardTitle>
                <Search placeholder="Search for builds" />
              </StyledTitle>
              {data && data.me ? (
                <UserHomeCard userBuildData={data.me.builds} />
              ) : (
                'You have no saved builds yet.'
              )}
            </ListCard>
          </LeftSide>
          <Center direction={'column'} justify={'center'} align={''}>
            <ListCard>
              <StyledTitle direction={'column'} justify={''} align={''}>
                <CardTitle level={3}>
                  My raids
                  <Button
                    type="primary"
                    ghost={true}
                    onClick={handleCreateClick('/raid/0')}
                  >
                    Create
                  </Button>
                </CardTitle>
                <Search placeholder="Search for raids" />
              </StyledTitle>
              {data && data.me ? (
                <UserHomeCard userRaidData={data.me.raids} />
              ) : (
                'You have no saved raids yet.'
              )}
            </ListCard>
          </Center>
        </Wrapper>
      </InnerContainer>
      <RightSide direction={'column'} justify={'flex-start'} align={'flex-end'}>
        <RightWrapper>
          <div style={{ height: '30%' }}>
            <Title level={4} style={{ paddingTop: '20px' }}>
              DISCOVERY
            </Title>
          </div>
          <Divider />
          <div>
            <Title level={4}>ACTIVITY</Title>
          </div>
        </RightWrapper>
      </RightSide>
    </OuterWrapper>
  );
};
