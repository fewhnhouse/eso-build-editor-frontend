import React from 'react';
import { useDrag } from 'react-dnd';
import styled, { CSSProp, CSSProperties } from 'styled-components';
import SkillView from '../../../components/SkillView';
import {
  ABILITY_BAR_TWO,
  ABILITY_BAR_ONE,
} from '../../build/Skills/AbilityBar';
import { DisplaySlot } from '../../../components/SkillSlot';
import { Card, Divider, Collapse, Icon } from 'antd';
const { Panel } = Collapse;

const MyAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 3px;
  border: 2px solid rgba(0, 0, 0, 0.45);
`;

const Description = styled.div`
  font-size: 14px;
  line-height: 1.5;
  color: ${(props: { newEffect?: boolean }) =>
    props.newEffect ? '#2ecc71' : 'rgba(0, 0, 0, 0.45)'};
  text-align: left;
`;

const Title = styled.div`
  font-size: 16px;
  line-height: 1.5;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  margin-bottom: 8px;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: left;
`;

const AbilityBar = styled.div`
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 200px;
`;

const StyledCard = styled(Card)`
  border-color: ${(props: { active: boolean }) =>
    props.active ? 'rgb(21, 136, 246)' : 'rgb(232, 232, 232)'};
  background: ${(props: { active: boolean }) =>
    props.active ? 'rgba(0,0,0,0.05)' : 'white'};
  border-width: 2px;
  margin: 10px;
`;

const StyledPanel = styled(Panel)`
  background: #f7f7f7;
  margin-bottom: 24px;
  border: 0px;
  border-radius: 4px;
  overflow: hidden;
`;

const customPanelStyle = {
  background: '#f7f7f7',
  borderRadius: 4,
  marginBottom: 24,
  border: 0,
  overflow: 'hidden',
};

export default ({ item, style }: { item: any; style?: CSSProperties }) => {
  const [{ isDragging, didDrop }, drag] = useDrag({
    item: {
      type: 'build',
      build: item,
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
      didDrop: !!monitor.didDrop(),
    }),
  });
  return (
    <div style={style} ref={drag}>
      <StyledCard hoverable active={item.name === 'asd'}>
        <div>
          <Title>{item.name}</Title>
          <Divider style={{ margin: '5px 0px' }} />
          <Collapse
            bordered={false}
            defaultActiveKey={[]}
            expandIcon={({ isActive }) => (
              <Icon type="caret-right" rotate={isActive ? 90 : 0} />
            )}
          >
            <Panel header="Skills" key="1" style={customPanelStyle}>
              <AbilityBar>
                <SkillView
                  id={ABILITY_BAR_ONE}
                  disabled
                  skillSlots={item.newBarOne}
                />
                <DisplaySlot
                  style={{ marginLeft: 10 }}
                  skill={item.ultimateOne || undefined}
                />
              </AbilityBar>
              <AbilityBar>
                <SkillView
                  id={ABILITY_BAR_TWO}
                  disabled
                  skillSlots={item.newBarTwo}
                />
                <DisplaySlot
                  style={{ marginLeft: 10 }}
                  skill={item.ultimateTwo || undefined}
                />
              </AbilityBar>
            </Panel>
            <Panel header="Sets" key="2" style={customPanelStyle}>
              <AbilityBar>
                <SkillView
                  id={ABILITY_BAR_ONE}
                  disabled
                  skillSlots={item.newBarOne}
                />
                <DisplaySlot
                  style={{ marginLeft: 10 }}
                  skill={item.ultimateOne || undefined}
                />
              </AbilityBar>
              <AbilityBar>
                <SkillView
                  id={ABILITY_BAR_TWO}
                  disabled
                  skillSlots={item.newBarTwo}
                />
                <DisplaySlot
                  style={{ marginLeft: 10 }}
                  skill={item.ultimateTwo || undefined}
                />
              </AbilityBar>
            </Panel>
          </Collapse>
          <div
            style={{
              width: 140,
              display: 'flex',
              margin: '10px 0px',
            }}
          >
            {/*tags*/}
          </div>
          <Description>{item.esoClass}</Description>
          <Description>{item.race}</Description>
        </div>
      </StyledCard>
    </div>
  );
};
