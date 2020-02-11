import React, { useContext } from 'react'
import { Icon, Collapse } from 'antd'
import styled from 'styled-components'
import Scrollbars from 'react-custom-scrollbars'
import { useDrop } from 'react-dnd'
import { GroupContext } from '../GroupStateContext'
import { classes } from '../../build/RaceAndClass/data'
import Flex from '../../../components/Flex'
import DraggableBuild from './DraggableBuild'
import { IBuild } from '../../build/BuildStateContext'

const StyledScrollbars = styled(Scrollbars)``

const StyledFlex = styled(Flex)`
  width: 100%;
  height: 100%;
  overflow-x: auto;
  overflow-y: hidden;
`
const DropContainer = styled.div`
  width: 100%;
  height: 120px;
`

const RoleDropContainer = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  background: #fafafa;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: ${(props: { canDrop: boolean }) =>
    `2px dashed ${props.canDrop ? '#1890ff' : '#d9d9d9'}`};
`
const StyledIcon = styled(Icon)`
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
`

interface IBuildsListProps {
  loading?: boolean
  dropType: string
  dispatchType: string
}

export default ({ dropType, dispatchType }: IBuildsListProps) => {
  const [state, dispatch] = useContext(GroupContext)
  const { currentClass, groupBuilds } = state!
  const [{ canDrop }, drop] = useDrop({
    accept: dropType,
    drop: (
      dropContext: { type: 'addBuild' | 'removeBuild'; build: IBuild },
      monitor
    ) => {
      console.log(dropContext)
      dispatch!({
        type: dispatchType,
        payload: { build: dropContext.build },
      })
    },
    collect: monitor => ({
      canDrop: !!monitor.canDrop(),
      isOver: !!monitor.isOver(),
    }),
  })

  const handleCollapseChange = (currentClass: string) => {
    dispatch!({ type: 'SET_CURRENT_CLASS', payload: { currentClass } })
  }

  const currentClassBuilds = groupBuilds.filter(
    groupBuild => groupBuild.build.esoClass === currentClass
  )
  return (
    <StyledScrollbars autoHide>
      <Collapse
        accordion
        bordered={false}
        activeKey={currentClass}
        onChange={handleCollapseChange as (key: string | string[]) => void}
      >
        {classes.map(esoClass => (
          <Collapse.Panel header={esoClass.title} key={esoClass.title}>
            <DropContainer>
              <RoleDropContainer ref={drop} canDrop={canDrop}>
                {currentClassBuilds.length ? (
                  <StyledFlex>
                    {currentClassBuilds.map(groupBuild => (
                      <DraggableBuild
                        customWidth='200px'
                        key={groupBuild.build.id}
                        build={groupBuild.build}
                        dragType={'removeBuild'}
                      />
                    ))}
                  </StyledFlex>
                ) : (
                  <>
                    <StyledIcon type='inbox' />
                  </>
                )}
              </RoleDropContainer>
            </DropContainer>
          </Collapse.Panel>
        ))}
      </Collapse>
    </StyledScrollbars>
  )
}
