import React, { useContext } from 'react';
import styled from 'styled-components';
import { Typography, Input, Divider, Select } from 'antd';
import { RouteComponentProps, withRouter } from 'react-router';
import Flex from '../../../components/Flex';
import { RaidContext } from '../RaidStateContext';
import AccessRights from './AccessRights';

const GeneralContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
`;

const RaidGeneral = ({ match }: RouteComponentProps<{ id: string }>) => {
  const [state, dispatch] = useContext(RaidContext);

  const { name, description, applicationArea } = state!;

  const handleRaidNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch!({ type: 'SET_RAID_NAME', payload: { name: e.target.value } });
  };
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch!({
      type: 'SET_RAID_DESCRIPTION',
      payload: { description: e.target.value },
    });
  };

  const handleApplicationAreaChange = (value: string) => {
    dispatch!({
      type: 'SET_RAID_APPLICATION_AREA',
      payload: { applicationArea: value },
    });
  };

  return (
    <>
      <Divider>General Information</Divider>
      <GeneralContainer>
        <Flex direction="column" justify="space-around" align="center">
          <Flex
            style={{ margin: 10, width: 400 }}
            direction="column"
            justify="flex-start"
            align="flex-start"
          >
            <Typography.Text strong>Raid Name</Typography.Text>
            <Input
              style={{ width: 400 }}
              size="large"
              value={name}
              onChange={handleRaidNameChange}
              placeholder="Type name..."
            />
          </Flex>
          <Flex
            style={{ flex: 1, width: 400 }}
            direction="column"
            justify="flex-start"
            align="flex-start"
          >
            <Typography.Text strong>Description</Typography.Text>

            <Input
              size="large"
              style={{ width: 400 }}
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Type description..."
            />
          </Flex>
          <Flex
            style={{ margin: 10, width: 400 }}
            direction="column"
            justify="flex-start"
            align="flex-start"
          >
            <Typography.Text strong>Application Area</Typography.Text>
            <Select
              style={{ width: 400 }}
              value={applicationArea}
              onChange={handleApplicationAreaChange}
              size="large"
              placeholder="Select application area..."
            >
              <Select.Option value="battlegrounds">Battlegrounds</Select.Option>
              <Select.Option value="cyrodiil_raid">
                Cyrodiil - Raid
              </Select.Option>
              <Select.Option value="cyrodiil_smallscale">
                Cyrodiil - Small Scale
              </Select.Option>

              <Select.Option value="pve_dungeons">PvE - Dungeons</Select.Option>
              <Select.Option value="pve_arena">PvE - Arena</Select.Option>
              <Select.Option value="pve_raid">PvE - Raids</Select.Option>
              <Select.Option value="pve_openworld">
                PvE - Open World
              </Select.Option>
            </Select>
          </Flex>
        </Flex>
      </GeneralContainer>
      <Divider>Access Rights</Divider>
      <GeneralContainer>
        <AccessRights />
      </GeneralContainer>
    </>
  );
};

export default withRouter(RaidGeneral);
