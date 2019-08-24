import React, { useState } from 'react';
import styled from 'styled-components';
import Flex from '../../components/Flex';
import { Typography, Button, Spin, Input, Icon } from 'antd';
import { Redirect } from 'react-router';
import RaidCard from './RaidCard';
import BuildCard from './BuildCard';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';
import { build } from '../../util/fragments';
const { Title } = Typography;

const CardContainer = styled(Flex)`
  justify-content: center;
  flex: 1;
  height: 100%;
`;

const ListCard = styled.div`
  width: 80%;
  height: 80%;
  min-width: 300px;
  max-width: 450px;
  margin: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.2);
`;
const CardTitle = styled(Title)`
  display: flex;
  margin-bottom: 0;
  width: 100%;
  justify-content: space-between;
`;

const StyledTitle = styled(Flex)`
  background-color: #e8e8e8;
  margin-bottom: 0;
  padding: 20px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;
export const ME = gql`
  query {
    me {
      id
      name
      builds {
        id
        owner {
          id
          name
        }
        name
        esoClass
        race
        applicationArea
      }
      raids {
        id
        owner {
          id
          name
        }
        name
        applicationArea
        roles {
          id
          builds {
            id
            build {
              ...Build
            }
          }
        }
      }
    }
  }
  ${build}
`;

export default ({ isBuild }: { isBuild: boolean }) => {
  const [redirect, setRedirect] = useState('');
  const { data, error, loading } = useQuery<any, any>(ME);
  const [search, setSearch] = useState('');
  const handleCreateClick = (path: string) => () => {
    setRedirect(path);
  };
  if (redirect !== '') {
    return <Redirect to={redirect} push />;
  }
  if (error) {
    console.error(error);
    return <div>Error.</div>;
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  return (
    <CardContainer direction="column" justify="center" align="center">
      <ListCard>
        <StyledTitle direction="column" justify="center" align="center">
          <CardTitle level={3}>
            {isBuild ? 'My builds' : 'My raids'}
            <Button
              type="primary"
              ghost={true}
              onClick={handleCreateClick(isBuild ? '/buildEditor/0' : '/raidEditor/0')}
            >
              Create
            </Button>
          </CardTitle>
          <Input
            placeholder={isBuild ? 'Search for builds' : 'Search for raids'}
            value={search}
            onChange={handleSearchChange}
            addonAfter={<Icon type="search" />}
            defaultValue="mysite"
          />
        </StyledTitle>
        {loading ? (
          <CardContainer>
            <Spin style={{ marginTop: 5 }} />
          </CardContainer>
        ) : data && data.me ? (
          isBuild ? (
            <BuildCard filterText={search} data={data.me.builds} />
          ) : (
            <RaidCard filterText={search} data={data.me.raids} />
          )
        ) : isBuild ? (
          'You have no saved builds yet.'
        ) : (
          'You have no saved raids yet.'
        )}
      </ListCard>
    </CardContainer>
  );
};
