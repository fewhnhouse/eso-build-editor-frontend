import React from 'react'
import gql from 'graphql-tag'
import { skill, skillSelection, setSelection } from '../../../util/fragments'
import { Spin, Tabs, Divider } from 'antd'
import SkillView from '../../../components/SkillView'
import { ABILITY_BAR_TWO, ABILITY_BAR_ONE } from '../../build/Skills/AbilityBar'
import { useQuery } from 'react-apollo'
import GearView from '../../../components/GearView'
import styled from 'styled-components'
import Flex from '../../../components/Flex'
const { TabPane } = Tabs

const GET_DETAILED_BUILD_INFO = gql`
  query build($id: ID!) {
    build(id: $id) {
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
    }
  }
  ${skill}
  ${skillSelection}
  ${setSelection}
`

const ScrollContainer = styled.div`
  overflow-y: auto;
  height: 250px;
`

const AbilityBar = styled.div`
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 300px;
`

const AbilityBarContainer = styled(Flex)`
  width: 100%;
`

const StyledDivider = styled(Divider)`
  margin: ${props => props.theme.margins.mini} 0px;
`

const LoadingContainer = styled(Flex)`
  height: 150px;
  width: 100%;
`

export default ({
  id,
  setsCount,
}: {
  id?: string
  setsCount: Map<string, number>
}) => {
  const { loading, error, data } = useQuery(GET_DETAILED_BUILD_INFO, {
    variables: { id },
  })
  if (loading) {
    return (
      <LoadingContainer justify='center' align='center'>
        <Spin />
      </LoadingContainer>
    )
  }
  if (data) {
    const { build } = data
    return (
      <>
        <StyledDivider />
        <Tabs defaultActiveKey={'skills'}>
          <TabPane tab='Skills' key='skills'>
            <AbilityBarContainer direction='column' align='center'>
              <AbilityBar>
                <SkillView
                  id={ABILITY_BAR_ONE}
                  disabled
                  size='small'
                  ultimate={build.ultimateOne}
                  skillSlots={build.newBarOne}
                />
              </AbilityBar>
              <AbilityBar>
                <SkillView
                  size='small'
                  id={ABILITY_BAR_TWO}
                  disabled
                  skillSlots={build.newBarTwo}
                  ultimate={build.ultimateTwo}
                />
              </AbilityBar>
            </AbilityBarContainer>
          </TabPane>
          <TabPane tab='Weapons' key='weapons'>
            <ScrollContainer>
              <GearView
                setsCount={setsCount}
                disabled
                size='small'
                setups={[
                  {
                    id: 'frontbar',
                    label: 'Frontbar',
                    data: build.frontbarSelection,
                  },
                  {
                    id: 'backbar',
                    label: 'Backbar',
                    data: build.backbarSelection,
                  },
                ]}
              />
            </ScrollContainer>
          </TabPane>
          <TabPane tab='Armor' key='armor'>
            <ScrollContainer>
              <GearView
                setsCount={setsCount}
                disabled
                size='small'
                setups={[
                  {
                    id: 'bigpieces',
                    label: 'Big Pieces',
                    data: build.bigPieceSelection,
                  },
                  {
                    id: 'smallpieces',
                    label: 'Small Pieces',
                    data: build.smallPieceSelection,
                  },
                ]}
              />
            </ScrollContainer>
          </TabPane>
          <TabPane tab='Jewelry' key='jewelry'>
            <ScrollContainer>
              <GearView
                setsCount={setsCount}
                disabled
                size='small'
                setups={[
                  {
                    id: 'jewelry',
                    label: 'Jewelry',
                    data: build.jewelrySelection,
                  },
                ]}
              />
            </ScrollContainer>
          </TabPane>
        </Tabs>
      </>
    )
  }

  return null
}
